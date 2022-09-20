<script setup></script>

<template>
  <div class="container wrap">
    <div class="article-box">
      <ul>
        <li v-for="i in 10" :key="i" class="article-item"></li>
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
  padding: 24px 0;
  margin: 0 auto;
  display: flex;
  gap: 24px;
}
.article-box {
  flex: 1;
  background-color: #f2f2f2;
  .article-item {
    height: 200px;
    border-bottom: 1px solid #ccc;
  }
  .pagination {
    padding: 24px;
    text-align: right;
  }
}

.card-box {
  width: 280px;
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
