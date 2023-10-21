/**
 * @FileDesc: 物种分类首页
 * @Author:
 * @Func: 能够访问对应的水生/浮游/底栖等页面，同时能够新增分类数据集
 * @Components:SpeciesClassif
 */
<template>
  <div>
    <div>
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="item in 5" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :span="24">
      <el-col :span="24">
        <div class="card-container">
          <el-row v-for="(card, index) in cards" :key="index">
            <el-col>
              <SpeciesClassif :titlename_cn="card.titlename" :button-titles="card.buttonTitles" :img-url="card.imgUrl" :page-url="card.pageUrl" />
            </el-col>
          </el-row>
          <el-row v-for="(card, index) in cards_2" :key="index">
            <el-col>
              <SpeciesClassif :titlename_cn="card.titlename" :description="card.description" :button-titles="card.buttonTitles" :img-url="card.imgUrl" :page-url="card.pageUrl" />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SpeciesClassif from './components/SpeciesClassif.vue'

export default {
  components: {
    SpeciesClassif
  },
  data() {
    return {
      cards: [
        { titlename: '新建分类数据集', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/dashboard/taxonomy/classify/index' },
        { titlename: '浮游动物', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['分类树', '进化树'], pageUrl: '/dashboard/taxonomy/classify/domain' },
        { titlename: '浮游植物', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['分类树', '进化树'], pageUrl: '/dashboard/taxonomy/classify/domain' }
      ],
      cards_2: [
        { titlename: '底栖动物', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['分类树', '进化树'], pageUrl: '/dashboard/taxonomy/classify/domain' },
        { titlename: '水生植物', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['分类树', '进化树'], pageUrl: '/dashboard/taxonomy/classify/domain' },
        { titlename: '鱼类', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['分类树', '进化树'], pageUrl: '/dashboard/taxonomy/classify/domain' }
      ],
      selectedOption: 'all',
      searchText: ''
    }
  },
  methods: {
    search() {
    },
    open() {
      this.$alert('数据库搜索使用NCBI或者北京本地数据库', '使用帮助', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
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
  padding: 30px;
  background-color: #f5f7fa; /* Element UI 默认的背景色 */
  border: 1px solid #dcdfe6; /* Element UI 默认的边框颜色 */
  border-radius: 4px; /* 圆角边框 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 阴影效果，符合 Element UI 风格 */
}
</style>
