/** * @FileDesc: 物种分类首页 * @Author: * @Func:
能够访问对应的水生/浮游/底栖等页面，同时能够新增分类数据集 *
@Components:SpeciesClassif */

<template>
  <div>
    <!-- 导航卡片 -->
    <div v-if="activeTab">当前页签位置: {{ activeTab }}</div>
    <div class="card-container">
      <el-breadcrumb separator-class="el-icon-arrow-left">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: '/dashboard/taxonomy/index' }"
        >物种分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 5" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :span="20">
      <el-col :span="500">
        <div class="card-container">
          <el-row v-for="(card, index) in cards" :key="index">
            <el-col :span="20">
              <SpeciesClassif
                :titlename_cn="card.titlename"
                :button-titles="card.buttonTitles"
                :img-url="card.imgUrl"
                :page-url="card.pageUrl"
              />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-col :span="12">
      <div class="card-container">
        <el-row v-for="(card, index) in cards_2" :key="index">
          <el-col :span="20">
            <SpeciesClassif
              :titlename_cn="card.titlename"
              :description="card.description"
              :button-titles="card.buttonTitles"
              :img-url="card.imgUrl"
              :page-url="card.pageUrl"
            />
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>

<script>
import SpeciesClassif from './components/SpeciesClassif.vue'
import { getCategoryList } from '@/api/dashboard/database'

export default {
  components: {
    SpeciesClassif
  },
  data() {
    return {
      cards: [
        {
          titlename: '新建分类数据集',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['进入'],
          pageUrl: '/dashboard/taxonomy/classify/index'
        },
        {
          titlename: '浮游动物',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/dashboard/taxonomy/classify/domain'
        },
        {
          titlename: '浮游植物',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/dashboard/taxonomy/classify/domain'
        }
        // ... 其他卡片的属性
      ],
      cards_2: [
        {
          titlename: '底栖动物',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/dashboard/taxonomy/classify/domain'
        },
        {
          titlename: '水生植物',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/dashboard/taxonomy/classify/domain'
        },
        {
          titlename: '鱼类',
          imgUrl: require('@/assets/logo/logo.png'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/dashboard/taxonomy/classify/domain'
        }
        // ... 其他卡片的属性
      ],
      selectedOption: 'all',
      searchText: ''
    }
  },
  created() {
    this.categoryList()
  },
  methods: {
    search() {},
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
    categoryList() {
      var queryParams = {
        pageIndex: 1,
        pageSize: 10
      }
      console.log('===========' + queryParams)
      getCategoryList(queryParams).then((response) => {
        console.log(response.data)
        // todo card 赋值渲染
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
