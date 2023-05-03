<template>
  <div></div>
</template>

<script setup>
import { getCity } from "@/api/api";

const getCityHandler = async () => {
  try {
    const res = await getCity();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
getCityHandler();
</script>
