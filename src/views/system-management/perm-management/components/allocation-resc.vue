<template>
  <div class="dialog">
    <div class="dialog-cont">
      <div class="search-form">
        <el-form :model="searchForm" ref="searchForm" size="mini" inline>
          <el-form-item label="目录">
            <el-select
              v-model="searchForm.catg"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="(k, v) in constant['API_CATG']"
                :key="k"
                :label="k"
                :value="v">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button size="mini" type="primary" :loading="loading" @click="confirm">确 定</el-button>
        </div>
      </div>
      <el-table
        size="mini" border stripe
        :data="tableData"
        :max-height="350"
        v-loading="loading"
      >
        <el-table-column label="选择" width="55" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="接口名称"></el-table-column>
        <el-table-column prop="url" label="地址"></el-table-column>
        <el-table-column prop="catg" label="所属目录">
          <template slot-scope="scope">
            {{ constant['API_CATG'][scope.row.catg] }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Checkbox } from 'element-ui';

export default {
  props: ['id'],
  data() {
    return {
      searchForm: {},
      loading: false,
      dataList: [],
      allocatedResc: [],
    };
  },
  computed: {
    constant() {
      return this.$store.state.constant.constant;
    },
    tableData() {
      let result = this.dataList;

      if (this.searchForm.catg && this.searchForm.catg.length > 0) {
        result = result.filter(item => !!this.searchForm.catg.find(i => i === item.catg));
      }

      return result;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    search() {
      this.searchForm = this.searchForm;
    },
    cancel() {
      this.$emit('callback');
    },
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
        this.$emit('callback', true);
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
