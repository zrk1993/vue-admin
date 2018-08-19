<template>
  <div class="g-layout">
    <div class="g-left">
      <el-tree
        ref="tree"
        node-key="id"
        :check-on-click-node="true"
        :data="treeData"
        :props="treeProps"
        :highlight-current="true"
        :default-expanded-keys="[0]"
        @node-click="treeNodeClick"
      ></el-tree>
    </div>
    <div class="g-right">
      <div class="search-form">
        <el-form :model="searchForm" ref="searchForm" size="mini" inline>
          <el-form-item label="名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button type="primary" size="mini" @click="addCatalog">新增目录</el-button>
          <el-button type="primary" size="mini" @click="editCatalog">修改目录</el-button>
          <el-button type="primary" size="mini" @click="deleteCatalog">删除</el-button>
        </div>
      </div>
      <el-table
        class="wp100"
        size="mini" border stripe
        :data="tableData"
        :max-height="maxHeight"
        v-auto-height:maxHeight="-20"
        @selection-change="tableSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.picture" alt="目录图片" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="sort" label="排序" width="80"></el-table-column>
        <el-table-column prop="usable" label="是否可用" width="80">
          <template slot-scope="scope">
            {{ scope.row.usable ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
      </el-table>
    </div>
    <el-dialog :title="DLaddEditCatalog.title" :visible.sync="DLaddEditCatalog.visible" width="800px">
      <add-edit-catalog
        :parent="DLaddEditCatalog.parent || {}"
        :data="DLaddEditCatalog.data"
        v-if="DLaddEditCatalog.visible"
        @callback="addEditCatalogCb"
      ></add-edit-catalog>
    </el-dialog>
  </div>
</template>

<script>
import addEditCatalog from './components/add-edit-catalog';

export default {
  components: {
    addEditCatalog,
  },
  data() {
    return {
      maxHeight: 500,
      catalogDataList: [],
      treeProps: {
        children: 'children',
        label: 'name',
      },
      treeNodeSelected: null,
      searchForm: {},
      tableDataSelected: [],

      DLaddEditCatalog: {
        title: '编辑目录',
        data: null,
        parent: null,
        visible: false,
      },
    };
  },
  computed: {
    treeData() {
      function getJsonTree(data, parentId, parentName) {
        const itemArr = [];
        for (let i = 0; i < data.length; i += 1) {
          const node = data[i];
          if (node.parentId === parentId) {
            node.parentName = parentName;
            const children = getJsonTree(data, node.id, node.name);
            if (children.length > 0) {
              node.children = children;
              node.children.sort((a, b) => a.sort - b.sort);
            }
            itemArr.push(node);
          }
        }
        return itemArr;
      }
      return getJsonTree(this.catalogDataList, -1, '商品目录');
    },
    tableData() {
      const data = this.catalogDataList.filter(item =>
        !this.treeNodeSelected || item.parentId === this.treeNodeSelected.id);
      data.sort((a, b) => a.sort - b.sort);
      return data;
    },
  },
  created() {
    this.getCatalogDataList();
  },
  methods: {
    getCatalogDataList() {
      this.tableLoading = true;
      this.$http.get('/system_permission/user/list').then((data) => {
        this.catalogDataList = data.result;
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    tableSelectionChange(rows) {
      this.tableDataSelected = rows;
    },
    treeNodeClick(node) {
      this.treeNodeSelected = node;
    },
    addCatalog() {
      // 新增目录
      this.DLaddEditCatalog.title = '新增目录';
      this.DLaddEditCatalog.parent = this.treeNodeSelected || {};
      this.DLaddEditCatalog.visible = true;
    },
    editCatalog() {
      // 编辑目录
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.DLaddEditCatalog.title = '编辑目录';
      [this.DLaddEditCatalog.data] = this.tableDataSelected;
      this.DLaddEditCatalog.visible = true;
    },
    addEditCatalogCb(data) {
      this.DLaddEditCatalog.visible = false;
      if (data) this.getCatalogDataList();
    },
    deleteCatalog() {
      // 删除
      if (this.tableDataSelected.length < 1) {
        this.$message({
          message: '请选择之少一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.$http.post('/system_catalog/catalog/delete', { ids: this.tableDataSelected.map(i => i.id) }).then(() => {
        this.$message({
          message: '操作成功！',
          type: 'success',
          showClose: true,
        });
        this.getCatalogDataList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.g-layout {
  display: flex;
  .g-left {
    width: 200px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .g-right {
    overflow: hidden;
    flex-grow: 1;
  }
}
</style>

