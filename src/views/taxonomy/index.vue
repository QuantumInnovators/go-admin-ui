/** * @FileDesc: 物种分类首页 * @Author: * @Func:
能够访问对应的水生/浮游/底栖等页面，同时能够新增分类数据集 *
@Components:SpeciesClassif */
<template>
  <div>
    <div>
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="(species, index) in speciesList" :key="index">
          <h3 class="species-name">{{ species.name }}</h3>
          <img :src="species.image" class="carousel-image" alt="Species">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="card-container">
      <el-row v-for="(card, index) in cards" :key="index">
        <el-col :span="4">
          <SpeciesClassif
            :titlename_cn="card.titlename"
            :button-titles="card.buttonTitles"
            :img-url="card.imgUrl"
            :page-url="card.pageUrl"
          />
        </el-col>
      </el-row>
      <el-row v-for="(card, index) in cards_2" :key="index">
        <el-col :span="4">
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
          pageUrl: '/taxonomy/classify/submit'
        },
        {
          titlename: '浮游动物',
          imgUrl: require('@/assets/imgs/1.jpg'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/taxonomy/classify/domain'
        },
        {
          titlename: '浮游植物',
          imgUrl: require('@/assets/imgs/2.jpg'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/taxonomy/classify/domain'
        }
      ],
      cards_2: [
        {
          titlename: '底栖动物',
          imgUrl: require('@/assets/imgs/3.jpg'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/taxonomy/classify/domain'
        },
        {
          titlename: '水生植物',
          imgUrl: require('@/assets/imgs/4.jpg'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/taxonomy/classify/domain'
        },
        {
          titlename: '鱼类',
          imgUrl: require('@/assets/imgs/5.jpg'),
          buttonTitles: ['分类树', '进化树'],
          pageUrl: '/taxonomy/classify/domain'
        }
      ],
      speciesList: [
        { name: '底栖动物', image: require('@/assets/imgs/1.jpg') },
        { name: '浮游动物', image: require('@/assets/imgs/2.jpg') },
        { name: '浮游植物', image: require('@/assets/imgs/3.jpg') },
        { name: '水生植物', image: require('@/assets/imgs/4.jpg') },
        { name: '鱼类', image: require('@/assets/imgs/5.jpg') }
        // Add more species with their respective image paths
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
      getCategoryList(queryParams).then((response) => {
        console.log(response.data)
        // todo card 赋值渲染
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
.species-name {
  text-align: center;
  /* margin-top: 10px; */
}
</style>
