<template>
  <!-- 电影卡片 -->
  <div class="card">
    <div class="img-box">
      <img :src="card.img" alt="" />
    </div>
    <div class="card-info">
      <div class="left">
        <div class="title">
          <h2 class="text-one-hidden">{{ card.nm }}</h2>
        </div>
        <slot name="info"></slot>
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  card: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
/* 基本骨架样式 */
.card {
  margin-top: 0.3rem;
  display: flex;
  justify-content: center;
  .img-box {
    width: 20%;
    img {
      width: 100%;
    }
  }
  .card-info {
    width: calc(80% - 0.6rem);
    display: flex;
    .left {
      flex: 1;
      margin-left: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .title {
      font-size: 0.4rem;
      h2 {
        font-weight: 600;
      }
    }
  }
}
</style>
