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
        <el-button type="primary" size="mini">分配角色</el-button>
        <el-button type="primary" size="mini" @click="addUser">新增</el-button>
        <el-button type="primary" size="mini" @click="editUser">修改</el-button>
        <el-button type="primary" size="mini">作废</el-button>
      </div>
    </div>
    <el-table :data="tableData" :loading="tableLoading"  @selection-change="tableSelectionChange" size="mini" border stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="uname" label="用户名"></el-table-column>
      <el-table-column prop="realName" label="真实姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="usable" label="是否可用">
        <template slot-scope="scope">
          {{ scope.row.usable ? '是' : '否' }}
        </template>
      </el-table-column>
       <el-table-column prop="" label="已分配角色"></el-table-column>
      <el-table-column prop="desc" label="备注"></el-table-column>
    </el-table>

    <el-dialog :title="DLaddEditUser.title" :visible.sync="DLaddEditUser.visible" width="800px">
      <add-edit-user v-if="DLaddEditUser.visible" @callback="addEditUserCb"></add-edit-user>
    </el-dialog>
  </div>
</template>

<script>
import addEditUser from './components/add-edit-user';

export default {
  components: {
    addEditUser,
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
  },
};
</script>

