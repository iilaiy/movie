<template>
  <div class="location-city">
    <!-- 定位城市 -->
    <van-cell-group title="定位城市" />
    <hr />
    <van-grid gutter=".3rem" column-num="3">
      <van-grid-item text="广州" />
    </van-grid>
    <hr />
    <!-- 热门城市 -->
    <van-cell-group title="热门城市" />
    <hr />
    <van-grid gutter=".3rem" column-num="3">
      <van-grid-item v-for="item in hotCity" :text="item.name" :key="item.id" />
    </van-grid>
    <hr />
    <!-- 城市索引列表 -->
    <CityBar :city="cityList"></CityBar>
  </div>
</template>

<script setup>
import CityBar from "@/components/CityBar";
import { ref } from "vue";
import { getCity, getPositionCity } from "@/api/api";
// const { proxy } = getCurrentInstance();

// 所有城市
const cityList = ref([]);
// 热门城市
const hotCity = ref([]);

const getCityHandler = async () => {
  try {
    const res = await getCity();
    // console.log(res);
    cityList.value = res.data.cities;
    hotCity.value = res.data.hotCities;
  } catch (err) {
    console.log(err);
  }
};
getCityHandler();

const getPositionCityHandler = async () => {
  try {
    const res = await getPositionCity()
    console.log(res);
  } catch(error) {
    console.log(error);
  }
}
getPositionCityHandler()
</script>

<style lang="scss" scoped>
:deep(.van-cell-group__title) {
  height: 0.7rem;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 0.7rem;
  color: #333333;
  background-color: #ebebeb;
  font-size: var(--van-index-anchor-font-size);
}
hr {
  height: 0.3rem;
  margin-block-start: 0;
  margin-block-end: 0;
  border-width: 0;
}
.location-city {
  background-color: #f5f5f5;
}
:deep(.van-grid-item__content) {
  height: 0.5rem;
  border: 1px solid #e6e6e6;
}
</style>
