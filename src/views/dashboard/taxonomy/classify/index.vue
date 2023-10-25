/**
 * @FileDesc: 物种分类新增
 * @Author:
 * @Func: 新增分类数据集
 * @Components:
 */
<template>
  <div>
    <el-row :span="24">
      <el-col :span="24">
        <div class="card-container">
          <el-row v-for="(card, index) in cards" :key="index">
            <el-col :span="20">
              <SpeciesClassif :titlename_cn="card.titlename" :button-titles="card.buttonTitles" :img-url="card.imgUrl" :page-url="card.pageUrl" />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-col :span="24">
      <div class="card-container">
        <el-row v-for="(card, index) in cards_2" :key="index">
          <el-col :span="20">
            <SpeciesClassif :titlename_cn="card.titlename" :description="card.description" :button-titles="card.buttonTitles" :img-url="card.imgUrl" :page-url="card.pageUrl" />
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>

<script>
import SpeciesClassif from '../components/SpeciesClassif.vue'

export default {
  components: {
    SpeciesClassif
  },
  data() {
    return {
      cards: [
        { titlename: '新建分类数据集', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/dashboard/taxonomy/classify/submit' },
        { titlename: '浮游动物', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/database/search_ncbi' },
        { titlename: '浮游植物', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/profile/index' }
        // ... 其他卡片的属性
      ],
      cards_2: [
        { titlename: '底栖动物', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/profile/index' },
        { titlename: '水生植物', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/profile/index' },
        { titlename: '鱼类', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/profile/index' }
        // ... 其他卡片的属性
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
