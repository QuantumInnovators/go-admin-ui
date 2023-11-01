/** * @FileDesc: 数据库浏览 根据搜索结果进行数据库浏览 * @Author: * @Func:
能够浏览数据 * @Components: */
<template>
  <BasicLayout>
    <template #wrapper>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="NCBI数据库" name="first">
          <el-card class="box-card">
            <el-table
              v-loading="loading"
              :data="sequenceList"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                label="ID"
                prop="sequenceId"
                :show-overflow-tooltip="true"
                width="150"
              />
              <el-table-column
                label="中文名称"
                prop="nameCN"
                :show-overflow-tooltip="true"
                width="120"
              />
              <el-table-column
                label="拉丁文名称"
                prop="name"
                :show-overflow-tooltip="true"
                width="180"
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
                prop=""
                :show-overflow-tooltip="true"
                width="200"
              />
              <el-table-column
                label="类型"
                sortable="custom"
                prop="type"
                :show-overflow-tooltip="true"
                width="180"
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
              @pagination="getListBySearch"
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
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="北京市本地数据库" name="second">
          <el-card class="box-card">
            <el-table
              v-loading="loading"
              :data="sequenceBeijingList"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                label="ID"
                prop="sequenceId"
                :show-overflow-tooltip="true"
                width="150"
              />
              <el-table-column
                label="中文名称"
                prop="nameCN"
                :show-overflow-tooltip="true"
                width="120"
              />
              <el-table-column
                label="拉丁文名称"
                prop="name"
                :show-overflow-tooltip="true"
                width="180"
              />
              <el-table-column
                label="序列编码"
                sortable="custom"
                prop="sequence"
                :show-overflow-tooltip="true"
                width="500"
              />
              <el-table-column
                label="条形码"
                sortable="custom"
                prop=""
                :show-overflow-tooltip="true"
                width="200"
              />
              <el-table-column
                label="引物名称"
                prop="primerName"
                :show-overflow-tooltip="true"
                width="180"
              />
              <el-table-column
                label="类型"
                sortable="custom"
                prop="type"
                :show-overflow-tooltip="true"
                width="150"
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
              @pagination="getListBySearch"
            />
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </template>
  </BasicLayout>
</template>

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
      sequenceBeijingList: [],
      headers: { Authorization: 'Bearer ' + getToken() },
      value: '',
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
      console.log('修改：' + row)
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
        pageIndex: this.queryParams.pageIndex,
        pageSize: this.queryParams.pageSize
      }
      searchList(data).then((response) => {
        var dataList = response.data
        console.log(response)
        for (var i = 0; i < dataList.list.length; i++) {
          console.log(dataList.list[i])
          var list = dataList.list[i]
          switch (list.source) {
            case 1:
              this.sequenceList = list.list
              break
            case 2:
              this.sequenceBeijingList = list.list
          }
        }
        this.total = response.data.count
        this.loading = false
      })
    }
  }
}
</script>
