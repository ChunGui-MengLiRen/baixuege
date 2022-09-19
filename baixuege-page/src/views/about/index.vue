<script setup></script>

<template>
  <div class="container wrap">
    <div class="banner">
      <div class="text">
        <h2>杨柳依依</h2>
        <h4>懦弱之举，我绝不姑息</h4>
      </div>
      <div class="image">
        <img src="../../assets/banner.svg" alt="" />
      </div>
    </div>
    <!-- <footer class="footer">
    <div>本网站由Vue3+Node+Element-plus联合驱动</div>
    <div>京ICP备2021039823号-1 杨柳依依保留所有权利</div>
  </footer> -->
  </div>
</template>

<style lang="less" scoped>
.wrap {
  margin: 0 auto;
  padding: 0 40px;
  background-color: #f2f2f2;

  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 64px 0;
    .text {
      h2 {
        font-size: 64px;
        font-weight: 600;
        color: #00bfa6;
        margin-bottom: 40px;
      }
      h4 {
        font-size: 40px;
        font-weight: 400;
      }
    }
    .image {
      width: auto;
      height: auto;
      max-height: 30vw;
      img {
        width: auto;
        max-height: 30vw;
      }
    }
  }
}
</style>
