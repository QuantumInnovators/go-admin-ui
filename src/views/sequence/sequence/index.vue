<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form
          ref="uploadForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <el-form-item label="上传" prop="uploadFile" required>
            <el-upload
              ref="uploadFile"
              :headers="headers"
              :file-list="uploadFilefileList"
              :action="uploadFileAction"
              :before-upload="uploadFileBeforeUpload"
              accept=".fasta"
              name="file"
              :data="uploadParams"
              :on-success="uploadActionSuccess"
            >
              <el-button
                size="small"
                type="primary"
                icon="el-icon-upload"
              >点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="submitUploadForm">提交</el-button>
            <el-button @click="resetUploadForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="分类" prop="classId">
            <el-input
              v-model="queryParams.classId"
              placeholder="分类"
              clearable
              size="mini"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <!-- <el-form-item label="分类" prop="classId">
            <el-select
              v-model="queryParams.classId"
              placeholder="分类"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select> -->
          <!-- </el-form-item> -->
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
            >搜索</el-button>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              @click="resetQuery"
            >重置</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['sequence:sequence:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['sequence:sequence:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['sequence:sequence:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>
        <el-table
          v-loading="loading"
          :data="sequenceList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="名称"
            prop="sequenceId"
            :show-overflow-tooltip="true"
            width="100"
          />
          <el-table-column
            label="描述"
            prop="sequenceDescription"
            :show-overflow-tooltip="true"
            width="300"
          />
          <el-table-column
            label="序列编码"
            sortable="custom"
            prop="sequence"
            :show-overflow-tooltip="true"
            width="600"
          />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要修改吗?"
                confirm-button-text="修改"
                @onConfirm="handleUpdate(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['sequence:sequence:edit']"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @onConfirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['sequence:sequence:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="" prop="sequenceId">
              <el-input v-model="form.sequenceId" placeholder="" />
            </el-form-item>
            <el-form-item label="" prop="sequenceDescription">
              <el-input v-model="form.sequenceDescription" placeholder="" />
            </el-form-item>
            <el-form-item label="" prop="sequence">
              <el-input v-model="form.sequence" placeholder="" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<style>
.el-upload__tip {
  line-height: 1.2;
}
</style>

<script>
import {
  addSequence,
  delSequence,
  getSequence,
  listSequence,
  updateSequence,
  uploadSequence
} from '@/api/sequence/sequence'

import { getToken } from '@/utils/auth'

export default {
  name: 'Sequence',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      sequenceList: [],
      headers: { Authorization: 'Bearer ' + getToken() },

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        classId: ''
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 上传文件
      formData: {
        uploadFile: null
      },
      path: {},
      uploadRules: {},
      uploadFileAction:
        process.env.VUE_APP_BASE_API + '/api/v1/public/uploadFile',
      uploadParams: {
        type: 4
      },
      uploadFilefileList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listSequence(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.sequenceList = response.data.list
          this.total = response.data.count
          this.loading = false
        }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        sequenceId: undefined,
        sequenceDescription: undefined,
        sequence: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    // 关系
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加Sequence'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getSequence(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改Sequence'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateSequence(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
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
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delSequence({ ids: Ids })
        })
        .then((response) => {
          if (response.code === 200) {
            this.msgSuccess(response.msg)
            this.open = false
            this.getList()
          } else {
            this.msgError(response.msg)
          }
        })
        .catch(function() {})
    },
    submitUploadForm() {
      this.$refs['uploadForm'].validate((valid) => {
        // console.log(this.uploadFilefileList)
        // if (!valid) return
        // TODO 提交表单
        uploadSequence(this.path).then((response) => {
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
    }
  }
}
</script>
