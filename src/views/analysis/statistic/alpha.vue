<template>
  <BasicLayout>
    <template #wrapper>
      <div class="box-card">
        <div>
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="1px"
            label-position="top"
          >
            <el-form-item label="分析导航" prop="field113">
              <el-input
                v-model="formData.field113"
                type="textarea"
                placeholder="分析导航提供微生物多样性数据分析整体导览图，可通过导览图定制分析流程；分析指南通过真实的文献分析案例引导您快速开启微生物多样性数据分析之旅。分析导航"
                readonly
                :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"
              />
            </el-form-item>
            <el-form-item label="分析软件信息" prop="field115">
              <el-input
                v-model="formData.field115"
                type="textarea"
                placeholder="展示该项目下各分析所用分析软件及其版本号等信息。"
                readonly
                :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-form>
        </div>
      </div></template>
  </basiclayout>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field113: '分析导航提供微生物多样性数据分析整体导览图，可通过导览图定制分析流程；分析指南通过真实的文献分析案例引导您快速开启微生物多样性数据分析之旅。',
        field115: '展示该项目下各分析所用分析软件及其版本号等信息。'
      },
      rules: {
        field113: [{
          required: true,
          message: '分析导航提供微生物多样性数据分析整体导览图，可通过导览图定制分析流程；分析指南通过真实的文献分析案例引导您快速开启微生物多样性数据分析之旅。分析导航',
          trigger: 'blur'
        }],
        field115: [{
          required: true,
          message: '展示该项目下各分析所用分析软件及其版本号等信息。',
          trigger: 'blur'
        }]
      }
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
    }
  }
}

</script>
<style>
</style>
