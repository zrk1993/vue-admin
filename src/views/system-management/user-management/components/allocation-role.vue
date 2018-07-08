<template>
  <div class="dialog">
    <div class="dialog-cont">
      <el-transfer
        :titles="['角色', '分配的角色']"
        :data="roles"
        :props="{
          key: 'id',
          label: 'name'
        }"
        v-model="selectedRoles"
      ></el-transfer>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" :loading="loading" @click="confirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      loading: false,
      roles: [],
      selectedRoles: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$http.get('/system_permission/role/list').then((data) => {
        this.roles = data.result;
      });
    },
    cancel() {
      this.$emit('callback');
    },
    confirm() {
      this.loading = true;
      this.$http.post('/system_permission/user/allocation_role', {
        userId: this.id || 1,
        roleIds: this.selectedRoles,
      }).then(() => {
        this.$message({
          message: '操作成功！',
          type: 'success',
          showClose: true,
        });
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

