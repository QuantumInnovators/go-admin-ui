<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-item" @click="navigateToPage1">
        <h3>{{ page1Title }}</h3>
        <p>{{ page1Description }}</p>
        <i class="el-icon-arrow-right" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-item" @click="navigateToPage2">
        <h3>{{ page2Title }}</h3>
        <p>{{ page2Description }}</p>
        <i class="el-icon-arrow-right" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-item" @click="navigateToPage3">
        <h3>{{ page3Title }}</h3>
        <p>{{ page3Description }}</p>
        <i class="el-icon-arrow-right" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      page1Title: '页面1标题',
      page1Description: '页面1描述',
      page2Title: '页面2标题',
      page2Description: '页面2描述',
      page3Title: '页面3标题',
      page3Description: '页面3描述'
    }
  },
  methods: {
    navigateToPage1() {
      // 在这里编写跳转到页面1的逻辑
      console.log('正在跳转到页面1...')
    },
    navigateToPage2() {
      // 在这里编写跳转到页面2的逻辑
      console.log('正在跳转到页面2...')
    },
    navigateToPage3() {
      // 在这里编写跳转到页面3的逻辑
      console.log('正在跳转到页面3...')
    }
  }
}
</script>
