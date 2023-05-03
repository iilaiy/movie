<template>
  <!-- 底部导航栏 -->
  <van-tabbar route v-model="active" :active-color="tabBar.color">
    <van-tabbar-item
      v-for="(item, index) in tabBar.list"
      :key="index"
      :to="item.routerUrl"
    >
      <span>{{ item.name }}</span>
      <template #icon>
        <img :src="active === index ? item.selectIcon : item.icon" alt="" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import tabBar from "@/data/tabBar";
import { ref, watch, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

// tabBar 索引
const active = ref(0);

// 防止用户刷新页面 tabBar 高亮错位
watch(
  () => proxy.$route.path,
  (val) => {
    tabBar.list.forEach((item, index) => {
      if (item.routerUrl == val) {
        active.value = index;
        return;
      }
    });
  },
  {
    immediate: true,
  }
);
</script>
