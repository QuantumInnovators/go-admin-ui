/** * @FileDesc: 数据库浏览 根据搜索结果进行数据库浏览 * @Author: * @Func:
能够浏览数据 * @Components: */
<template>
  <BasicLayout>
    <template #wrapper>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="NCBI数据库" name="first">
          <el-card class="box-card">
            <el-row>
              <el-col :span="200">
                <div class="title-bar">
                  <el-col span="24" offset="10">
                    <h1 class="title">DNA数据库系统</h1>
                  </el-col>
                  <el-col span="2" offset="2">
                    <el-button
                      class=".header-button"
                      type=""
                      @click="open"
                    >使用帮助</el-button>
                  </el-col>
                </div>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="10" class="mb8">
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
            </el-row> -->
            <el-form
              ref="queryForm"
              :model="queryParams"
              :inline="true"
              label-width="68px"
            >
              <el-form-item label="" prop="classId">
                <div class="block">
                  <span class="demonstration">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in database_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </span>
                </div>
              </el-form-item>
              <el-input
                v-model="queryParams.classId"
                placeholder="请输入数据:物种中文名/拉丁文/数据库编号"
                clearable
                size="normal"
                style="width: 320px"
                @keyup.enter.native="handleQuery"
              />
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
                  span="3"
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
                <el-button
                  icon="el-icon-download"
                  size="mini"
                  @click="resetQuery"
                >下载</el-button>
              </el-form-item>
            </el-form>

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
                label="条形码"
                sortable="custom"
                prop="sequence"
                :show-overflow-tooltip="true"
                width="300"
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
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="80px"
              >
                <el-form-item label="名称" prop="sequenceId">
                  <el-input
                    v-model="form.sequenceId"
                    placeholder="请输入名称"
                  />
                </el-form-item>
                <el-form-item label="描述" prop="sequenceDescription">
                  <el-input
                    v-model="form.sequenceDescription"
                    placeholder="请输入描述"
                  />
                </el-form-item>
                <el-form-item label="序列编码" prop="sequence">
                  <el-input
                    v-model="form.sequence"
                    placeholder="请输入序列编码"
                  />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
              </div>
            </el-dialog>
            <!-- 尾部 -->
            <el-row>
              <el-col :span="200">
                <div class="title-bar">
                  <el-col span="24" offset="10" />
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="北京市本地数据库" name="second">
          北京市本地数据库
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageIndex"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
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
              label="条形码"
              sortable="custom"
              prop="sequence"
              :show-overflow-tooltip="true"
              width="300"
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
        </el-tab-pane>
      </el-tabs>
    </template>
  </BasicLayout>
</template>

<style>
.el-upload__tip {
  line-height: 1.2;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #0269f9;
}
.bg-purple {
  background: #f40494;
}
.bg-purple-light {
  background: #ff1e38;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #1a65fb;
}
.title-bar {
  background-color: rgba(29, 0, 252, 0.534);
  height: 100px;
  width: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
}
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

import { searchList } from '@/api/dashboard/database'

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
      uploadFilefileList: [],
      activeName: 'first',
      props: { multiple: true },
      database_options: [
        {
          value: 0,
          label: '所有数据库'
        },
        {
          value: 1,
          label: '北京数据库'
        },
        {
          value: 2,
          label: 'NCBI数据库'
        }
      ]
    }
  },
  created() {
    // this.getList()
    this.getListBySearch()
  },
  methods: {
    /***/
    handleClick(tab, event) {
      console.log(tab, event)
    },
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
    },
    getListBySearch() {
      this.loading = true
      var source = 0
      if (this.$route.query.source === 'ncbi') {
        source = 1
      } else if (this.$route.query.source === 'beijing') {
        source = 2
      }
      var data = {
        source: source,
        key: this.$route.query.key,
        pageIndex: 1,
        pageSize: 10
      }
      searchList(data).then((response) => {
        this.sequenceList = response.data.list
        this.total = response.data.count
        this.loading = false
      })
    }
  }
}
</script>
