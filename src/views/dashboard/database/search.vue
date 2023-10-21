/**
 * @FileDesc: 所有数据库浏览 根据搜索结果进行数据库数据展示
 * @Author:
 * @Func: 能够浏览展示数据
 * @Components:
 */
<template>
  <div>
    <el-row>
      <el-col :span="200">
        <div class="title-bar">
          <el-col span="24" offset="10">
            <h1 class="title">DNA数据库系统</h1>
          </el-col>
          <el-col span="2" offset="2">
            <el-button class=".header-button" type="" @click="open">使用帮助</el-button>
          </el-col>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <div class=".ui-widget-header ">
        <el-col :span="3">
          <el-select v-model="selectedOption" placeholder="请选择数据库">
            <el-option label="所有数据库" value="all" />
            <el-option label="北京数据库" value="beijing" />
            <el-option label="NCBI数据库" value="ncbi" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="searchText" placeholder="请输入关键词" />
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </div>
    </el-row>
    <el-row :span="20">
      <el-col :span="10">
        <div class="card-container">
          <CustomCard v-for="(card, index) in cards" :key="index" :titlename="card.titlename" :description="card.description" :button-title="card.buttonTitle" :img-url="card.imgUrl" :page-url="card.pageUrl" />
        </div>
      </el-col>
    </el-row>
    <el-col :span="12">
      <div class="card-container">
        <CustomCard v-for="(card, index) in cards_2" :key="index" :titlename="card.titlename" :description="card.description" :button-title="card.buttonTitle" :img-url="card.imgUrl" :page-url="card.pageUrl" />
      </div>
    </el-col>

    <el-row>
      <el-col :span="200">
        <div class="title-bar">
          <el-col span="24" offset="10" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CustomCard from './components/CustomCard.vue'

export default {
  components: {
    CustomCard
  },
  data() {
    return {
      cards_ncbi: [
        { titlename: 'NCBI数据库', description: 'Deposit data or manuscripts into NCBI databases', imgUrl: require('@/assets/logo/logo.png'), pageUrl: '/database/index' }
        // ... 其他卡片的属性
      ],
      cards_beijin: [
        { titlename: '北京数据库', description: 'Deposit data or manuscripts into NCBI databases', imgUrl: require('@/assets/logo/logo.png'), pageUrl: '/profile/index' }
        // ... 其他卡片的属性
      ],
      selectedOption: 'all',
      searchText: ''
    }
  },
  methods: {
    search() {
      // 处理搜索功能，根据选项和输入内容执行相应的搜索逻辑
      console.log('执行搜索：选项 -', this.selectedOption, '关键词 -', this.searchText)
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
} -->
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
    opacity: .3;
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
    font-weight: 700
}
.header-button {
    width: auto;
    margin: 1.0rem 0.3rem;
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
</style>
