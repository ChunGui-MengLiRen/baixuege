<template>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <a-switch v-model:checked="record.status" />
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>编辑</a>
          <a-divider type="vertical" />
          <a>删除</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const columns = ref([
  {
    title: "文章标题",
    name: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "发布时间",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "标签",
    dataIndex: "tag",
    key: "tag",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "操作",
    key: "action",
  },
]);
const data = ref([
  {
    key: "1",
    name: "图片1",
    tag: "node",
    date: "2022-09-21 12:34:24",
    status: false,
  },
  {
    key: "2",
    name: "图片2",
    tag: "vue",
    date: "2022-09-22 12:34:24",
    status: true,
  },
  {
    key: "3",
    name: "图片3",
    tag: "koa",
    date: "2022-09-23 12:34:24",
    status: true,
  },
]);
</script>
