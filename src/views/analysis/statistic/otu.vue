<template>
  <div>
    <el-row :gutter="15">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
        label-position="top"
      >
        <el-col
          :span="4"
        >
          <el-form-item label="Database:" prop="el_selete_database">
            <el-select
              v-model="formData.el_selete_database"
              placeholder="请选择Database"
              clearable
              :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in el_selete_databaseOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
              <!-- </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="Program:" prop="el_selete_program">
            <el-select
              v-model="formData.el_selete_program"
              placeholder="请选择Program:"
              clearable
              :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in el_selete_programOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
              <!-- </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="E-Value:" prop="el_selete_e_vlaue">
            <el-select
              v-model="formData.el_selete_e_vlaue"
              placeholder="请选择E-Value:"
              clearable
              :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in el_selete_e_vlaueOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
              <!-- </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="Best Hit:" prop="el_inputed_best_hit">
            <el-input
              v-model="formData.el_inputed_best_hit"
              placeholder="请输入Best Hit:"
              clearable
              :style="{width: '100%'}"
            />
            <!-- </el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="Best Match:" prop="el_inputed_best_match">
            <el-input
              v-model="formData.el_inputed_best_match"
              placeholder="请输入Best Match:"
            />
            <!-- </el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="FASTA:" prop="el_input_textarea_fasta">
            <el-input
              v-model="formData.el_input_textarea_fasta"
              type="textarea"
              placeholder="请输入多行文本FASTA:"
              :autosize="{minRows: 4, maxRows: 4}"
              :style="{width: '100%'}"
            />
            <!-- </el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="200px" label="" prop="el_button_primary_submit">
            <el-button type="primary" icon="el-icon-search" size="medium">
              提交
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        el_selete_database: 1,
        el_selete_program: 1,
        el_selete_e_vlaue: 1,
        el_inputed_best_hit: 0,
        el_inputed_best_match: 0,
        el_input_textarea_fasta: '',
        el_button_primary_submit: undefined
      },
      rules: {
        el_selete_database: [],
        el_selete_program: [],
        el_selete_e_vlaue: [],
        el_inputed_best_hit: [],
        el_inputed_best_match: [],
        el_input_textarea_fasta: [{
          required: true,
          message: '请输入多行文本FASTA:',
          trigger: 'blur'
        }]
      },
      el_selete_databaseOptions: [{
        'label': '本地数据库',
        'value': 1
      }, {
        'label': 'NCBI数据库',
        'value': 2
      }, {
        'label': '引物数据库',
        'value': 3
      }],
      el_selete_programOptions: [{
        'label': 'blastn',
        'value': 1
      }, {
        'label': 'blastp',
        'value': 2
      }, {
        'label': 'blastx',
        'value': 3
      }],
      el_selete_e_vlaueOptions: [{
        'label': '10',
        'value': 1
      }, {
        'label': '1',
        'value': 2
      }, {
        'label': '0.1',
        'value': 3
      }, {
        'label': '0.01',
        'value': 4
      }],
      el_inputed_best_hitOptions: [{
        'label': '10',
        'value': 1
      }, {
        'label': '1',
        'value': 2
      }, {
        'label': '0.1',
        'value': 3
      }, {
        'label': '0.01',
        'value': 4
      }],
      el_inputed_best_matchOptions: [{
        'label': '10',
        'value': 1
      }, {
        'label': '1',
        'value': 2
      }, {
        'label': '0.1',
        'value': 3
      }, {
        'label': '0.01',
        'value': 4
      }]
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
