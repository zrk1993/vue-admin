<template>
  <div class="dialog">
    <div class="dialog-cont">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="21">
                <el-form-item label="文字" prop="text"
                  :rules="[
                    { required: true, message: '请输入', trigger: ['blur', 'change'] },
                  ]">
                  <el-input v-model="form.text"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="21">
                <el-form-item label="颜色：" prop="color"
                  :rules="[
                    { required: true, message: '请选择', trigger: ['blur', 'change'] },
                  ]">
                  <el-color-picker v-model="form.color"></el-color-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="21">
                <el-form-item label="背景：" prop="background"
                  :rules="[
                    { required: true, message: '请选择', trigger: ['blur', 'change'] },
                  ]">
                  <el-color-picker v-model="form.background"></el-color-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="21">
                <div>
                  <span
                    :style="{ color: form.color, background: form.background }"
                    style="border-radius: 4px; padding: 3px 7px 4px; display: inline-block; font-size: 12px;">
                    {{ form.text }}
                  </span>
                </div>
              </el-col>
            </el-row>
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
      this.$http.post('/system_permission/role/add', this.form).then((data) => {
        this.$emit('callback', data);
      }).catch(() => {}).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

