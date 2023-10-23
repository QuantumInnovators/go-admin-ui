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
                :data="data"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                default-expand-all
                @node-click="handleNodeClick"
              />
            </div>
          </el-col>

          <el-col :span="20" :xs="24">
            <el-row :gutter="20" class="mb8">
              <el-col v-for="(card, index) in cards" :key="index" :span="5">
                <SpeciesClassif
                  :titlename_cn="card.titlename"
                  :button-titles="card.buttonTitles"
                  :img-url="card.imgUrl"
                  :page-url="card.pageUrl"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import SpeciesClassif from '../components/SpeciesClassif.vue'
import { getDomainList } from '@/api/dashboard/database'

export default {
  name: 'ClassManage',
  components: {
    SpeciesClassif
  },
  data() {
    return {
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
      data: [
        {
          label: '裸藻门',
          children: [
            {
              label: '裸藻纲',
              children: [
                {
                  label: '裸藻目'
                }
              ]
            }
          ]
        },
        {
          label: '蓝藻门',
          children: [
            {
              label: '藻殖段纲',
              children: [
                {
                  label: '颤藻目'
                }
              ]
            },
            {
              label: '羽纹纲',
              children: [
                {
                  label: '无壳缝目'
                }
              ]
            }
          ]
        },
        {
          label: '绿藻门',
          children: [
            {
              label: '绿藻纲',
              children: [
                {
                  label: '鼓藻目'
                }
              ]
            },
            {
              label: '中心纲',
              children: [
                {
                  label: '圆筛藻目'
                }
              ]
            }
          ]
        }
      ],
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
        // todo this.data = response.data
      })
    }
  }
}
</script>

<style>
.document_card {
  width: 150px;
  height: 195px;
  max-height: 260px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
<!-- .card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 30px;
  background-color: #f5f7fa; /* Element UI 默认的背景色 */
  border: 1px solid #dcdfe6; /* Element UI 默认的边框颜色 */
  border-radius: 4px; /* 圆角边框 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 阴影效果，符合 Element UI 风格 */
}
-- > .card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 30px;
  background-color: #f5f7fa; /* Element UI 默认的背景色 */
  border: 1px solid #dcdfe6; /* Element UI 默认的边框颜色 */
  border-radius: 4px; /* 圆角边框 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 阴影效果，符合 Element UI 风格 */
}

.cardImage {
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
}

.col {
  margin-right: 1%;
  float: left;
  background-color: #fff;
  overflow: hidden;
}
.four_col {
  width: 20%;
}

.gray-light {
  opacity: 0.3;
}

.title-bar {
  background-color: rgba(29, 0, 252, 0.534);
  height: 100px;
  width: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.ui-widget-header {
  border: 1px solid #aaa;
  background: #ccc 50% 50% repeat-x;
  color: #222;
  font-weight: 700;
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
.el-row {
  margin-bottom: 20px;
}

.el-col {
  display: flex;
  align-items: center;
}

.el-button {
  margin-left: 10px;
}

.tree-container {
  width: 200px; /* 树型控件容器宽度 */
  position: fixed;
  left: 0;
  top: 0;
  height: 100%; /* 树型控件容器高度，可以根据需要调整 */
  background-color: #f0f0f0; /* 树型控件容器背景色 */
  padding: 20px;
  overflow-y: auto; /* 如果内容超出高度，显示滚动条 */
}
</style>
