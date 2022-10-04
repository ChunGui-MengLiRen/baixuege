<script setup>
import { ref } from "vue";
import MyFooter from "../../components/footer.vue";
import {
  QqOutlined,
  WechatOutlined,
  GithubOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { getArticleList } from "../../api"
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();


const baseURL = import.meta.env.VITE_APP_BASE_API

const isMusic = ref(false);
const isRadius = ref(false);
const current = ref(6);


const list = ref([])

const page = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const getData = async () => {
  const res = await getArticleList({
    page: page.value
  })
  if (res.status == '1') {
    console.log(res.data);
    list.value = res.data.data
    page.value = res.data.page
  }
}

getData()

const toDetail = (data) => {
  $router.push('/article/detail?id=' + data.id)
}

const pageChange = (page, pageSize) => {
  page.value.current = page
  page.value.pageSize = pageSize
  getData()

}

const more = () => {
  if (page.value.current < page.value.pages) {
    page.value.current++
    getData()
  }
}

const toGitHub = () => {
  window.open('https://github.com/ChunGui-MengLiRen')
}
</script>

<template>
  <div class="container wrap">
    <div class="article-box">
      <ul>
        <li v-for="item in list" :key="item.id" class="article-item xl-max-height">
          <div class="image" @click="toDetail(item)">
            <img v-if="item.image" :src="`${baseURL}${item.image}`" alt="" />
            <img v-else src="../../assets/panda.webp" alt="" />
          </div>
          <div class="data">
            <div class="title article-title-font-size" @click="toDetail(item)">{{item.title}}</div>
            <div class="content show-article-content">
              {{item.info}}
            </div>
            <div class="article-tag show-article-tag">
              <!-- <div class="item-tag">javascript</div>
              <div class="item-tag">node</div>
              <div class="item-tag">koa</div>
              <div class="item-tag">vue</div>
              <div class="item-tag">react</div> -->
              暂不支持
            </div>
            <div class="meta article-meta-font-size">
              <span>{{item.author_name}}</span>
              <span>
                <span class="hide-article-time">{{item.time.slice(0,10)}}</span>&nbsp;
                <span style="display: none" class="show-article-datetime">
                  {{item.time}}
                </span>
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination show-article-pagination">
        <!-- <a-pagination v-model:current="current" :total="500" /> -->
        <a-pagination v-model:current="page.current" v-model:page-size="page.pageSize" showSizeChanger
          :total="page.total" :show-total="total => `共 ${total} 条`" @change="pageChange" />
      </div>
      <div class="pagination-button show-article-pagination-button" v-if="page.current!==page.pages">
        <button @click="more">加载更多</button>
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
          <a-popover title="QQ" trigger="click">
            <template #content>
              <p>1971421491</p>
            </template>
            <qq-outlined />
          </a-popover>
          <a-popover title="微信" trigger="click">
            <template #content>
              <p>ChunGui-MengLiRen</p>
            </template>
            <wechat-outlined />
          </a-popover>
          <github-outlined @click="toGitHub" />
        </div>
      </div>

      <div class="card card-tag">
        <div class="card-title">
          标签
          <right-outlined />
        </div>
        <div class="card-body">
          <!-- <div class="tag" v-for="i in 10" :key="i">标签{{ i + 1 }}</div> -->
          <div>暂不支持</div>
        </div>
      </div>

      <div class="card card-setting">
        <div class="card-title">
          设置
          <right-outlined />
        </div>
        <div class="card-body">
          <!-- <ul class="setting-list">
            <li class="item">播放器：<a-switch v-model:checked="isMusic" /></li>
            <li class="item">
              卡片圆角：<a-switch v-model:checked="isRadius" />
            </li>
          </ul> -->
          <div>暂不支持</div>
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
  min-height: 100vh;
}

.article-box {
  width: 100%;
  flex: 1;
  background-color: #fff;

  .article-item {
    border-bottom: 1px solid #eee;
    padding: 12px;
    // box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);
    display: flex;
    cursor: pointer;
    max-width: 100%;

    .image {
      width: 30%;
      min-width: 100px;
      aspect-ratio: auto 16 / 9;
      margin-right: 24px;

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
      overflow: hidden;

      .title {
        font-size: 18px;
        font-weight: 700;
      }

      .content {
        font-size: 14px;
        font-style: italic;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        margin: 4px 0;
        // display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .article-tag {
        display: none;
        gap: 6px;
        white-space: nowrap;
        overflow: hidden;
        overflow-x: auto;

        .item-tag {
          font-size: 14px;
          padding: 0 4px;
          height: 24px;
          border: 1px solid #ccc;
          cursor: pointer;
        }
      }

      .meta {
        margin-top: 4px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .pagination {
    display: none;
    padding: 24px;
    text-align: right;
  }

  .pagination-button {
    padding: 24px;
    text-align: center;
  }
}

.card-box {
  display: none;
  width: 300px;
  background-color: #f5f5f5;

  .card-info {
    height: 340px;
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
