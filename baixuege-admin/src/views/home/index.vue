<template>
  <a-form
    class="form"
    labelAlign="right"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    :form="form"
  >
    <a-row>
      <a-col :span="8">
        <a-form-item label="图片名称">
          <a-input placeholder="请输入"> </a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="首页文字">
          <a-input placeholder="请输入"> </a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="上传时间">
          <a-range-picker style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="状态">
          <a-select placeholder="请选择">
            <a-select-option value="1"> 启用 </a-select-option>
            <a-select-option value="2"> 禁用 </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label=" " :colon="false">
          <a-space>
            <a-button>重置</a-button>
            <a-button type="primary">搜索</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <div class="table">
    <div class="action">
      <a-button @click="addData">新增</a-button>
    </div>
    <a-table
      size="small"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-switch v-model:checked="record.status" />
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a-button type="link" size="small">编辑</a-button>
            <a-divider type="vertical" />
            <a-button type="link" danger size="small">删除</a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <Create v-model:visible="visibleCreate" />
</template>
<script setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { ref, computed } from 'vue';
import Create from './components/create.vue';
const form = ref('');
const handleSubmit = () => {};

const visibleCreate = ref(false);
const addData = () => {
  visibleCreate.value = true;
};

const pagination = computed(() => ({
  total: 100,
  current: 1,
  pageSize: 10,
  showTotal: (total) => {
    return `共 100 条`;
  },
}));
const columns = ref([
  {
    title: '图片名称',
    name: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '首页文字',
    name: 'text',
    dataIndex: 'text',
    key: 'text',
  },
  {
    title: '上传时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
  },
]);
const data = ref([
  {
    key: '1',
    name: '图片1',
    text: '得之我幸，失之我命',
    date: '2022-09-21 12:34:24',
    status: false,
  },
  {
    key: '2',
    name: '图片2',
    text: '得之我幸，失之我命',
    date: '2022-09-22 12:34:24',
    status: true,
  },
  {
    key: '3',
    name: '图片3',
    text: '得之我幸，失之我命',
    date: '2022-09-23 12:34:24',
    status: true,
  },
]);
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  padding: 24px 24px 0;
  margin-bottom: 24px;
  background-color: #fff;
}
.table {
  padding: 0px 24px 24px;
  background-color: #fff;
  .action {
    // height: 40px;
    text-align: right;
    padding: 16px 0px;
  }
}
</style>
