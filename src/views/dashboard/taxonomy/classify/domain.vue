/** * @FileDesc: 物种分类显示 * @Author: * @Func:
能够显示对应的水生/浮游/底栖等页面 * @Components: */
<template>
  <BasicLayout>
    <template #wrapper>
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
              :data="classList"
              border
              @selection-change="handleSelectionChange"
              @sort-change="handleSortChang"
            >
              <el-table-column type="selection" width="80" align="center" />
              <el-table-column
                label="编号"
                width="80"
                prop="id"
                sortable="custom"
              />
              <el-table-column
                label="界"
                width="100"
                prop="kingdom"
                sortable="custom"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                label="门"
                width="100"
                prop="phylum"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                label="纲"
                width="100"
                prop="class"
                :show-overflow-tooltip="true"
              />
              <el-table-column label="目" width="120" prop="order" />
              <el-table-column
                label="科"
                width="100"
                prop="family"
                sortable="custom"
              />
              <el-table-column
                label="属"
                prop="genus"
                sortable="custom"
                width="100"
              >
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.createdAt) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="160"
                fix="right"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <el-button
                    v-permisaction="['admin:sysUser:edit']"
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleUpdate(scope.row)"
                  >修改</el-button>
                  <el-button
                    v-if="scope.row.userId !== 1"
                    v-permisaction="['admin:sysUser:remove']"
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                  >删除</el-button>
                  <el-button
                    v-permisaction="['admin:sysUser:resetPassword']"
                    size="mini"
                    type="text"
                    icon="el-icon-key"
                    @click="handleResetPwd(scope.row)"
                  >重置</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryParams.pageIndex"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            /> -->
            <!-- <el-row :gutter="20" class="mb8">
              <el-col v-for="(card, index) in cards" :key="index" :span="5">
                <SpeciesClassif
                  :titlename_cn="card.titlename"
                  :button-titles="card.buttonTitles"
                  :img-url="card.imgUrl"
                  :page-url="card.pageUrl"
                />
              </el-col>
            </el-row> -->
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

export default {
  name: 'ClassManage',
  components: {
    // SpeciesClassif,
    // Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 物种分类列表
      classList: [
        {
          id: '1',
          kingdom: '王小',
          phylum: '123',
          class: '123456',
          order: '523',
          family: '上海市普陀区金沙江路 1518 弄',
          genus: '上海市普陀区金沙江路 1518 弄',
          species: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      // 分类名称
      deptspeciesClassificationName: undefined,
      cards: [
        // { titlename: '新建分类数据集', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/dashboard/taxonomy/classify/index' },
        {
          titlename: '裸藻门',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['进入'],
          pageUrl: '/database/search_ncbi'
        },
        {
          titlename: '蓝藻门',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['进入'],
          pageUrl: '/profile/index'
        },
        {
          titlename: '绿藻门',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['进入'],
          pageUrl: '/profile/index'
        },
        {
          titlename: '硅藻门',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['进入'],
          pageUrl: '/profile/index'
        },
        {
          titlename: '甲藻门',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['进入'],
          pageUrl: '/profile/index'
        }
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
  },
  methods: {
    /** 查询物种下拉树结构 */
    getTreeselect() {
      // treeselect().then((response) => {
      //   this.deptOptions = response.data
      // })
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
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
    open() {
      this.$alert('数据库搜索使用NCBI或者北京本地数据库', '使用帮助', {
        confirmButtonText: '确定',
        callback: (action) => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    getTotalDomain() {
      // 获取总的分类
      getDomainList().then((response) => {
        console.log(response.data)
        this.classTreeListData = response.data.data
        // 将json tree 格式数据展开为列表格式
        this.classList = this.treeToList(this.classTreeListData)
      })
    },
    treeToList(data) {
      // todo 将 json tree 格式数据展开为列表格式，遍历data获取所有没有children的数据
      var temp = []
      var forFn = function(data) {
        for (var i = 0; i < data.length; i++) {
          var obj = {}
          obj.id = data[i].id
          obj.kingdom = data[i].label
          obj.phylum = data[i].label
          obj.class = data[i].label
          obj.order = data[i].label
          obj.family = data[i].label
          obj.genus = data[i].label
          obj.species = data[i].label
          temp.push(obj)
          if (data[i].children) {
            forFn(data[i].children)
          }
        }
      }
      forFn(data)
      return temp
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
