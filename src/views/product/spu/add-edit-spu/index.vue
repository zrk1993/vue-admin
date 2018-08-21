<template>
  <div>
    <div class="page-nav">
      <div class="title">
        商品编辑
      </div>
    </div>
    <div style="padding: 10px;">
      <el-form ref="form" :model="form" label-width="140px" size="small">
        <div class="section">
          <div class="title">
            1. 商品基本信息
          </div>
          <el-form-item label="商品标题：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-input v-model="form.name" class="inline-block w500"></el-input>
            <span class="ml5">12/60</span>
          </el-form-item>
          <el-form-item label="二级标题：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-input v-model="form.name" class="inline-block w500"></el-input>
          </el-form-item>
          <el-form-item label="所属类目：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <span>服装>>上衣</span>
            <el-button class="ml10" type="text">切换</el-button>
          </el-form-item>
          <el-form-item label="商品主图：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false">
              <img v-if="form.imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"
                style="height: 150px; line-height: 150px; width: 150px;">
              </i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品图片：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品属性：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <spu-attr :value="form.attrs"></spu-attr>
          </el-form-item>
          <el-form-item label="商品规格：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <spu-spec :value="form.specs"></spu-spec>
          </el-form-item>
          <el-form-item label="商品库存规格：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <spu-sku :value="form.skus" :specs="form.specs"></spu-sku>
          </el-form-item>
          <el-form-item label="一口价：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-input v-model="form.name" class="inline-block w200"></el-input>
          </el-form-item>
          <el-form-item label="总库存：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-input v-model="form.name" class="inline-block w200"></el-input>
          </el-form-item>
          <el-form-item label="商品描述：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <editor></editor>
          </el-form-item>
        </div>
        <div class="section">
          <div class="title">
            2. 商品物流服务
          </div>
          <el-form-item label="运费模板：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-select class="w200" v-model="form.name" placeholder="请选择">
              <el-option
                vabel="包邮"
                value="包邮">
              </el-option>
              <el-option
                vabel="在售"
                value="在售">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="section">
          <div class="title">
            3. 售后保障信息
          </div>
          <el-form-item label="售后服务：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-checkbox class="block" style="margin-left: 0;" v-model="form.checked">提供发票</el-checkbox>
            <el-checkbox class="block" style="margin-left: 0;" v-model="form.checked">保修服务</el-checkbox>
            <el-checkbox class="block" style="margin-left: 0;" v-model="form.checked">退换货承诺：凡使用支付宝服务付款购买本店商品，若存在质量问题或与描述不符，本店将主动提供退换货服务并承担来回邮费</el-checkbox>
            <el-checkbox class="block" style="margin-left: 0;" v-model="form.checked">服务承诺：该类商品，可支持【七天退货】服务</el-checkbox>
          </el-form-item>
        </div>
        <div class="section">
          <div class="title">
            4. 其他信息
          </div>
          <el-form-item label="上架时间：" prop="name"
            :rules="[
              { required: true, message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-radio v-model="form.radio" label="1">立刻上架</el-radio>
            <el-radio v-model="form.radio" label="2">定时上架</el-radio>
            <el-radio v-model="form.radio" label="3">放入仓库</el-radio>
          </el-form-item>
          <el-form-item label="设定至：" prop="time" v-if="form.radio==='2'"
            :rules="[
              { required: form.radio==='2', message: '请输入', trigger: ['blur', 'change'] },
            ]">
            <el-date-picker
              v-model="form.time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="tac my20">
      <el-button size="mini" type="primary" :loading="loading" @click="confirm">保存</el-button>
    </div>
  </div>
</template>

<script>
import editor from '@/components/Editor';
import spuAttr from './spu-attr';
import spuSpec from './spu-spec';
import spuSku from './spu-sku';

export default {
  components: {
    editor,
    spuAttr,
    spuSpec,
    spuSku,
  },
  data() {
    return {
      loading: false,
      form: {},
    };
  },
  methods: {
    confirm() {},
  },
};
</script>

<style lang="scss" scoped>
.section .title {
  font-size: 16px;
  margin: 10px 0 10px 0;
}
</style>
