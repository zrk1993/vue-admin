<template>
  <div>
    <div class="search-form">
      <el-form :model="searchForm" ref="searchForm" size="mini" inline>
        <el-form-item label="品牌名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="actions">
        <el-button type="primary" size="mini" @click="addBrand">新增</el-button>
        <el-button type="primary" size="mini" @click="editBrand">修改</el-button>
        <el-button type="primary" size="mini" @click="deleteBrand">删除</el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="tableLoading"  @selection-change="tableSelectionChange" size="mini" border stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picture" alt="品牌图片" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="品牌名称"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="usable" label="是否可用" width="80">
        <template slot-scope="scope">
          {{ scope.row.usable ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
    </el-table>

    <el-dialog :title="DLaddEditBrand.title" :visible.sync="DLaddEditBrand.visible" width="800px">
      <add-edit-brand v-if="DLaddEditBrand.visible" @callback="addEditBrandCb"></add-edit-brand>
    </el-dialog>
  </div>
</template>

<script>
import addEditBrand from './components/add-edit-brand';

export default {
  components: {
    addEditBrand,
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      tableDataSelected: [],
      tableLoading: false,

      DLaddEditBrand: {
        title: '编辑品牌',
        visible: false,
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.tableLoading = true;
      this.$http.get('/system_permission/user/list').then((data) => {
        this.tableData = data.result;
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    tableSelectionChange(rows) {
      this.tableDataSelected = rows;
    },
    addBrand() {
      // 新增品牌
      this.DLaddEditBrand.title = '新增品牌';
      this.DLaddEditBrand.visible = true;
    },
    editBrand() {
      // 编辑品牌
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.DLaddEditBrand.title = '编辑品牌';
      this.DLaddEditBrand.visible = true;
    },
    addEditBrandCb(data) {
      // 弹层返回
      this.DLaddEditBrand.visible = false;
      if (data) this.getTableData();
    },
    deleteBrand() {
      // 删除
      if (this.tableDataSelected.length < 1) {
        this.$message({
          message: '请选择之少一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.$http.post('/system_permission/brand/delete', { ids: this.tableDataSelected.map(i => i.id) }).then(() => {
        this.$message({
          message: '操作成功！',
          type: 'success',
          showClose: true,
        });
        this.getTableData();
      });
    },
  },
};
</script>
