<template>
  <div>
    <div class="search-form">
      <el-form :model="searchForm" ref="searchForm" size="mini" inline>
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属目录">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品标签">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            v-model="searchForm.name"
            value-format="yy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="searchForm.name" style="width: 100px;" placeholder="请选择">
            <el-option
              vabel="已下架"
              value="已下架">
            </el-option>
            <el-option
              vabel="在售"
              value="在售">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-select v-model="searchForm.name" style="width: 100px;" placeholder="请选择">
            <el-option
              vabel="启用"
              value="启用">
            </el-option>
            <el-option
              vabel="作废"
              value="作废">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="ml10">
          <el-button type="primary">查询</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="actions">
        <el-button type="primary" size="mini" @click="addSpu">新增商品</el-button>
        <el-button type="primary" size="mini" @click="editSpu">修改商品</el-button>
        <el-button type="primary" size="mini" @click="deleteSpu">删除商品</el-button>
      </div>
    </div>
    <el-table :data="tableData" v-loading="tableLoading"  @selection-change="tableSelectionChange" size="mini" border stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="图片" width="70">
        <template slot-scope="scope">
          <img :src="scope.row.picture" alt="商品" width="60" height="60">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="name" label="描述"></el-table-column>
      <el-table-column prop="name" label="价格"></el-table-column>
      <el-table-column prop="name" label="品牌"></el-table-column>
      <el-table-column prop="name" label="目录"></el-table-column>
      <el-table-column prop="name" label="标签"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="usable" label="是否在售" width="80">
        <template slot-scope="scope">
          {{ scope.row.usable ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="usable" label="是否可用" width="80">
        <template slot-scope="scope">
          {{ scope.row.usable ? '是' : '否' }}
        </template>
      </el-table-column>
    </el-table>

    <div class="tar mt15">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>

    <el-dialog :title="DLaddEditSpu.title" :visible.sync="DLaddEditSpu.visible" width="800px">
      <add-edit-spu v-if="DLaddEditSpu.visible" @callback="addEditSpuCb"></add-edit-spu>
    </el-dialog>
  </div>
</template>

<script>
import addEditSpu from './components/add-edit-spu';

export default {
  components: {
    addEditSpu,
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      tableDataSelected: [],
      tableLoading: false,

      DLaddEditSpu: {
        title: '编辑商品',
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
    addSpu() {
      // 新增商品
      this.$router.push({
        title: '新增商品',
        path: '/product/spu/add-edit-spu',
      });
    },
    editSpu() {
      // 编辑商品
      if (this.tableDataSelected.length !== 1) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.$router.push({
        title: '编辑商品',
        path: '/product/spu/add-edit-spu',
        query: {
          id: 1,
        },
      });
    },
    addEditSpuCb(data) {
      // 弹层返回
      this.DLaddEditSpu.visible = false;
      if (data) this.getTableData();
    },
    deleteSpu() {
      // 删除
      if (this.tableDataSelected.length < 1) {
        this.$message({
          message: '请选择之少一条记录！',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.$http.post('/system_permission/spu/delete', { ids: this.tableDataSelected.map(i => i.id) }).then(() => {
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
