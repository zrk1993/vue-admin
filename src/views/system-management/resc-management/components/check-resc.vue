<template>
  <div class="dialog">
    <div class="dialog-cont tac" v-loading="tableLoading">
      <el-table
        size="mini"
        border
        stripe
        :max-height="380"
        :data="tableData"
        v-loading="tableLoading"
        @selection-change="tableSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="接口名称"></el-table-column>
        <el-table-column prop="url" label="地址"></el-table-column>
        <el-table-column prop="catg" label="所属目录">
          <template slot-scope="scope">
            {{ constant['API_CATG'][scope.row.catg] }}
          </template>
        </el-table-column>
        <el-table-column prop="catg" label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='add'" class="text-success">新增</span>
            <span v-if="scope.row.type=='remove'" class="text-danger">删除</span>
            <span v-if="scope.row.type=='update'" class="text-warning">修改</span>
          </template>
        </el-table-column>
      </el-table>
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
      tableData: [],
      tableDataSelected: [],
      loading: false,
      tableLoading: false,
    };
  },
  computed: {
    constant() {
      return this.$store.state.constant.constant;
    },
  },
  created() {
    this.init();
  },
  methods: {
    tableSelectionChange(rows) {
      this.tableDataSelected = rows;
    },
    cancel() {
      this.$emit('callback');
    },
    init() {
      this.tableLoading = true;
      this.$http.get('/system_permission/resc/check').then((data) => {
        this.tableData = data.result;
        if (this.tableData.length < 1) {
          this.$message({
            message: '无需要同步的资源',
            type: 'warning',
            showClose: true,
          });
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    confirm() {
      this.loading = true;
      const rescSync = (resc = {}) => {
        if (resc.type === 'add') {
          return this.$http.post('/system_permission/resc/add', resc);
        } else if (resc.type === 'update') {
          return this.$http.post('/system_permission/resc/update', resc);
        }
        return Promise.reject();
      };

      const success = [];
      const failure = [];
      const loop = (arr, index) => {
        rescSync(arr[index]).then(() => {
          success.push(arr[index]);
        }).catch(() => {
          failure.push(arr[index]);
        }).finally(() => {
          if (arr.length > index + 1) {
            loop(arr, index + 1);
          } else {
            this.$message({
              message: `本次操作成功${success.length}, 失败${failure.length}`,
              type: failure.length > 0 ? 'warning' : 'success',
              showClose: true,
            });
            this.loading = false;
            this.$emit('callback', {});
          }
        });
      };

      loop(this.tableDataSelected, 0);
    },
  },
};
</script>

