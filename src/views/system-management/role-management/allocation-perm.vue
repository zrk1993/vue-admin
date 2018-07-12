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
      <div>
        <div v-for="(item, item_i) in treeData" :key="item_i">
          <div>
            <div v-for="(obj, obj_i) in item.children" :key="obj_i">
              <div>
                {{ obj.name }}
              </div>
              <div v-for="(perm, perm_i) in obj.children" :key="perm_i">
                <el-checkbox v-model="perm.checked">{{ perm.name }}</el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            if (children.length > 0) node.children = children;
            itemArr.push(node);
          }
        }
        return itemArr;
      }
      return getJsonTree(this.data, -1);
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
        permIds: this.treeNodeSelected.map(i => i.id),
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
      this.$http.get('/system_permission/perm/list').then((data) => {
        this.data = data.result;
      });
    },
  },
};
</script>

<style scoped>
</style>
