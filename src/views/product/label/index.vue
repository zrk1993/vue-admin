<template>
  <div>
    <div class="search-form">
      <el-form :model="searchForm" ref="searchForm" size="mini" inline>
        <el-form-item label="标签名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="actions">
        <el-button type="primary" size="mini" @click="addLabel">新增</el-button>
        <el-button type="primary" size="mini" @click="editLabel">修改</el-button>
        <el-button type="primary" size="mini" @click="deleteLabel">删除</el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="tableLoading"  @selection-change="tableSelectionChange" size="mini" border stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="预览">
        <template slot-scope="scope">
          <span
            :style="{ color: scope.row.color, background: scope.row.background }"
            style="border-radius: 2px; padding: 2px 4px;margin: 5px;">
            {{ scope.row.text }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="text" label="文字"></el-table-column>
      <el-table-column prop="color" label="颜色"></el-table-column>
      <el-table-column prop="background" label="背景"></el-table-column>
      <el-table-column prop="usable" label="是否可用" width="80">
        <template slot-scope="scope">
          {{ scope.row.usable ? '是' : '否' }}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="DLaddEditLabel.title" :visible.sync="DLaddEditLabel.visible" width="600px">
      <add-edit-label v-if="DLaddEditLabel.visible" @callback="addEditLabelCb"></add-edit-label>
    </el-dialog>
  </div>
</template>

<script>
import addEditLabel from './components/add-edit-label';

export default {
  components: {
    addEditLabel,
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      tableDataSelected: [],
      tableLoading: false,

      DLaddEditLabel: {
        title: '编辑标签',
        visible: false,
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.tableLoading = true;
      this.$http.get('/system_permission/user/list').then((data) => {
        this.tableData = data.result;
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    tableSelectionChange(rows) {
      this.tableDataSelected = rows;
    },
    addLabel() {
      // 新增标签
      this.DLaddEditLabel.title = '新增标签';
      this.DLaddEditLabel.visible = true;
    },
    editLabel() {
      // 编辑标签
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.DLaddEditLabel.title = '编辑标签';
      this.DLaddEditLabel.visible = true;
    },
    addEditLabelCb(data) {
      // 弹层返回
      this.DLaddEditLabel.visible = false;
      if (data) this.getTableData();
    },
    deleteLabel() {
      // 删除
      if (this.tableDataSelected.length < 1) {
        this.$message({
          message: '请选择之少一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.$http.post('/system_permission/label/delete', { ids: this.tableDataSelected.map(i => i.id) }).then(() => {
        this.$message({
          message: '操作成功！',
          type: 'success',
          showClose: true,
        });
        this.getTableData();
      });
    },
  },
};
</script>
