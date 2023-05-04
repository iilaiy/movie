<template>
  <div class="search">
    <!-- 标题栏 -->
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="电影"
      :border="false"
    />
    <form action="/">
      <!-- 搜索框 -->
      <van-search
        v-model="inputVal"
        show-action
        placeholder="搜电影、搜影院"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

// https://gitcode.net/mirrors/ZhangWY0724/uni-Movie?utm_source=csdn_github_accelerator

// 搜索框内容
const inputVal = ref("");

// 确定搜索时触发
const onSearch = () => {};
// 点击取消按钮时触发
const onCancel = () => {
  proxy.$router.push({
    path: "/",
  });
};
// 返回上一页
const onClickLeft = () => {
  proxy.$router.back();
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
:deep(.van-nav-bar__content) {
  background-color: $theme-bg-color;
  .van-nav-bar__title {
    font-weight: normal;
    color: #ffffff;
  }
  .van-icon {
    color: #ffffff;
    font-size: 0.5rem;
  }
}
:deep(.van-search) {
  background-color: #f5f5f5;
  border: 0.02rem solid #e6e6e6;
  .van-cell {
    padding-left: 0.2rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    border: 0.02rem solid #e6e6e6;
    .van-cell__value {
      font-size: 0.32rem;
      input::placeholder {
        color: #757575;
      }
    }
  }
  .van-search__action {
    color: #f03d37;
  }
}
.search {
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
