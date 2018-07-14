<template>
  <div class="dialog">
    <div class="dialog-cont tac" style="height: 350px; overflow: auto;">
      <el-row>
        <el-col :span="8">
          <div class="title">旧的</div>
          <el-tree
            :data="treeData"
            :props="treeProps"
            :default-expand-all="true"
          ></el-tree>
        </el-col>
        <el-col :span="8">
          <div class="title">新的</div>
          <el-tree
            :data="newTreeData"
            :props="treeProps"
            :default-expand-all="true"
          ></el-tree>
        </el-col>
        <el-col :span="8">
          <div class="title">差异</div>
          <el-tree
            :data="diffTreeData"
            :default-expand-all="true"
          >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="text-success" v-if="data.action === 'add'">{{ data.name }}</span>
            <span class="text-warning" v-else-if="data.action === 'update'">{{ data.name }}</span>
            <span v-else>{{ data.name }}</span>
          </span>
          </el-tree>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" :loading="loading" @click="confirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { asyncRouterMap } from '@/router/routerMap';

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
      function getJsonTree(data, parentId) {
        const itemArr = [];
        for (let i = 0; i < data.length; i += 1) {
          const node = data[i];
          if (node.parentId === parentId) {
            const children = getJsonTree(data, node.id);
            if (children.length > 0) {
              node.children = children;
              node.children.sort((a, b) => a.sort - b.sort);
            }
            itemArr.push(node);
          }
        }
        return itemArr;
      }
      return getJsonTree(this.data, -1);
    },
    newTreeData() {
      const map = (arr) => {
        return arr.filter(i => i.meta && i.meta.code).map((item, index) => {
          return {
            name: item.meta.title,
            code: item.meta.code,
            sort: index,
            parentId: null,
            children: item.children ? map(item.children) : null,
          };
        });
      };
      return map([
        {
          meta: {
            title: '管理系统',
            code: 'f_perm',
          },
          children: asyncRouterMap,
        },
      ]);
    },
    diffTreeData() {
      const compare = (source, target = []) => {
        const result = [];
        source.forEach((item) => {
          const f = target.find(i => i.code === item.code);
          if (f) {
            item.id = f.id;
            if (f.name !== item.name) {
              item.action = 'update';
            } else {
              item.action = 'none';
            }
          } else {
            item.action = 'add';
          }
          if (item.children) {
            item.children = compare(item.children, (f || {}).children);
          }
          result.push(item);
        });
        return result;
      };
      const diffTree = compare(this.newTreeData, this.treeData);
      return diffTree;
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
      let times = 0; // 换个思路， 解决异步全部完成的回掉
      let success = 0;
      let failure = 0;
      const work = (perm, parentId) => {
        return new Promise((resolve, reject) => {
          if (perm.action === 'none') {
            resolve(perm);
            return;
          }
          const url = perm.action === 'update' ? '/system_permission/perm/update' : '/system_permission/perm/add';
          const data = Object.assign({}, perm);
          data.parentId = parentId;
          delete data.children;
          this.loading = true;
          times += 1;
          this.$http.post(url, data).then((d) => {
            success += 1;
            resolve(Object.assign(perm, d.result));
          }).catch(() => {
            failure += 1;
            reject(perm);
          }).finally(() => {
            times -= 1;
            if (times === 0) {
              this.loading = false;
              this.$message({
                message: `本次操作成功${success}, 失败${failure}`,
                type: failure.length > 0 ? 'warning' : 'success',
                showClose: true,
              });
              this.getData();
            }
          });
        });
      };
      const all = [];
      const loop = (arr, parentId) => {
        arr.forEach((item) => {
          const unit = work(item, parentId).then((r) => {
            if (r.children) {
              loop(r.children, r.id);
            }
          });
          all.push(unit);
        });
      };
      loop(this.diffTreeData, -1);
    },
    getData() {
      this.$http.get('/system_permission/perm/list').then((data) => {
        this.data = data.result;
      });
    },
  },
};
</script>

<style scoped>
.title {
  text-align: left;
  font-size: 16px;
  margin: 0 0 10px 2px;
}
</style>

