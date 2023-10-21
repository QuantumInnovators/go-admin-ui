<template>
  <el-button :type="type" icon="icon" @click="handleClick">
    <span>{{ title }}</span>
    <span>{{ description }}</span>
  </el-button>
</template>

<script>
export default {
  props: {
    title: String, // 标题
    description: String, // 描述
    icon: String, // 图标（Element UI的图标名称）
    type: {
      type: String,
      default: 'primary' // 按钮类型，默认为primary
    }
  },
  methods: {
    handleClick() {
      // 处理按钮点击事件
    }
  }
}
</script>

<style>
/* 样式可以根据需要进行自定义 */
</style>
