<template>
  <div>
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
        <el-button type="primary" size="mini" @click="addSpec">新增</el-button>
        <el-button type="primary" size="mini" @click="editSpec">修改</el-button>
        <el-button type="primary" size="mini" @click="deleteSpec">删除</el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="tableLoading"  @selection-change="tableSelectionChange" size="mini" border stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="属性名"></el-table-column>
      <el-table-column prop="" label="属性值">
        <template slot-scope="scope">
          {{ scope.row.values.split(/[,，]/gi).join('，') }}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="DLaddEditSpec.title" :visible.sync="DLaddEditSpec.visible" width="500px">
      <add-edit-spec v-if="DLaddEditSpec.visible" @callback="addEditSpecCb"></add-edit-spec>
    </el-dialog>
  </div>
</template>

<script>
import addEditSpec from './components/add-edit-spec';

export default {
  components: {
    addEditSpec,
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      tableDataSelected: [],
      tableLoading: false,

      DLaddEditSpec: {
        title: '编辑属性',
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
      this.$http.get('/system_permission/spec/list').then((data) => {
        this.tableData = data.result;
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    tableSelectionChange(rows) {
      this.tableDataSelected = rows;
    },
    addSpec() {
      // 新增属性
      this.DLaddEditSpec.title = '新增属性';
      this.DLaddEditSpec.visible = true;
    },
    editSpec() {
      // 编辑属性
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.DLaddEditSpec.title = '编辑属性';
      this.DLaddEditSpec.visible = true;
    },
    addEditSpecCb(data) {
      // 弹层返回
      this.DLaddEditSpec.visible = false;
      if (data) this.getTableData();
    },
    allocationPerm() {
      // 分配属性
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.$router.push({
        path: '/system-management/spec-management/allocation-perm',
        query: {
          id: this.tableDataSelected[0].id,
        },
      });
    },
    deleteSpec() {
      // 删除
      if (this.tableDataSelected.length < 1) {
        this.$message({
          message: '请选择之少一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.$http.post('/system_permission/spec/delete', { ids: this.tableDataSelected.map(i => i.id) }).then(() => {
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

