<template>
  <div>
    <span style="display: none;">{{ specs }} 依赖</span>
    <div class="mb10">
      <span>批量填充：</span>
      <el-input class="w120" v-model="batch.name" placeholder="价格" size="mini"></el-input>
      <el-input class="w120 ml10" v-model="batch.name" placeholder="数量" size="mini"></el-input>
      <el-button class="ml20" type="primary" size="mini">确定</el-button>
    </div>
    <table class="m-table">
      <thead>
        <th v-for="(item, index) in specValues[0]" :key="index">
          {{ item.name }}
        </th>
        <th>价格</th>
        <th>库存</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in specValues" :key="index">
          <td v-for="(obj, i) in item" :key="i">
            {{ obj.value.value }}
          </td>
          <th>
            <el-input class="w120" v-model="item.price" placeholder="价格" size="mini"></el-input>
          </th>
          <th>
            <el-input class="w120" v-model="item.stock" placeholder="价格" size="mini"></el-input>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: ['specs'],
  data() {
    return {
      batch: {},
    };
  },
  computed: {
    specValues() {
      const results = [];
      const result = [];
      const doExchange = (arr, depth = 0) => {
        for (let i = 0; i < arr[depth].values.length; i += 1) {
          result[depth] = {
            name: arr[depth].name,
            value: arr[depth].values[i],
          };
          if (depth !== arr.length - 1) {
            doExchange(arr, depth + 1);
          } else {
            results.push([...result]);
          }
        }
      };
      doExchange(this.specs.filter(i => i.name && i.values.length));
      return results;
    },
  },
  created() {
    if (!this.specs) {
      this.$emit('update:specs', []);
    }
  },
};
</script>

