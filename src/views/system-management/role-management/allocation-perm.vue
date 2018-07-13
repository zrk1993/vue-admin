<template>
  <div>
    <div class="page-nav">
      <div class="title">
        权限分配
      </div>
      <div class="actions">
        <el-button size="mini" type="primary" :loading="loading" @click="confirm">保存</el-button>
      </div>
    </div>
    <div style="padding: 10px;">
      <el-tree
        ref="tree"
        node-key="id"
        :indent="25"
        :default-expand-all="true"
        :default-checked-keys="checkedKeys"
        :show-checkbox="true"
        :data="treeData"
        :props="treeProps"
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      loading: false,
      data: [],
      allocatedPerm: [],
      treeProps: {
        children: 'children',
        label: 'name',
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
            const children = getJsonTree(data, node.id);
            if (children.length > 0) {
              node.children = children;
              node.children.sort((a, b) => b.sort - a.sort);
            }
            itemArr.push(node);
          }
        }
        return itemArr;
      }
      return getJsonTree(this.data, -1);
    },
    checkedKeys() {
      return this.allocatedPerm.map(i => i.id);
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    cancel() {
      this.$emit('callback');
    },
    confirm() {
      this.loading = true;
      this.$http.post('/system_permission/role/allocation_perm', {
        roleId: this.id,
        permIds: this.$refs.tree.getCheckedNodes().map(i => i.id),
      }).then(() => {
        this.$message({
          message: '操作成功！',
          type: 'success',
          showClose: true,
        });
        this.$emit('callback', true);
      }).finally(() => {
        this.loading = false;
      });
    },
    getData() {
      Promise.all([
        this.$http.get('/system_permission/perm/list'),
        this.$http.get('/system_permission/role/own/perm', { params: { roleId: this.id } }),
      ]).then(([permList, allocatedPerm]) => {
        this.data = permList.result;
        this.allocatedPerm = allocatedPerm.result;
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>
