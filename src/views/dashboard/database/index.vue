/**
 * @FileDesc: 数据库主页，能够跳转到指定页面进行数据库操作
 * @Author:
 * @Func: 能够搜索数据库 和访问其他页面
 * @Components:
 */
<template>
  <BasicLayout>
    <template #wrapper>
      <div class="box-card">
        <el-row :gutter="20">
          <div>
            <el-col :span="2" :offset="0">
              <el-select v-model="selectedOption" placeholder="请选择数据库">
                <el-option label="所有数据库" value="all" />
                <el-option label="北京数据库" value="beijing" />
                <el-option label="NCBI数据库" value="ncbi" />
              </el-select>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-input v-model="searchText" placeholder="请输入关键词" />
            </el-col>
            <el-col :span="3" :offset="0">
              <el-button type="primary" @click="search">搜索</el-button>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <div class="twelve_col last">
            <h1>欢迎使用 环境DNA数据库管理系统</h1>
            <p>The National Center for Biotechnology Information
              advances science and health by providing access to
              biomedical and genomic information.</p>
            <el-row>
              <ul class="about_links">
                <li><a href="/about/">About the NCBI</a> </li>
              </ul>
            </el-row>
          </div>
        </el-row>
        <el-col :span="14">
          <el-row :gutter="5">
            <el-col v-for="(card, index) in cards" :key="index" :span="8">
              <CustomCard :titlename="card.titlename" :description="card.description" :button-title="card.buttonTitle" :img-url="card.imgUrl" :page-url="card.pageUrl" />
            </el-col>
          </el-row>
        </el-col>
      </div>
    </template>
  </BasicLayout>
</template>

<script>
import CustomCard from './components/CustomCard.vue'

export default {
  components: {
    CustomCard
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      cards: [
        { titlename: 'NCBI数据库', description: 'NCBI databases', imgUrl: require('@/assets/logo/logo.png'), pageUrl: '/database/search_ncbi' },
        { titlename: '北京数据库', description: '北京本地数据库', imgUrl: require('@/assets/logo/logo.png'), pageUrl: '/database/search_ncbi' },
        { titlename: '物种分类  ', description: '数据库物种信息分类', imgUrl: require('@/assets/logo/logo.png'), pageUrl: '/dashboard/taxonomy/index' },
        { titlename: '上传', description: '数据库上传', imgUrl: require('@/assets/logo/logo.png'), pageUrl: '/dashboard/database/update' },
        { titlename: '管理', description: '数据库系统管理', imgUrl: require('@/assets/logo/logo.png'), pageUrl: '/analysis/analysis_overview' },
        { titlename: 'DNA分析', description: '根据项目进行DNA分析', imgUrl: require('@/assets/logo/logo.png'), pageUrl: '/analysis/analysis_overview' }
      ],
      selectedOption: 'all',
      searchText: ''
    }
  },
  methods: {
    search() {
      // 处理搜索功能，根据选项和输入内容执行相应的搜索逻辑
      console.log('执行搜索：选项 -', this.selectedOption, '关键词 -', this.searchText)
      //
      this.$router.push('/database/search_ncbi')
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
.bg-purple-dark {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ncbi-header {
  background-color: #20558a;
  z-index: 10;
  padding: 14px 0 10px 0;
  display: block;
  font-family: "Roboto", "Helvetica Neue", Arial, Tahoma;
}
.about_links {
  padding: 0;
  margin: 1em 0 1em 1em
}
</style>
