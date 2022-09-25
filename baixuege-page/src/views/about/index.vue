<script setup>
import MyFooter from "../../components/footer.vue";
</script>

<template>
  <div class="container wrap">
    <div class="card card-side">
      <div class="head">关于本站</div>
      <div class="body about-font-size">
        <div class="left">
          <ul>
            <li>页面：vue3</li>
            <li>后台：vue3 + antd</li>
            <li>接口：node + koa</li>
            <li>云服务：阿里云</li>
            <li>数据库：mysql</li>
            <li>源代码：https://github.com/gujiwuqing</li>
          </ul>
        </div>
        <!-- <div class="right"></div> -->
      </div>
    </div>
    <div class="card card-self">
      <div class="head">关于我</div>
      <div class="body about-font-size">
        <div class="left">
          <ul>
            <li>昵称：杨柳依依 —— 《诗经·小雅·采薇》</li>
            <li>籍贯：安徽合肥</li>
            <li>激励语：懦弱之举，我绝不姑息</li>
            <li>邮箱：chunguimengliren@163.com</li>
            <li>Gitee：https://gitee.com/fwh1998</li>
            <li>Github：https://github.com/gujiwuqing</li>
          </ul>
        </div>
        <!-- <div class="right"></div> -->
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
  height: 100vh;

  .card {
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);

    .head {
      height: 56px;
      line-height: 56px;
      padding-left: 24px;
      border-bottom: 1px solid #eee;
      font-size: 24px;
      font-weight: 600;
    }

    .body {
      padding: 24px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      .left {
        flex: 1;
      }
      .right {
        flex: 1;
      }
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
