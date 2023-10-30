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
    <el-col :span="24">
      <div class="card-container">
        <el-row v-for="(card, index) in cards_3" :key="index">
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
        { titlename: '上传分类数据', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/submit' },
        { titlename: '昆虫纲', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/index' },
        { titlename: '软甲纲', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/index' }
        // ... 其他卡片的属性
      ],
      cards_2: [
        { titlename: '双壳纲', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/index' },
        { titlename: '腹足纲', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/index' },
        { titlename: '寡毛纲', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/index' }
        // ... 其他卡片的属性
      ],
      cards_3: [
        { titlename: '双壳纲', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/index' },
        { titlename: '腹足纲', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/index' },
        { titlename: '寡毛纲', imgUrl: require('@/assets/logo/logo.png'), buttonTitles: ['进入'], pageUrl: '/taxonomy/classify/index' }
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
