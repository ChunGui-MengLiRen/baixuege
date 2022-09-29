<template>
  <div class="home">
    <a-form class="form" labelAlign="right" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :form="searchForm">
      <a-row>
        <a-col :span="8">
          <a-form-item label="图片名称">
            <a-input placeholder="请输入" v-model:value="searchForm.name">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="首页文字">
            <a-input placeholder="请输入" v-model:value="searchForm.text">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="上传时间">
            <a-range-picker v-model:value="searchForm.dateRange" format="YYYY/MM/DD" value-format="YYYY/MM/DD"
              style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="状态">
            <a-select placeholder="请选择" v-model:value="searchForm.status">
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
        <a-button type="primary" @click="createData">新增</a-button>
      </div>
      <a-table size="small" :columns="columns" :data-source="data" :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-switch v-model:checked="record.status" />
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button type="link" size="small" @click="updateData">
                编辑
              </a-button>
              <a-divider type="vertical" />
              <a-popconfirm title="确认删除当前数据吗？" ok-text="是" cancel-text="否" @confirm="delConfirm">
                <a-button type="link" danger size="small">删除</a-button>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>

  <Create v-model:visible="visibleCreate" />
  <Update v-model:visible="visibleUpdate" />
</template>
<script setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref, reactive, computed } from 'vue';
import Create from './components/create.vue';
import Update from './components/update.vue';
// 查询表单
const searchForm = reactive({
  name: '',
  text: '',
  dateRange: [],
  status: undefined,
});

const visibleCreate = ref(false);// 新增
const visibleUpdate = ref(false);// 编辑
const createData = () => {
  visibleCreate.value = true;
};
const updateData = () => {
  visibleUpdate.value = true;
};

// 分页
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
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 80,
    customRender: ({ text, record, index, column }) => `${index + 1}`,
  },
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
    width: 140
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

const delConfirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};

</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;

  .form {
    width: 100%;
    padding: 24px 24px 0;
    margin-bottom: 24px;
    background-color: #fff;
  }

  .table {
    flex: 1;
    padding: 0px 24px 24px;
    background-color: #fff;

    .action {
      // height: 40px;
      text-align: right;
      padding: 16px 0px;
    }
  }
}
</style>
