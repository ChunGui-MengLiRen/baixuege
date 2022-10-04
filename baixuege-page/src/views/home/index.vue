<script setup>
import { ref } from 'vue';
import { getHome } from '../../api';

const text = ref('');
const backImage = ref('');

const getData = async () => {
  const res = await getHome();
  if (res.status == '1') {
    console.log(res.data);
    text.value = res.data[0].text;
    backImage.value =
      import.meta.env.VITE_APP_BASE_API + res.data[0].back_image;
  }
};

getData();
</script>

<template>
  <div class="wrap" :style="{ 'background-image': `url(${backImage})` }">
    <h2 class="title-text">{{ text }}</h2>
    <div class="beian">
      <a href="https://beian.miit.gov.cn" target="_blank"
        >皖ICP备2021002798号-1</a
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-image: url(../../assets/卧室.jpg);
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 16px;
    color: #fff;
    text-shadow: 4px 4px 10px #000;
    // transform: translateY(-200px);
  }

  .beian {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 36px;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #22292d;
    font-size: 14px;

    a {
      color: #666;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
