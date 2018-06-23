<template>
  <div class="dialog">
    <div class="dialog-cont tac">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="uname"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
                { pattern: validate.uname, message: '4到16位（字母，数字，下划线，减号）！', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.uname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="realName"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.realName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone"
              :rules="[
                { pattern: validate.phone, message: '正确的手机号！', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
  </div>
</template>

<script>
import validate from '@/utils/validate';

export default {
  data() {
    return {
      validate,
      loading: false,
      form: {},
    };
  },
  methods: {
    cancel() {
      this.$emit('callback');
    },
    confirm() {
      this.loading = true;
      this.$http.post('/system_permission/user/add', this.form).then((data) => {
        this.$emit('callback', data);
      }).catch(() => {}).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

