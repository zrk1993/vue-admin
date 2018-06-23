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
        <el-button type="primary" size="mini">分配权限</el-button>
        <el-button type="primary" size="mini" @click="addRole">新增</el-button>
        <el-button type="primary" size="mini" @click="editRole">修改</el-button>
        <el-button type="primary" size="mini">作废</el-button>
      </div>
    </div>
    <el-table :data="tableData" :loading="tableLoading"  @selection-change="tableSelectionChange" size="mini" border stripe>
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

    <el-dialog :title="DLaddEditRole.title" :visible.sync="DLaddEditRole.visible" width="500px">
      <add-edit-role v-if="DLaddEditRole.visible" @callback="addEditRoleCb"></add-edit-role>
    </el-dialog>
  </div>
</template>

<script>
import addEditRole from './components/add-edit-role';

export default {
  components: {
    addEditRole,
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      tableDataSelected: [],
      tableLoading: false,

      DLaddEditRole: {
        title: '编辑角色',
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
      this.$http.get('/system_permission/role/list').then((data) => {
        this.tableData = data.result;
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    tableSelectionChange(rows) {
      this.tableDataSelected = rows;
    },
    addRole() {
      // 新增角色
      this.DLaddEditRole.title = '新增角色';
      this.DLaddEditRole.visible = true;
    },
    editRole() {
      // 编辑角色
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.DLaddEditRole.title = '编辑角色';
      this.DLaddEditRole.visible = true;
    },
    addEditRoleCb(data) {
      // 弹层返回
      this.DLaddEditRole.visible = false;
      if (data) this.getTableData();
    },
  },
};
</script>

