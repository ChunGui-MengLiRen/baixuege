<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import MyFooter from "../../components/footer.vue";
import { getSayList } from "../../api";

// 说说列表
const list = ref([]);

// 分页
const page = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});

// 获取说说
const getData = async () => {
  try {
    const res = await getSayList({
      page: page.value,
    });
    if (res.status == "1") {
      console.log(res.data);
      list.value = res.data.data;
      page.value = res.data.page;
    } else {
      message.error("获取说说失败！");
    }
  } catch (error) {
    message.error("获取说说失败！");
  }
};
getData();

// 分页选择
const pageChange = (current, pageSize) => {
  console.log(current, pageSize);
  page.value.current = current;
  page.value.pageSize = pageSize;
  getData();
};

// 移动端加载更多
const more = async () => {
  if (page.value.current < page.value.pages) {
    page.value.current++;
    try {
      const res = await getSayList({
        page: page.value,
      });
      if (res.status == "1") {
        console.log(res.data);
        list.value = [...list.value, ...res.data.data];
        page.value = res.data.page;
      } else {
        message.error("获取说说失败！");
      }
    } catch (error) {
      message.error("获取说说失败！");
    }
  }
};
</script>

<template>
  <div class="container wrap">
    <section class="time-log say-time-log say-time-log-lg say-time-log-xl">
      <ul>
        <li v-for="item in list" :key="item.id" class="time-item">
          <div class="line line-show"></div>
          <div class="dot dot-show"></div>
          <div class="content content-margin-left">
            <div class="currnet"></div>
            <div class="box-head">
              <div class="head-avatar">
                <img src="../../assets/bing_img.jpg" alt="" />
                <span>{{ item.author_name }}</span>
              </div>
              <div class="time">{{ item.time }}</div>
            </div>
            <div class="box-body">
              <p>{{ item.content }}</p>
            </div>
            <!-- <div class="box-footer"></div> -->
          </div>
        </li>
      </ul>

      <div v-if="page.total" class="pagination article-pagination-show">
        <a-pagination
          v-model:current="page.current"
          v-model:page-size="page.pageSize"
          show-size-changer
          :total="page.total"
          :show-total="(total) => `共 ${total} 条`"
          @change="pageChange"
        />
      </div>
      <div
        v-if="page.current !== page.pages"
        class="pagination-button article-pagination-button-hide"
      >
        <button @click="more">加载更多</button>
      </div>
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
  min-height: 100vh;

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
        display: none;
        position: absolute;
        width: 2px;
        height: calc(100% + 8px);
        background-color: #fff;
        top: 10px;
      }

      &:last-child {
        .line {
          display: none;
          height: calc(100% - 30px);
        }
      }

      .dot {
        display: none;
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
        // margin-left: 24px;
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
</style>
