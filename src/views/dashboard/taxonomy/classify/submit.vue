/**
 * @FileDesc: 所有物种分类数据提交页面
 * @Author:
 * @Func: 能够提交数据
 * @Components:
 */
<template>
  <div>
    <el-steps :active="currentStep" simple>
      <el-step title="基础信息" icon="el-icon-edit" />
      <el-step title="分布信息" icon="el-icon-upload" />
      <el-step title="提交确认" icon="el-icon-picture" />
    </el-steps>

    <!-- 基础信息 -->
    <el-form v-if="currentStep === 1" ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="中文名">
            <el-col :span="17">
              <el-input v-model="form.name" placeholder="请输入中文名" />
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="学名">
            <el-col :span="17">
              <el-input v-model="form.name" placeholder="请输入拉丁文名" />
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="分类">
            <el-col :span="17">
              <el-select v-model="selectedCategory" placeholder="请选择分类">
                <el-option v-for="category in categories" :key="category.value" :label="category.label" :value="category.value" />
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="所属单元">
            <el-select v-model="selectedDatabase" placeholder="请选择所属单元">
              <el-option v-for="category in Class_name" :key="category.value" :label="category.label" :value="category.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="数据库">
        <el-radio-group v-model="form.resource">
          <el-radio label="NCBI数据库" />
          <el-radio label="北京数据库" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="currentStep === 2" ref="form" :model="formData2" label-width="100px">
      <!-- el-form 的表单项 -->
      <!-- 物种信息的表单项 -->
      <el-row>
        <el-col :span="2.5">
          <el-form-item label="接受的学名">
            <el-input v-model="formData2.acceptedScientificName" />
          </el-form-item>
        </el-col>
        <el-col :span="2.5">
          <el-form-item label="中文名">
            <el-input v-model="formData2.chineseName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2.5">
          <el-form-item label="异名">
            <el-input v-model="formData2.synonym" />
          </el-form-item>
        </el-col>
        <el-col :span="2.5">
          <el-form-item label="别名">
            <el-input v-model="formData2.alias" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="分类系统">
        <el-col :span="2.5">
          <el-input v-model="formData2.taxonomy" />
        </el-col>

      </el-form-item>
      <el-form-item label="分布地">
        <el-col :span="2.5">
          <el-row class="demo-autocomplete">
            <el-col :span="24">
              <div class="sub-title" />
              <el-autocomplete
                v-model="state1"
                class="inline-input"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-form-item>
      <el-form-item label="分布地(中文)">
        <el-col :span="2.5">
          <el-input v-model="formData2.chineseDistribution" />
        </el-col>
      </el-form-item>
      <el-form-item label="科技资源标识">
        <el-col :span="2.5">
          <el-input v-model="formData2.resourceIdentifier" />
        </el-col>
      </el-form-item>
      <el-form-item label="源数据库">
        <el-col :span="7">
          <el-input v-model="formData2.sourceDatabase" />
        </el-col>
      </el-form-item>
      <!-- 其他表单项 -->
      <!-- 提交按钮 -->
      <el-row>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="PreviousStep">上一步</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="nextStep">下一步</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 其他步骤的内容 -->

    <!-- 在这里可以放置其他步骤的内容，例如上传组件、图片选择器等 -->
    <!-- 步骤3的内容（el-form） -->
    <el-form v-if="currentStep === 3" ref="form3" :model="formData3" label-width="150px">
      <!-- 物种信息的表单项 -->
      <el-form-item label="接受的学名">
        <el-input v-model="formData3.acceptedScientificName" disabled />
      </el-form-item>
      <el-form-item label="科技资源标识">
        <el-input v-model="formData3.resourceIdentifier" disabled />
      </el-form-item>
      <el-form-item label="中文名">
        <el-input v-model="formData3.chineseName" disabled />
      </el-form-item>
      <el-form-item label="异名">
        <el-input v-model="formData3.synonym" disabled />
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="formData3.alias" disabled />
      </el-form-item>
      <el-form-item label="分类系统">
        <el-input v-model="formData3.taxonomy" disabled />
      </el-form-item>
      <el-form-item label="分布地">
        <el-input v-model="formData3.distribution" disabled />
      </el-form-item>
      <el-form-item label="分布地(中文)">
        <el-input v-model="formData3.chineseDistribution" disabled />
      </el-form-item>
      <el-form-item label="源数据库">
        <el-input v-model="formData3.sourceDatabase" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="PreviousStep">取消</el-button>
        <!-- 这里取消按钮需要返回上一个页面 -->
      </el-form-item>
    </el-form></div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1, // 当前步骤
      selectedCategory: '', // 选中的分类
      selectedDatabase: '', // 选中的数据库
      Class_name: [ // 分类选项
        { label: '半翅目-Hemiptera', value: '1' },
        { label: '颤蚓目-Tubificida', value: '2' },
        { label: '等足目-Isopoda', value: '3' }
      ],
      categories: [ // 分类选项
        { label: '浮游动物', value: '浮游动物' },
        { label: '浮游植物', value: '浮游植物' },
        { label: '底栖动物', value: '底栖动物' },
        { label: '水生植物', value: '水生植物' },
        { label: '鱼类', value: '鱼类' }
        // 可以根据需要添加更多的分类
      ],
      restaurants: [],
      state1: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formData2: {
        acceptedScientificName: '',
        resourceIdentifier: '',
        chineseName: '',
        synonym: '',
        alias: '',
        taxonomy: '',
        distribution: '',
        chineseDistribution: '',
        sourceDatabase: ''
        // 其他表单项的数据
      },
      formData3: {
        acceptedScientificName: 'Gyptis capensis (Day, 1963)',
        resourceIdentifier: 'CSTR:30689.11.colcn2022.1.754d0149-7858-4b46-8cef-bf30cabf0b3a',
        chineseName: '南非英虫 (nán fēi yīng chóng)',
        synonym: '-',
        alias: '-',
        taxonomy: '界  Animalia -  动物界  ( dòng wù jiè )\n门  Annelida -  环节动物门  ( huán jié dòng wù mén )\n纲  Polychaeta -  多毛纲  ( duō máo gāng )\n目  Nereidida -  沙蚕目  ( shā cán mù )\n科  Hesionidae -  海女虫科  ( hǎi nǚ chóng kē )\n属  Gyptis -  英虫属  ( yīng chóng shǔ )',
        distribution: 'Shandong',
        chineseDistribution: '山东省',
        sourceDatabase: 'Checklist of Marine Biota of China Seas , 2020'
        // 其他表单项
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    nextStep() {
      // 这里可以添加表单验证逻辑，如果表单验证通过，则可以进入下一步
      // 在这个示例中，我们直接切换到下一步
      this.currentStep += 1
    },
    PreviousStep() {
      // 这里可以添加表单验证逻辑，如果表单验证通过，则可以进入下一步
      // 在这个示例中，我们直接切换到下一步
      this.currentStep -= 1
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    onSubmit() {
      this.$confirm('此操作将提交物种分类信息, 是否继续?', '立即创建', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        // 关闭当前页
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消创建'
        })
      })
    },
    handleSelect(item) {
      console.log(item)
    },
    loadAll() {
      return [{
        'value': '北京市',
        'id': '110000000000'
      }, {
        'value': '天津市',
        'id': '120000000000'
      }, {
        'value': '河北省',
        'id': '130000000000'
      }, {
        'value': '山西省',
        'id': '140000000000'
      }, {
        'value': '内蒙古自治区',
        'id': '150000000000'
      }, {
        'value': '辽宁省',
        'id': '210000000000'
      }, {
        'value': '吉林省',
        'id': '220000000000'
      }, {
        'value': '黑龙江省',
        'id': '230000000000'
      }, {
        'value': '上海市',
        'id': '310000000000'
      }, {
        'value': '江苏省',
        'id': '320000000000'
      }, {
        'value': '浙江省',
        'id': '330000000000'
      }, {
        'value': '安徽省',
        'id': '340000000000'
      }, {
        'value': '福建省',
        'id': '350000000000'
      }, {
        'value': '江西省',
        'id': '360000000000'
      }, {
        'value': '山东省',
        'id': '370000000000'
      }, {
        'value': '河南省',
        'id': '410000000000'
      }, {
        'value': '湖北省',
        'id': '420000000000'
      }, {
        'value': '湖南省',
        'id': '430000000000'
      }, {
        'value': '广东省',
        'id': '440000000000'
      }, {
        'value': '广西壮族自治区',
        'id': '450000000000'
      }, {
        'value': '海南省',
        'id': '460000000000'
      }, {
        'value': '重庆市',
        'id': '500000000000'
      }, {
        'value': '四川省',
        'id': '510000000000'
      }, {
        'value': '贵州省',
        'id': '520000000000'
      }, {
        'value': '云南省',
        'id': '530000000000'
      }, {
        'value': '西藏自治区',
        'id': '540000000000'
      }, {
        'value': '陕西省',
        'id': '610000000000'
      }, {
        'value': '甘肃省',
        'id': '620000000000'
      }, {
        'value': '青海省',
        'id': '630000000000'
      }, {
        'value': '宁夏回族自治区',
        'id': '640000000000'
      }, {
        'value': '新疆维吾尔自治区',
        'id': '650000000000'
      }]
    }
  }
}
</script>

