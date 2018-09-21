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
        <el-button type="primary" size="mini" @click="allocationRole">分配角色</el-button>
        <el-button type="primary" size="mini" @click="addUser">新增</el-button>
        <el-button type="primary" size="mini" @click="editUser">修改</el-button>
        <el-button type="primary" size="mini" @click="deleteUser" v-if="$hasPermission(['admin'])">删除</el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="tableLoading"  @selection-change="tableSelectionChange" size="mini" border stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="uname" label="用户名"></el-table-column>
      <el-table-column prop="realName" label="真实姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="usable" label="是否可用" width="80">
        <template slot-scope="scope">
          {{ scope.row.usable ? '是' : '否' }}
        </template>
      </el-table-column>
       <el-table-column prop="" label="已分配角色">
          <template slot-scope="scope">
            {{ scope.row.roles.map(i => i.name).join('，') }}
          </template>
       </el-table-column>
      <el-table-column prop="desc" label="备注" show-overflow-tooltip></el-table-column>
    </el-table>

    <el-dialog :title="DLaddEditUser.title" :visible.sync="DLaddEditUser.visible" width="800px">
      <add-edit-user v-if="DLaddEditUser.visible" @callback="addEditUserCb"></add-edit-user>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="DLallocationRole.visible" width="600px">
      <allocation-role v-if="DLallocationRole.visible" :id="DLallocationRole.id" :roleIds="DLallocationRole.roleIds" @callback="allocationRoleCb"></allocation-role>
    </el-dialog>
  </div>
</template>

<script>
import addEditUser from './components/add-edit-user';
import allocationRole from './components/allocation-role';

export default {
  components: {
    addEditUser,
    allocationRole,
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      tableDataSelected: [],
      tableLoading: false,

      DLaddEditUser: {
        title: '编辑用户',
        visible: false,
      },
      DLallocationRole: {
        id: null,
        roleIds: [], // 已分配的角色
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
    addUser() {
      // 新增用户
      this.DLaddEditUser.title = '新增用户';
      this.DLaddEditUser.visible = true;
    },
    editUser() {
      // 编辑用户
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.DLaddEditUser.title = '编辑用户';
      this.DLaddEditUser.visible = true;
    },
    addEditUserCb(data) {
      // 弹层返回
      this.DLaddEditUser.visible = false;
      if (data) this.getTableData();
    },
    allocationRole() {
      // 分配角色
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.DLallocationRole.id = this.tableDataSelected[0].id;
      this.DLallocationRole.roleIds = this.tableDataSelected[0].roles.map(i => i.id);
      this.DLallocationRole.visible = true;
    },
    allocationRoleCb(data) {
      this.DLallocationRole.visible = false;
      if (data) this.getTableData();
    },
    deleteUser() {
      // 删除
      if (this.tableDataSelected.length < 1) {
        this.$message({
          message: '请选择之少一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.$http.post('/system_permission/user/delete', { ids: this.tableDataSelected.map(i => i.id) }).then(() => {
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

