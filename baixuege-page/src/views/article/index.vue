<script setup></script>

<template>
  <div class="container wrap">
    <div class="article-box">
      <ul>
        <li v-for="i in 10" :key="i" class="article-item">
          <div class="image">
            <img src="../../assets/logo.png" alt="" />
          </div>
          <div class="data">
            <div class="title">我的文章</div>
            <div class="content">测试的文章内容没有实际的意义</div>
            <div class="meta">2022-09-22</div>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <a-pagination v-model:current="current" :total="500" />
      </div>
    </div>

    <div class="card-box"></div>
  </div>
  <footer class="footer">
    <div class="container">
      <div>本网站由Vue3+Node+Element-plus联合驱动</div>
      <div>京ICP备2021039823号-1 杨柳依依保留所有权利</div>
    </div>
  </footer>
</template>

<style lang="less" scoped>
.wrap {
  padding-top: 80px;
  padding-bottom: 24px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
}
.article-box {
  flex: 1;
  background-color: #f2f2f2;
  .article-item {
    min-height: 160px;
    height: 10vw;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(116, 116, 116, 0.08);
    display: flex;
    .image {
      width: 16vw;
      min-width: 180px;
      height: 100%;
      margin-right: 32px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .data {
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
    }
  }
  .pagination {
    padding: 24px;
    text-align: right;
  }
}

.card-box {
  width: 320px;
  background-color: #f2f2f2;
}

.footer {
  background: #22292d;
  color: #c0c2c3;
  padding: 20px 30px 25px;
  font-size: 15px;
  height: 260px;
}
</style>
