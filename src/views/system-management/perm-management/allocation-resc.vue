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
        <div v-for="(item, item_k) in rescData" :key="item_k" class="catg">
          <div class="catg-title">
            {{ item.name }}
          </div>
          <div class="classify-wrap">
            <div v-for="(obj, obj_k) in item.children" :key="obj_k" class="classify">
              <div v-for="(resc, resc_i) in obj" :key="resc_i" class="item">
                <el-checkbox v-model="resc.checked">{{ resc.name }}</el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Checkbox } from 'element-ui';

export default {
  data() {
    return {
      id: null,
      loading: false,
      dataList: [],
      allocatedResc: [],
    };
  },
  computed: {
    constant() {
      return this.$store.state.constant.constant;
    },
    rescData() {
      const result = {};
      this.dataList.forEach((item) => {
        if (!result[item.catg]) {
          result[item.catg] = {
            catg: item.catg,
            name: this.constant.API_CATG[item.catg],
            children: {},
          };
        }
        const l2 = item.url.split(/\//)[2] || 'index';
        if (!result[item.catg].children[l2]) {
          result[item.catg].children[l2] = [];
        }
        result[item.catg].children[l2].push(item);
      });
      return result;
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    confirm() {
      this.loading = true;
      this.$http.post('/system_permission/perm/allocation_resc', {
        permId: this.id,
        rescIds: this.dataList.filter(i => i.checked).map(i => i.id),
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
    renderHeader(createElement) {
      const that = this;
      return createElement(Checkbox, {
        on: {
          change(val) {
            that.tableData.forEach((item) => {
              item.checked = val;
            });
          },
        },
      });
    },
    getData() {
      this.loading = true;
      Promise.all([
        this.$http.get('/system_permission/resc/list'),
        this.$http.get('/system_permission/perm/own/resc', { params: { permId: this.id } }),
      ]).then(([rescList, allocatedResc]) => {
        rescList.result.forEach((item) => {
          const f = allocatedResc.result.find(i => i.id === item.id);
          if (f) item.checked = true;
        });
        this.dataList = rescList.result;
        this.allocatedResc = allocatedResc.result;
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.catg {
  margin: 15px 0;
}
.catg-title {
  font-size: 16px;
}
.classify-wrap {
  padding: 10px 0 0 15px;
  display: flex;
  flex-wrap: wrap;
}
.classify {
  width: 250px;
  margin-bottom: 10px;
}
.classify .item {
  margin: 5px 0 5px 0;
}
</style>

