<template>
  <div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
    >
      <el-form-item label="日期范围" prop="field101">
        <el-date-picker
          type="daterange"
          v-model="formData.field101"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :style="{ width: '100%' }"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          range-separator="至"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="评分" prop="field102">
        <el-rate v-model="formData.field102" :max="5"></el-rate>
      </el-form-item>
      <el-form-item label="上传" prop="field103" required>
        <el-upload
          ref="field103"
          :file-list="field103fileList"
          :action="field103Action"
          :before-upload="field103BeforeUpload"
        >
          <el-button size="small" type="primary" icon="el-icon-upload"
            >点击上传</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="滑块" prop="field104" required>
        <el-slider :max="100" :step="1" v-model="formData.field104"></el-slider>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field101: null,
        field102: 0,
        field103: null,
        field104: 0
      },
      rules: {
        field101: [
          {
            required: true,
            message: '日期范围不能为空',
            trigger: 'change'
          }
        ],
        field102: [
          {
            required: true,
            message: '评分不能为空',
            trigger: 'change'
          }
        ]
      },
      field103Action: 'https://jsonplaceholder.typicode.com/posts/',
      field103fileList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    field103BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    }
  }
}
</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

.el-upload__tip {
  line-height: 1.2;
}
</style>
