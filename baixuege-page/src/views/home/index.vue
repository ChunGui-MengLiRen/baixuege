<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { getHome } from "../../api";
import { load } from "jinrishici";

const text = ref("");
const backImage = ref("");
const is_shici = ref(0);
const shici = ref("");

// 获取首页配置
const getData = async () => {
  try {
    const res = await getHome();
    if (res.status == "1") {
      console.log(res.data);
      text.value = res.data[0].text;
      is_shici.value = res.data[0].is_shici;
      backImage.value =
        import.meta.env.VITE_APP_BASE_API + res.data[0].back_image;
    } else {
      message.error("获取首页失败！");
    }
  } catch (error) {
    message.error("获取首页失败！");
  }
};

// 获取诗词
load(
  (result) => {
    console.log(result);
    shici.value = result.data.content;
  },
  (errData) => {
    console.log(errData);
    message.error("获取今日诗词失败！" + errData);
  }
);

getData();
</script>

<template>
  <div class="wrap" :style="{ 'background-image': `url(${backImage})` }">
    <h2 class="title-text">{{ is_shici ? shici : text }}</h2>
    <div class="beian">
      <a href="https://beian.miit.gov.cn" target="_blank">
        皖ICP备2021002798号-1
      </a>
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
