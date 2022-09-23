<script setup>
import MyFooter from '../../components/footer.vue';
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
              <a-tag color="pink">pink</a-tag>
              <a-tag color="red">red</a-tag>
              <a-tag color="orange">orange</a-tag>
              <a-tag color="green">green</a-tag>
              <a-tag color="cyan">cyan</a-tag>
              <a-tag color="blue">blue</a-tag>
              <a-tag color="purple">purple</a-tag>
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

    <div class="card-box lg-show"></div>
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
    border-bottom: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);
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
        font-weight: 600;
      }
      .content {
        font-size: 16px;
      }
      .meta{
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
  background-color: #fff;
}

.footer {
  background: #22292d;
  color: #c0c2c3;
  padding: 20px 30px 25px;
  font-size: 15px;
  height: 260px;
}
</style>
