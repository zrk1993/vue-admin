<template>
  <div class="wrap">
    <el-form ref="form" :model="form" inline label-width="0" size="mini">
      <el-form-item v-for="(item, index) in list" :key="index" class="item">
        <el-input
          style="width: 80px"
          placeholder="属性名"
          v-model="item.name">
        </el-input>
        ：
        <el-input
          style="width: 140px"
          placeholder="属性值"
          v-model="item.value">
        </el-input>
        <el-button class="ml5" type="text">删除</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button class="ml15" type="text" @click="addAttr">新增</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      list: [
        {
          name: '1',
          value: '22',
        },
      ],
    };
  },
  methods: {
    addAttr() {
      this.list.push({
        name: '',
        value: '',
      });
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 620px;
  padding: 15px 0 0px 0px;
  border: 1px solid #eee;
}
.wrap .item {
  margin: 5px 15px 10px 15px;
}
</style>

