<template>
  <div class="container">
    <!-- 标题栏 -->
    <van-nav-bar title="电影" :border="false" fixed />
    <!-- 标签栏 -->
    <van-tabs v-model:active="tagActive">
      <template #nav-left>
        <!-- 地区 -->
        <router-link class="area" to="/city">
          <span>广州</span>
          <i class="iconfont icon-down"></i>
        </router-link>
      </template>
      <!-- 选项栏 -->
      <van-tab
        v-for="item in tagList"
        :title="item.title"
        :key="item.id"
        :to="item.routerUrl"
      >
      </van-tab>
      <template #nav-right>
        <!-- 搜索 -->
        <router-link class="search" to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </template>
    </van-tabs>
    <!-- 内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- 导航栏 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
import tabBar from "@/components/TabBar";
import tagList from "@/data/filmTag";
import { ref, getCurrentInstance, watch } from "vue";
const { proxy } = getCurrentInstance();

// 标签栏索引
const tagActive = ref(0);

// 防止用户刷新页面标签栏高亮错位
watch(
  () => proxy.$route.path,
  (val) => {
    tagList.forEach((item, index) => {
      if (item.routerUrl == val) {
        tagActive.value = index;
        return;
      }
    });
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@import "@/assets/css/home/home-film.scss";

:deep(.van-nav-bar__content) {
  background-color: $theme-bg-color;
  .van-nav-bar__title {
    font-weight: normal;
    color: #ffffff;
  }
}
:deep(.van-tabs) {
  margin-top: var(--van-nav-bar-height);
  position: sticky;
  top: var(--van-nav-bar-height);
  .van-tabs__wrap {
    border-bottom: 2px solid #e6e6e6;
  }
  .van-tab__text {
    font-weight: 600;
  }
  .van-tabs__line {
    background: $theme-bg-color;
    width: 0.56rem;
    bottom: 30%;
    border-radius: 0;
  }
}
</style>
