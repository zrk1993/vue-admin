<template>
  <div>
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
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="actions">
        <el-button type="primary" size="mini" @click="checkResc">接口同步</el-button>
        <el-button type="primary" size="mini" @click="addResc">新增</el-button>
        <el-button type="primary" size="mini" @click="editResc">修改</el-button>
        <el-button type="primary" size="mini">作废</el-button>
      </div>
    </div>
    <el-table
      size="mini" border stripe
      :data="tableData"
      :max-height="maxHeight"
      v-auto-height:maxHeight="-15"
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
      <el-table-column prop="usable" label="是否可用" width="80">
        <template slot-scope="scope">
          {{ scope.row.usable ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="备注"></el-table-column>
    </el-table>

    <el-dialog :title="DLaddEditResc.title" :visible.sync="DLaddEditResc.visible" width="500px">
      <add-edit-resc v-if="DLaddEditResc.visible" @callback="addEditRescCb"></add-edit-resc>
    </el-dialog>
    <el-dialog title="检查资源" :visible.sync="DLcheckResc.visible" width="800px">
      <check-resc v-if="DLcheckResc.visible" @callback="checkRescCb"></check-resc>
    </el-dialog>
  </div>
</template>

<script>
import addEditResc from './components/add-edit-resc';
import checkResc from './components/check-resc';

export default {
  components: {
    addEditResc,
    checkResc,
  },
  data() {
    return {
      maxHeight: 0,
      searchForm: {},
      tableData: [],
      tableDataSelected: [],
      tableLoading: false,

      DLaddEditResc: {
        title: '编辑角色',
        visible: false,
      },
      DLcheckResc: {
        visible: false,
      },
    };
  },
  computed: {
    constant() {
      return this.$store.state.constant.constant;
    },
  },
  created() {
    this.getTableData();
  },
  methods: {
    search() {
      this.getTableData();
    },
    getTableData() {
      this.tableLoading = true;
      this.$http.get('/system_permission/resc/list',
        { params: { catg: (this.searchForm.catg || []).join(',') } }).then((data) => {
        this.tableData = data.result;
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    tableSelectionChange(rows) {
      this.tableDataSelected = rows;
    },
    addResc() {
      // 新增资源
      this.DLaddEditResc.title = '新增资源';
      this.DLaddEditResc.visible = true;
    },
    editResc() {
      // 编辑资源
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.DLaddEditResc.title = '编辑资源';
      this.DLaddEditResc.visible = true;
    },
    addEditRescCb(data) {
      // 弹层返回
      this.DLaddEditResc.visible = false;
      if (data) this.getTableData();
    },
    checkResc() {
      // 接口检查
      this.DLcheckResc.visible = true;
    },
    checkRescCb(data) {
      this.DLcheckResc.visible = false;
      if (data) this.getTableData();
    },
  },
};
</script>

