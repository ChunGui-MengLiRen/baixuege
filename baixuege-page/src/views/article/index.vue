<script setup>
import { ref } from "vue";
import MyFooter from "../../components/footer.vue";
import {
  QqOutlined,
  WechatOutlined,
  GithubOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";

const isMusic = ref(false);
const isRadius = ref(false);
</script>

<template>
  <div class="container wrap">
    <div class="article-box">
      <ul>
        <li v-for="i in 10" :key="i" class="article-item xl-max-height">
          <div class="image">
            <img src="../../assets/panda.webp" alt="" />
          </div>
          <div class="data">
            <div class="title">我的文章</div>
            <div class="content">
              测试的文章内容没有实际的意义,测试的文章内容没有实际的意义测试的文章内容没有实际的意义测试的文章内容没有实际的意义测试的文章内容没有实际的意义
            </div>
            <div class="tag">
              <a-tag color="pink">javascript</a-tag>
              <a-tag color="red">node</a-tag>
              <a-tag color="orange">element-ui</a-tag>
              <a-tag color="green">koa</a-tag>
              <a-tag color="cyan">vue</a-tag>
              <a-tag color="blue">antd</a-tag>
            </div>
            <div class="meta">
              <span>杨柳依依</span>
              <span>2022-09-22 17:15:45</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <a-pagination v-model:current="current" :total="500" />
      </div>
    </div>

    <div class="card-box lg-show">
      <div class="card card-info">
        <div class="avatar">
          <img src="../../assets/bing_img.jpg" alt="" />
        </div>
        <div class="self">杨柳依依</div>
        <ul class="list">
          <li>坐标：安徽合肥</li>
          <li>爱好：游戏、电影</li>
          <li>前端：vue3 + antd-vue</li>
          <li>后端：node.js + koa</li>
        </ul>
        <div class="line-wrap">
          <div class="line"></div>
          <div class="text">社交账号</div>
          <div class="line"></div>
        </div>
        <div class="icon">
          <qq-outlined />
          <wechat-outlined />
          <github-outlined />
        </div>
      </div>

      <div class="card card-tag">
        <div class="card-title">
          标签
          <right-outlined />
        </div>
        <div class="card-body">
          <div class="tag" v-for="i in 10" :key="i">标签{{ i + 1 }}</div>
        </div>
      </div>

      <div class="card card-setting">
        <div class="card-title">
          设置
          <right-outlined />
        </div>
        <div class="card-body">
          <ul class="setting-list">
            <li class="item">播放器：<a-switch v-model:checked="isMusic" /></li>
            <li class="item">
              卡片圆角：<a-switch v-model:checked="isRadius" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <MyFooter />
</template>

<style lang="less" scoped>
.wrap {
  padding: 80px 12px 24px 12px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
}
.article-box {
  flex: 1;
  background-color: #fff;
  .article-item {
    border-bottom: 1px solid #eee;
    padding: 20px;
    // box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);
    display: flex;
    cursor: pointer;
    .image {
      width: 30%;
      aspect-ratio: auto 16 / 9;
      margin-right: 32px;
      &:hover {
        transform: scale(1.05);
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .data {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 24px;
        font-weight: 700;
      }
      .content {
        font-size: 16px;
      }
      .meta {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .pagination {
    padding: 24px;
    text-align: right;
  }
}

.card-box {
  display: none;
  width: 300px;
  background-color: #f5f5f5;
  .card-info {
    height: 320px;
    background-color: #fff;
    padding: 8px;
    .avatar {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      transition: all 0.5s;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      &:hover {
        transform: rotate(720deg) scale(1.1);
      }
    }

    .list {
      margin: 8px 0;
      text-align: center;
    }
    .self {
      margin-top: 8px;
      font-size: 20px;
      text-align: center;
      font-weight: 600;
    }

    .line-wrap {
      margin: 12px 0;
      display: flex;
      align-items: center;
      .line {
        flex: 1;
        height: 1px;
        background-color: #eee;
      }
      .text {
        flex: 1;
        text-align: center;
      }
    }

    .icon {
      display: flex;
      justify-content: space-around;
      font-size: 30px;
    }
  }

  .card-tag {
    margin-top: 24px;
    padding: 8px;
    background-color: #fff;
    .card-title {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      padding: 0 12px;
      border-bottom: 1px solid #eee;
    }

    .card-body {
      padding: 12px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      .tag {
        padding: 0 2px;
        height: 24px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
    }
  }

  .card-setting {
    margin-top: 24px;
    padding: 8px;
    background-color: #fff;
    .card-title {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      padding: 0 12px;
      border-bottom: 1px solid #eee;
    }

    .card-body {
      height: 60px;
      .setting-list {
        margin: 12px;
        .item {
          height: 32px;
        }
      }
    }
  }
}
</style>
