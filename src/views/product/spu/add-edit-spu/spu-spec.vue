<template>
  <div class="wrap">
    <el-form ref="form" :model="form" label-width="110px" size="small">
      <div v-for="(item, index) in list" :key="index" class="item">
        <el-form-item label="规格名称：" prop="name" style="margin-bottom: 9px;">
          <el-input
            style="width: 180px; border: none;"
            v-model="item.name">
          </el-input>
          <el-button class="ml5" type="text" @click="addSpec">删除</el-button>
        </el-form-item>
        <el-form-item label="规格可选值：" prop="name">
          <span v-for="(obj, valueI) in item.values" :key="valueI" class="spec-value">
            <el-input
              style="width: 75px"
              v-model="obj.v">
            </el-input>
            <i class="el-icon-close del"></i>
          </span>
          <el-button class="ml20" type="text" @click="addSpecValue(item)">新增</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button class="ml20" type="text" @click="addSpec">新增</el-button>
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
          values: [{ v: '' }],
        },
      ],
    };
  },
  methods: {
    addSpec() {
      this.list.push({
        name: '',
        values: [{ name: '' }],
      });
    },
    addSpecValue(item) {
      item.values.push({ v: '' });
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

.spec-value {
  position: relative;
  display: inline-block;
  margin: 1px 10px 3px 0;
}
.spec-value .del {
  position: absolute;
  top: 9px;
  right: 5px;
  cursor: pointer;
  color: #e42;
  display: none;
}
.spec-value:hover .del {
  display: inline;
}
</style>

