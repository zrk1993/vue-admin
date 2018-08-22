<template>
  <div class="dialog">
    <div class="dialog-cont tac">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="22">
            <el-form-item label="名称" prop="name"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="code" prop="code"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="排序" prop="sort"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="上级权限" prop="parentName"
              :rules="[
                { required: true, message: '请选择上级权限', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.parentName" readonly>
                 <el-button slot="append" icon="el-icon-search" @click="choosePerm"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" :loading="loading" @click="confirm">确 定</el-button>
    </div>
    <el-dialog title="选择权限" :visible.sync="DLchoosePerm.visible" width="500px" append-to-body>
      <choose-perm v-if="DLchoosePerm.visible" @callback="choosePermCb"></choose-perm>
    </el-dialog>
  </div>
</template>

<script>
import validate from '@/utils/validate';
import choosePerm from './choose-perm';

export default {
  components: {
    choosePerm,
  },
  props: ['data', 'parent'],
  data() {
    return {
      validate,
      loading: false,
      form: {
        code: this.parent.code,
        parentId: this.parent.id,
        parentName: this.parent.name,
      },

      DLchoosePerm: {
        visible: false,
      },
    };
  },
  created() {
    if (this.data) this.form = Object.assign({}, this.data);
  },
  methods: {
    cancel() {
      this.$emit('callback');
    },
    confirm() {
      this.loading = true;
      const url = this.form.id ? '/system_permission/perm/update' : '/system_permission/perm/add';
      this.$http.post(url, this.form).then((data) => {
        this.$emit('callback', data);
      }).catch(() => {}).finally(() => {
        this.loading = false;
      });
    },
    choosePerm() {
      this.DLchoosePerm.visible = true;
    },
    choosePermCb(data) {
      this.DLchoosePerm.visible = false;
      if (data) {
        this.form.parentName = data.name;
        this.form.parentId = data.id;
      }
    },
  },
};
</script>
