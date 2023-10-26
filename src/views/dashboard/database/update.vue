/** * @FileDesc: 数据库上传，能够上传数据库数据 * @Author: * @Func:
能够单条新增，fasta 文件上传，excel 上传 * @Components: */
<template>
  <!-- 页签上传选中 -->
  <el-tabs :tab-position="tabPosition" style="height: 800px">
    <el-tab-pane label="新增数据">
      <div>
        <el-col :span="24">
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="50px"
            label-position="top"
          >
            <el-form-item label="编号">
              <el-col :span="2.5">
                <el-input
                  v-model="formData.input1"
                  placeholder="请输入编号"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="拉丁文名">
              <el-col :span="2.5">
                <el-input
                  v-model="formData.input2"
                  placeholder="请输入拉丁文名"
                />
              </el-col>

            </el-form-item>
            <el-form-item label="数据库">
              <el-radio-group v-model="formData.resource">
                <el-radio label="NCBI数据库" />
                <el-radio label="北京数据库" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="分类">
              <el-autocomplete
                v-model="formData.state1"
                class="inline-input"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="FASTA:" prop="el_input_textarea_fasta">
              <el-input
                v-model="formData.el_input_textarea_fasta"
                type="textarea"
                placeholder="请输入多行文本FASTA:"
                :autosize="{ minRows: 6, maxRows: 10 }"
                :style="{ width: '100%' }"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <div v-if="savedData">
          <strong>保存的内容:</strong>
          <pre>{{ savedData }}</pre>
        </div>
        <el-row>
          <el-button type="primary">保存</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="文件上传">
      <div :span="10">
        <el-input
          readonly="true"
          type="textarea"
          :rows="10"
          placeholder="Prepare your sequence(s) in the FASTA format that starts with a definition line, followed with a hard return and the sequence. The simplest definition line requires the “> “symbol and a sequence_ID.

Example:

>Seq1
CCTTTAT...
>Seq2
GGTAGGT...
Use only ASCII characters for your definition line and IUPAC codes for your sequences. Upload a FASTA file as a plain-text file (prepared with a text editor). The file may have one or more sequences."
        />
      </div>
      <el-row>
        <p>
          上传文件目前仅支持 fasta,excel
        </p>
      </el-row>
      <div :span="10">
        <el-form
          ref="uploadForm"
          :model="formData"
          :rules="rules"
          size="big"
          label-width="100px"
        >
          <el-form-item label="上传" prop="uploadFile" required>
            <el-upload
              ref="uploadFile"
              :headers="headers"
              :file-list="uploadFilefileList"
              :action="uploadFileAction"
              :before-upload="uploadFileBeforeUpload"
              accept=".fasta,.xlsx,.xls"
              name="file"
              :data="uploadParams"
              :on-success="uploadActionSuccess"
            >
              <el-button
                size="big"
                type="primary"
                icon="el-icon-upload"
              >点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类">
            <el-autocomplete
              v-model="formData.state1"
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            />
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="submitUploadForm">提交</el-button>
            <el-button @click="resetUploadForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
.header-button {
  width: auto;
  margin: 1rem 0.3rem;
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 1.4rem;
  font-weight: normal;
  white-space: nowrap;
  padding: 0.5rem 0.5rem;
}
.title-bar {
  background-color: #20558a;
  height: 100px;
  width: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script>
import { addSequence, uploadSequenceByFile } from '@/api/sequence/sequence'

import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      tabPosition: 'left',
      fastaContent: '', // 绑定文本框的值
      headers: { Authorization: 'Bearer ' + getToken() },
      formData: {
        el_selete_database: 1,
        input1: '',
        input2: '',
        resource: '',
        state1: '',
        el_input_textarea_fasta: '',
        el_button_primary_submit: undefined
      },
      rules: {
        el_input_textarea_fasta: [
          {
            required: true,
            message: '请输入多行文本FASTA:',
            trigger: 'blur'
          }
        ]
      },
      savedData: {}, // 保存的数据对象
      uploadFileAction:
        process.env.VUE_APP_BASE_API + '/api/v1/public/uploadFile',
      uploadParams: {
        type: 4
      },
      uploadFilefileList: []
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        // 分类选项
        { value: '浮游动物', address: '浮游动物' },
        { value: '浮游植物', address: '浮游植物' },
        { value: '底栖动物', address: '底栖动物' },
        { value: '水生植物', address: '水生植物' },
        { value: '鱼类', address: '鱼类' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    submitUploadForm() {
      this.$refs['uploadForm'].validate((valid) => {
        // console.log(this.uploadFilefileList)
        // if (!valid) return
        // TODO 提交表单
        uploadSequenceByFile(this.path).then((response) => {
          if (response.code === 200) {
            this.msgSuccess(response.msg)
            this.open = false
            this.getList()
          } else {
            this.msgError(response.msg)
          }
        })
      })
    },
    resetUploadForm() {
      this.$refs['uploadForm'].resetFields()
      this.uploadFilefileList = []
    },
    uploadActionSuccess(response, file, fileList) {
      // 文件上传成功后的处理逻辑
      this.path.path = response.data.path
      console.log(this.path)
    },
    uploadFileBeforeUpload(file) {
      console.log(file)
      return true
      // const isRightSize = file.size / 1024 / 1024 < 2
      // if (!isRightSize) {
      //   this.$message.error('文件大小超过 2MB')
      // }
      // const isAccept = new RegExp('.fasta').test(file.type)
      // if (!isAccept) {
      //   this.$message.error('应该选择.fasta类型的文件')
      // }
      // return isRightSize && isAccept
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addSequence(this.form).then((response) => {
            if (response.code === 200) {
              this.msgSuccess(response.msg)
              this.open = false
              this.getList()
            } else {
              this.msgError(response.msg)
            }
          })
        }
      })
    }
  }
}
</script>
