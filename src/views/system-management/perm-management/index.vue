<template>
  <div class="g-layout">
    <div class="g-left">
      <el-tree
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
          <el-button type="primary" size="mini">分配权限</el-button>
          <el-button type="primary" size="mini" @click="addPermission">新增权限</el-button>
          <el-button type="primary" size="mini">作废</el-button>
        </div>
      </div>
      <el-table :data="tableData" @selection-change="tableSelectionChange" size="mini" border stripe>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="角色名"></el-table-column>
        <el-table-column prop="usable" label="是否可用">
          <template slot-scope="scope">
            {{ scope.row.usable ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column prop="" label="已关联用户"></el-table-column>
      </el-table>
    </div>
    <el-dialog :title="DLaddEditPerm.title" :visible.sync="DLaddEditPerm.visible" width="500px">
      <add-edit-perm v-if="DLaddEditPerm.visible" @callback="addEditPermCb"></add-edit-perm>
    </el-dialog>
  </div>
</template>

<script>
import addEditPerm from './components/add-edit-perm';

export default {
  components: {
    addEditPerm,
  },
  data() {
    return {
      permDataList: [],
      treeProps: {
        children: 'children',
        label: 'name',
      },
      treeNodeSelected: null,
      searchForm: {},
      tableDataSelected: [],

      DLaddEditPerm: {
        title: '编辑权限',
        visible: false,
      },
    };
  },
  computed: {
    treeData() {
      function getJsonTree(data, parentId) {
        const itemArr = [];
        for (let i = 0; i < data.length; i += 1) {
          const node = data[i];
          if (node.parentId === parentId) {
            node.children = getJsonTree(data, node.id);
            itemArr.push(node);
          }
        }
        return itemArr;
      }
      return getJsonTree(this.permDataList, -1);
    },
    tableData() {
      const data = this.permDataList.filter(item => this.treeNodeSelected
        && item.parentId === this.treeNodeSelected.id);
      return data;
    },
  },
  created() {
    this.getPermDataList();
  },
  methods: {
    getPermDataList() {
      this.tableLoading = true;
      this.$http.get('/system_permission/perm/list').then((data) => {
        this.permDataList = data.result;
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
    addPermission() {
      // 新增权限
      this.DLaddEditPerm.title = '新增权限';
      this.DLaddEditPerm.visible = true;
    },
    addEditPermCb(data) {
      // 弹层返回
      this.DLaddEditPerm.visible = false;
      if (data) this.getPermDataList();
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
    flex-grow: 1;
  }
}
</style>

