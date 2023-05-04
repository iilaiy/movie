<template>
  <div class="city-bar">
    <van-index-bar :sticky="false">
      <template v-for="(item, key, index) in city" :key="index">
        <van-index-anchor :index="key" />
        <van-cell v-for="(val, i) in item" :title="val.name" :key="i" />
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  city: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
:deep(.van-index-anchor) {
  height: 0.7rem;
  line-height: 0.7rem;
  font-weight: normal;
}
:deep(.van-index-anchor) {
  background-color: #ebebeb;
}
:deep(.van-cell) {
  background-color: #f5f5f5;
  &::after {
    border-bottom-color: #c8c7cc;
  }
}
:deep(.van-index-bar__index) {
  color: #333333;
  font-weight: normal;
}
:deep(.van-index-bar__index--active) {
  color: $theme-bg-color;
}
</style>
