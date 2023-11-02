/** * @FileDesc: 物种分类显示 * @Author: * @Func:
能够显示对应的水生/浮游/底栖等页面 * @Components: */
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-row>
            <el-form-item
              label="类别"
              prop="categoryName"
            ><el-input
              v-model="queryParams.categoryName"
              placeholder="请输入类别"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
            </el-form-item>

            <el-form-item
              label="界"
              prop="kingdomName"
            ><el-input
              v-model="queryParams.kingdomName"
              placeholder="请输入界"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
            </el-form-item>
            <el-form-item
              label="门"
              prop="phylumName"
            ><el-input
              v-model="queryParams.phylumName"
              placeholder="请输入门"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
            </el-form-item>
            <el-form-item
              label="纲"
              prop="className"
            ><el-input
              v-model="queryParams.className"
              placeholder="请输入纲"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
            </el-form-item>
          </el-row>

          <el-form-item
            label="目"
            prop="orderName"
          ><el-input
            v-model="queryParams.orderName"
            placeholder="请输入目"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item
            label="科"
            prop="familyName"
          ><el-input
            v-model="queryParams.familyName"
            placeholder="请输入科"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item
            label="属"
            prop="genusName"
          ><el-input
            v-model="queryParams.genusName"
            placeholder="请输入属"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item
            label="种"
            prop="speciesName"
          ><el-input
            v-model="queryParams.speciesName"
            placeholder="请输入种"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>

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
            <el-button
              v-permisaction="['sequence:meta:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-form-item>
        </el-form>
        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="metaList" :model="metaList" :rules="rules" label-width="80px">
            <el-form-item label="类别" prop="categoryName">
              <el-select v-model="metaList.categoryName" placeholder="请选择">
                <el-option
                  v-for="dict in metaList.categoryName"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="界" prop="kingdomName">
              <el-select v-model="metaList.kingdomName" placeholder="请选择">
                <el-option
                  v-for="dict in metaList.kingdomName"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="门" prop="phylumName">
              <el-select v-model="metaList.phylumName" placeholder="请选择">
                <el-option
                  v-for="dict in metaList.phylumName"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="纲" prop="className">
              <el-select v-model="metaList.className" placeholder="请选择">
                <el-option
                  v-for="dict in metaList.className"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="目" prop="orderName">
              <el-select v-model="metaList.orderName" placeholder="请选择">
                <el-option
                  v-for="dict in metaList.orderName"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="科" prop="familyName">
              <el-select v-model="metaList.familyName" placeholder="请选择">
                <el-option
                  v-for="dict in metaList.familyName"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="属" prop="genusName">
              <el-select v-model="metaList.genusName" placeholder="请选择">
                <el-option
                  v-for="dict in metaList.genusName"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="种" prop="speciesName">
              <el-select v-model="metaList.speciesName" placeholder="请选择">
                <el-option
                  v-for="dict in metaList.speciesName"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="4" :xs="24">
            <div class="head-container">
              <el-input
                v-model="deptspeciesClassificationName"
                placeholder="请输入物种名称"
                clearable
                size="small"
                prefix-icon="el-icon-search"
                style="margin-bottom: 20px"
              />
            </div>
            <div class="head-container">
              <el-tree
                ref="tree"
                :data="classTreeListData"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                default-expand-all
                @node-click="handleNodeClick"
              />
            </div>
          </el-col>

          <el-col :span="20" :xs="24">
            <el-table
              v-loading="loading"
              :data="metaList"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              /><el-table-column
                label="类别"
                align="center"
                prop="categoryName"
                :show-overflow-tooltip="true"
              /><el-table-column
                label="界"
                align="center"
                prop="kingdomName"
                :show-overflow-tooltip="true"
              /><el-table-column
                label="门"
                align="center"
                prop="phylumName"
                :show-overflow-tooltip="true"
              /><el-table-column
                label="纲"
                align="center"
                prop="className"
                :show-overflow-tooltip="true"
              /><el-table-column
                label="目"
                align="center"
                prop="orderName"
                :show-overflow-tooltip="true"
              /><el-table-column
                label="科"
                align="center"
                prop="familyName"
                :show-overflow-tooltip="true"
              /><el-table-column
                label="属"
                align="center"
                prop="genusName"
                :show-overflow-tooltip="true"
              /><el-table-column
                label="种"
                align="center"
                prop="speciesName"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                label="操作"
                align="center"
                class-name="small-padding fixed-width"
              >
                <template>
                  <el-button
                    v-permisaction="['sequence:meta:edit']"
                    type="text"
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleUpdate"
                  >修改
                  </el-button>
                  <el-button
                    v-permisaction="['sequence:meta:remove']"
                    type="text"
                    icon="el-icon-delete"
                    size="mini"
                    :disabled="multiple"
                    @click="handleDelete"
                  >删除
                  </el-button>
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

            <!-- <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryParams.pageIndex"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            /> -->
          </el-col>
        </el-row>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
// import SpeciesClassif from '../components/SpeciesClassif.vue'
// import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getDomainList } from '@/api/dashboard/database'
import {
  addMeta,
  delMeta,
  getMeta,
  listMeta,
  updateMeta
} from '@/api/sequence/meta'

export default {
  name: 'ClassManage',
  components: {
    // SpeciesClassif,
    // Treeselect
  },
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
      metaList: [],
      categoryIdOptions: [],
      kingdomIdOptions: [],
      // 关系表类型
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      },
      // 表单参数
      form: {
        categoryId: undefined,
        categoryName: undefined,
        kingdomId: undefined,
        kingdomName: undefined,
        phylumId: undefined,
        phylumName: undefined,
        classId: undefined,
        className: undefined,
        orderId: undefined,
        orderName: undefined,
        familyId: undefined,
        familyName: undefined,
        genusId: undefined,
        genusName: undefined,
        speciesId: undefined,
        speciesName: undefined
      },
      // 表单校验
      rules: {
        categoryId: [
          { required: true, message: '类别不能为空', trigger: 'blur' }
        ],
        kingdomId: [{ required: true, message: '界不能为空', trigger: 'blur' }],
        phylumId: [{ required: true, message: '门不能为空', trigger: 'blur' }],
        classId: [{ required: true, message: '纲不能为空', trigger: 'blur' }],
        orderId: [{ required: true, message: '目不能为空', trigger: 'blur' }],
        familyId: [{ required: true, message: '科不能为空', trigger: 'blur' }],
        genusId: [{ required: true, message: '属不能为空', trigger: 'blur' }],
        speciesId: [{ required: true, message: '种不能为空', trigger: 'blur' }]
      },
      // 分类名称
      deptspeciesClassificationName: undefined,
      cards: [
      ],
      cards_2: [
        // ... 其他卡片的属性
      ],
      selectedOption: 'all',
      searchText: '',
      classTreeListData: [], // 物种分类树状结构图
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    // 根据名称筛选部门树
    deptspeciesClassificationName(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getTotalDomain()
    this.getList()
  },
  methods: {
    /** 查询物种下拉树结构 */
    getTreeselect() {
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    /** 排序回调函数 */
    handleSortChang(column, prop, order) {
      prop = column.prop
      order = column.order
      if (this.order !== '' && this.order !== prop + 'Order') {
        this.queryParams[this.order] = undefined
      }
      if (order === 'descending') {
        this.queryParams[prop + 'Order'] = 'desc'
        this.order = prop + 'Order'
      } else if (order === 'ascending') {
        this.queryParams[prop + 'Order'] = 'asc'
        this.order = prop + 'Order'
      } else {
        this.queryParams[prop + 'Order'] = undefined
      }
      this.getList()
    },
    search() {},
    handleNodeClick(data) {
      console.log(data)
    },
    getTotalDomain() {
      // 获取总的分类
      getDomainList().then((response) => {
        console.log(response.data)
        this.classTreeListData = response.data.data
      })
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true
      console.log(this.queryParams)
      listMeta(this.queryParams).then(
        (response) => {
          this.metaList = response.data.list
          this.total = response.data.count
          this.loading = false
          console.log(response.data)
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
        categoryId: undefined,
        categoryName: undefined,
        kingdomId: undefined,
        kingdomName: undefined,
        phylumId: undefined,
        phylumName: undefined,
        classId: undefined,
        className: undefined,
        orderId: undefined,
        orderName: undefined,
        familyId: undefined,
        familyName: undefined,
        genusId: undefined,
        genusName: undefined,
        speciesId: undefined,
        speciesName: undefined
      }
      this.resetForm('form')
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
      this.title = '添加分类信息'
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
      getMeta(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改分类信息'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateMeta(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addMeta(this.form).then((response) => {
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
          return delMeta({ ids: Ids })
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
    }
  }
}
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 3px;
  background-color: #f5f7fa; /* Element UI 默认的背景色 */
  border: 1px solid #dcdfe6; /* Element UI 默认的边框颜色 */
  border-radius: 4px; /* 圆角边框 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 阴影效果，符合 Element UI 风格 */
}
</style>
