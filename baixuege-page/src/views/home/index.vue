<script setup></script>

<template>
  <div class="wrap">
    <h2>得之我幸，失之我命</h2>
    <div class="beian">
      <a href="https://beian.miit.gov.cn" target="_blank">皖ICP备2021002798号-1</a>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/卧室.jpg);
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 2rem;
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
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
