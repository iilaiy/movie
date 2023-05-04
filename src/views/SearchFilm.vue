<template>
  <div class="search">
    <!-- 标题栏 -->
    <van-nav-bar title="电影" :border="false" fixed />
  </div>
</template>

<script></script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
:deep(.van-nav-bar__content) {
  background-color: $theme-bg-color;
  .van-nav-bar__title {
    font-weight: normal;
    color: #ffffff;
  }
}
</style>
