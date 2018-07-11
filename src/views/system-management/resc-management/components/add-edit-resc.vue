<template>
  <div class="dialog">
    <div class="dialog-cont tac">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-row>
          <el-col :span="21">
            <el-form-item label="资源名称" prop="name"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="地址" prop="url"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
              ]">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="请求方法" prop="type"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
              ]">
              <el-select
                class="wp100"
                v-model="form.type"
                placeholder="请选择">
                <el-option
                  label="get"
                  value="get">
                </el-option>
                <el-option
                  label="post"
                  value="post">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="所属目录" prop="catg"
              :rules="[
                { required: true, message: '请输入', trigger: ['blur', 'change'] },
              ]">
              <el-select
                class="wp100"
                v-model="form.catg"
                placeholder="请选择">
                <el-option
                  v-for="(k, v) in $store.state.constant.constant['API_CATG']"
                  :key="k"
                  :label="k"
                  :value="v">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
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
      this.$http.post('/system_permission/resc/add', this.form).then((data) => {
        this.$emit('callback', data);
      }).catch(() => {}).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

