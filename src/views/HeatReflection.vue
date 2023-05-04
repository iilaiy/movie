<template>
  <!-- 热映 -->
  <div class="heat-reflection" ref="heatReflection">
    <template v-for="item in hotFilm" :key="item.id">
      <FilmCard :card="item">
        <template #info>
          <div class="info score">
            <p v-if="item.mk">
              观众评<span>{{ item.mk }}</span>
            </p>
            <p v-else>暂无评分</p>
          </div>
          <div class="desc info">
            <p>{{ item.desc }}</p>
          </div>
          <div class="info">
            <p>{{ item.showInfo }}</p>
          </div>
        </template>
        <template #right>
          <!-- 确保 item.showStateButton 存在且不是一个空对象 -->
          <div
            class="right"
            v-if="
              item.showStateButton &&
              !(JSON.stringify(item.showStateButton) == '{}')
            "
          >
            <div class="btn">
              <button :style="{ background: item.showStateButton.color }">
                {{ item.showStateButton.content }}
              </button>
            </div>
          </div>
        </template>
      </FilmCard>
    </template>
    <van-loading v-if="loading.show" :size="loading.size">{{
      loading.text
    }}</van-loading>
  </div>
</template>

<script setup>
import FilmCard from "@/components/FilmCard";
import { onMounted, onBeforeUnmount, reactive, ref } from "vue";
import { getHotFilm, getHitBottomHotFilm } from "@/api/api";

// 伪分页参数
const movieIds = ref([]);

const hotFilm = reactive([]);
// 获取热映电影
const getHotFilmHandler = async () => {
  try {
    const res = await getHotFilm({ ct: "广州" });
    // console.log(res);
    res.data.hot.map((item) => hotFilm.push(item));
    movieIds.value = res.data.movieIds;
  } catch (err) {
    console.log(err);
  }
};
getHotFilmHandler();

// 加载组件
const loading = reactive({
  size: "24px",
  show: false,
  text: "加载中...",
});

// 实现伪分页
const pseudoPaging = () => {
  let movieIdsArr = [];
  let i = 1;
  while (i <= 10) {
    let index = Math.floor(Math.random() * movieIds.value.length);
    movieIdsArr.push(movieIds.value[index]);
    i++;
  }
  return movieIdsArr.join(",");
};

// 内容节点
const heatReflection = ref(null);

// 触底加载更多
const lazyLoading = async () => {
  // // 滚动到底部，再加载的处理事件
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  if (scrollHeight - clientHeight == scrollTop && loading.show == false) {
    // console.log('触底啦~');
    loading.show = true;
    try {
      const res = await getHitBottomHotFilm({
        movieIds: pseudoPaging(),
      });
      // console.log(res);
      if (res.coming.length === 0) {
        loading.size = "0px";
        loading.text = "到底啦，别巴拉了";
        return;
      }
      res.coming.map((item) => hotFilm.push(item));
      loading.show = false;
    } catch (error) {
      console.log(error);
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", lazyLoading, false);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", lazyLoading, false);
});
</script>

<style lang="scss" scoped>
:deep(.card-info) {
  border-bottom: 1px solid #f4f4f4;
}
.info {
  font-size: 0.3rem;
  color: #666666;
  line-height: 0.5rem;
}
.score {
  span {
    font-weight: 600;
    color: #faaf00;
    font-size: 0.38rem;
    margin-left: 0.1rem;
  }
}
.right {
  display: flex;
  align-items: center;
  .btn {
    button {
      border-radius: 0.4rem;
      padding: 0.1rem 0.3rem;
      color: #ffffff;
      font-size: 0.36rem;
    }
  }
}
:deep(.van-loading) {
  text-align: center;
}
</style>
