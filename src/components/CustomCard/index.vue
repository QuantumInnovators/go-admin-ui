<template>
  <div class="custom-card" @click="redirectToPage">
    <div class="card-content">
      <h2> {{ titlename }}</h2>
      <div v-if="imgUrl"> <!-- 使用v-if条件判断imgUrl是否存在 -->
        <img class="centered-image" :src="imgUrl" alt="Centered Image">
      </div>
      <div v-else> <!-- 如果imgUrl不存在，显示图标 -->
        <i :class="iconClass" class="custom-icon" />
      </div>
      <p class="description">{{ description }}</p>
      <div v-if="buttonTitle">
        <el-button class="button">{{ buttonTitle }}</el-button>
      </div>
      <div v-if="buttonTitle_1">
        <el-button class="button">{{ buttonTitle_1 }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titlename: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    buttonTitle: {
      type: String
    },
    buttonTitle_1: {
      type: String
    },
    imgUrl: {
      type: String
    },
    iconClass: {
      type: String // 接收图标的class作为prop
    },
    pageUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    redirectToPage() {
      // 在这里使用路由实现页面跳转
      this.$router.push(this.pageUrl)
    }
  }
}
</script>

<style scoped>
.custom-card {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.centered-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
}

.description {
  margin-bottom: 10px;
}

.button {
  margin-bottom: 10px;
}
/* 自定义图标样式 */
.custom-icon {
  /* 可以添加其他自定义样式 */
}
</style>
