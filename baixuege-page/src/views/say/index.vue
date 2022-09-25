<script setup>
import MyFooter from "../../components/footer.vue";
</script>

<template>
  <div class="container wrap">
    <section class="time-log say-time-log say-time-log-lg say-time-log-xl">
      <ul>
        <li class="time-item" v-for="i in 20" :key="i">
          <div class="line"></div>
          <div class="dot"></div>
          <div class="content">
            <div class="currnet"></div>
            <div class="box-head">
              <div class="head-avatar">
                <img src="../../assets/bing_img.jpg" alt="" />
                <span>杨柳依依</span>
              </div>
              <div class="time">2022-09-25</div>
            </div>
            <div class="box-body">
              <p v-if="i % 2 == 0">
                山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。山水一程，风雪一更，聒碎乡心梦不成。
              </p>
              <p v-else>山水一程，风雪一更，聒碎乡心梦不成。</p>
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
    padding: 24px 0 0;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);

    .time-item {
      position: relative;
      margin-bottom: 16px;

      .line {
        position: absolute;
        width: 2px;
        height: calc(100% + 8px);
        background-color: #fff;
        top: 10px;
      }

      &:last-child {
        .line {
          height: calc(100% - 30px);
        }
      }
      .dot {
        position: absolute;
        margin-left: -4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid #fff;
      }
      .content {
        position: relative;
        top: -21px;
        margin-left: 24px;
        height: 100%;
        padding-bottom: 12px;
        padding: 8px 16px;
        border-radius: 12px;
        background-color: #fff;

        .currnet {
          position: absolute;
          top: 20px;
          left: -6px;
          width: 12px;
          height: 12px;
          transform: rotate(45deg);
          background-color: #fff;
        }

        .box-head {
          height: 32px;
          border-bottom: 1px solid #eee;
          text-align: right;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;

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
          min-height: 160px;
        }

        .box-footer {
          border-top: 1px solid #eee;
          height: 24px;
        }
      }
    }
  }
}
</style>
