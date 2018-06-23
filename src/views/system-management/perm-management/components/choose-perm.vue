<template>
  <div class="dialog">
    <div class="dialog-cont tac">
      <el-tree
        :data="treeData"
        :props="treeProps"
        :highlight-current="true"
        @node-click="treeNodeClick"
      ></el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" :loading="loading" @click="confirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      data: [],
      treeNodeSelected: null,
      treeProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  computed: {
    treeData() {
      return this.data;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    cancel() {
      this.$emit('callback');
    },
    confirm() {
      this.$emit('callback', this.treeNodeSelected);
    },
    getData() {
      this.$http.get('/system_permission/perm/list').then((data) => {
        this.data = data.result;
      });
    },
    treeNodeClick(data) {
      this.treeNodeSelected = data;
    },
  },
};
</script>
