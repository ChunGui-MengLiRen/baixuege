<script setup>
import MyFooter from "../../components/footer.vue";
</script>

<template>
  <div class="container wrap">
    <section class="time-log">
      <ul>
        <li class="time-item" v-for="i in 20" :key="i">
          <div class="line"></div>
          <div class="dot"></div>
          <div
            class="content"
            :class="{
              'content-right ': i % 2 == 0,
              'content-left ': i % 2 == 1,
            }"
          >
            <div
              class="currnet"
              :class="{
                'currnet-right ': i % 2 == 1,
                'currnet-left ': i % 2 == 0,
              }"
            ></div>
            <div class="head">2022-09-24</div>
            <div class="body">
              <p>初始化</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
  <MyFooter />
</template>

<style lang="less" scoped>
.wrap {
  padding: 80px 12px 24px 12px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  .time-log {
    width: 100%;
    position: relative;
    // background-color: #ccc;
    padding: 64px 240px 24px;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);

    .time-item {
      position: relative;

      .line {
        position: absolute;
        width: 2px;
        height: calc(100% - 10px);
        background-color: #1890ff;
        left: 50%;
        top: 10px;
      }
      .dot {
        position: absolute;
        margin-left: -4px;
        left: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid #1890ff;
      }
      .content {
        position: relative;
        top: -21px;
        width: calc(50% - 24px);
        height: 100%;
        padding-bottom: 12px;
        padding: 8px 16px;
        border-radius: 12px;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);

        .currnet {
          position: absolute;
          width: 12px;
          height: 12px;
          transform: rotate(45deg);
          background-color: #fff;
        }

        .currnet-left {
          top: 20px;
          left: -6px;
        }

        .currnet-right {
          top: 20px;
          right: -6px;
        }

        .head {
          margin-bottom: 8px;
          height: 24px;
          font-weight: 600;
          font-size: 18px;
        }

        .body {
          margin: 0;
          padding-left: 8px;
        }
      }

      .content-right {
        position: relative;
        margin-left: 24px;
        // width: calc(50% - 24px);
        left: 50%;
      }

      .content-left {
        position: relative;
        margin-right: 24px;
        text-align: right;
        // width: calc(50% - 24px);
      }
    }
  }
}
</style>
