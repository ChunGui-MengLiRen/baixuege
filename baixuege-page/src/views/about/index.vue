<script setup>
import MyFooter from "../../components/footer.vue";
import { ref } from "vue";
import { message } from "ant-design-vue";
import { getAboutDetail } from "../../api";

const selfText = ref("");
const siteText = ref("");

const getData = async () => {
  try {
    const res = await getAboutDetail();
    if (res.status == "1") {
      console.log(res.data);
      selfText.value = res.data[0].self;
      siteText.value = res.data[0].site;
    } else {
      message.error("获取关于失败！");
    }
  } catch (error) {
    message.error("获取关于失败！");
  }
};

getData();
</script>

<template>
  <div class="container wrap">
    <div class="card card-side">
      <div class="head">关于本站</div>
      <div class="body">
        <v-md-editor
          v-model="siteText"
          mode="preview"
          height="100%"
        ></v-md-editor>
      </div>
    </div>
    <div class="card card-self">
      <div class="head">关于我</div>
      <div class="body">
        <v-md-editor
          v-model="selfText"
          mode="preview"
          height="100%"
        ></v-md-editor>
      </div>
    </div>
  </div>
  <MyFooter />
</template>

<style lang="less" scoped>
.wrap {
  padding: 80px 16px 24px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;

  .card {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    // border-radius: 16px;
    box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);

    .head {
      height: 48px;
      line-height: 48px;
      padding-left: 24px;
      border-bottom: 1px solid #eee;
      font-size: 20px;
      font-weight: 600;
    }

    .body {
      flex: 1;
      // padding: 24px;
      // font-size: 16px;
      display: flex;
      justify-content: center;
    }
  }

  .card-side {
    flex: 1;
  }

  .card-self {
    flex: 1;
  }
}
</style>
