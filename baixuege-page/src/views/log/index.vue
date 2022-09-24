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
            <div class="box-head">
              <div class="head-avatar">
                <img src="../../assets/bing_img.jpg" alt="" />
                <span>杨柳依依</span>
              </div>
              <div class="time">2022-09-25</div>
            </div>
            <div class="box-body">
              <p>山水一程，风雪一更，聒碎乡心梦不成。</p>
            </div>
            <!-- <div class="box-footer"></div> -->
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
    background-color: #f0f3f4;
    padding: 64px 24px 24px;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);

    .time-item {
      position: relative;

      .line {
        position: absolute;
        width: 2px;
        height: calc(100% - 10px);
        background-color: #fff;
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
        border: 2px solid #fff;
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
        // box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);

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

        .box-head {
          height: 32px;
          border-bottom: 1px solid #eee;
          text-align: right;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .head-avatar {
            img {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }

        .box-body {
          margin: 0;
          padding: 8px;
          min-height: 80px;
          font-size: 18px;
        }

        .box-footer {
          border-top: 1px solid #eee;
          height: 24px;
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
