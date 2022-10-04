<template>
  <div class="home">
    <a-form
      class="form"
      label-align="right"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      :form="searchForm"
    >
      <a-row>
        <a-col :span="8">
          <a-form-item label="作者">
            <a-input
              v-model:value="searchForm.author_name"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="上传时间">
            <a-range-picker
              v-model:value="searchForm.time"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label=" " :colon="false">
            <a-space>
              <a-button @click="reset">重置</a-button>
              <a-button type="primary" @click="search">搜索</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="table">
      <div class="action">
        <a-button type="primary" @click="openCreate">新增</a-button>
      </div>
      <a-table
        size="small"
        :columns="columns"
        :data-source="data"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-switch v-model:checked="record.status" />
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button type="link" size="small" @click="openUpdate(record)">
                编辑
              </a-button>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确认删除当前数据吗？"
                ok-text="是"
                cancel-text="否"
                @confirm="delConfirm(record)"
              >
                <a-button type="link" danger size="small">删除</a-button>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
      <div class="page">
        <a-pagination
          v-model:current="pagination.current"
          v-model:page-size="pagination.pageSize"
          show-size-changer
          :total="pagination.total"
          :show-total="total => `共 ${total} 条`"
          @change="pageChange"
        />
      </div>
    </div>
  </div>

  <Create v-model:visible="visibleCreate" @create="onCreate" />
  <Update :id="row.id" v-model:visible="visibleUpdate" @update="onUpdate" />
</template>
<script setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref, reactive, computed } from 'vue';
import Create from './components/create.vue';
import Update from './components/update.vue';
import { getSayList, delSay } from '../../api/say';

// 查询表单
const searchForm = ref({
  time: [],
  author_name: ''
});

// 当前行
let row = ref({});

const visibleCreate = ref(false); // 新增
const visibleUpdate = ref(false); // 编辑

const openCreate = () => {
  visibleCreate.value = true;
};
const openUpdate = record => {
  row.value = record;
  visibleUpdate.value = true;
};

// 分页
let pagination = ref({
  total: 100,
  current: 1,
  pageSize: 10
});

const columns = ref([
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 80,
    customRender: ({ text, record, index, column }) => `${index + 1}`
  },
  {
    title: '内容',
    name: 'content',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '作者',
    name: 'author_name',
    dataIndex: 'author_name',
    key: 'author_name'
  },
  {
    title: '上传时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '操作',
    key: 'action',
    width: 140
  }
]);
const data = ref([]);

// 获取列表
const getList = async () => {
  const res = await getSayList({
    page: {
      current: pagination.value.current,
      pageSize: pagination.value.pageSize
    },
    data: searchForm.value
  });
  if (res.status == '1') {
    data.value = res.data.data;
    pagination.value = res.data.page;
  }
};

getList();

// 新增成功
const onCreate = () => {
  visibleCreate.value = false;
  getList();
};

// 更新成功
const onUpdate = () => {
  visibleUpdate.value = false;
  getList();
};

const delConfirm = async record => {
  console.log(record);
  try {
    const res = await delSay(record.id);
    if (res.status == '1') {
      message.success('删除成功！');
      getList();
    } else {
      message.warning('删除失败！');
    }
  } catch (error) {
    message.error('删除失败！' + error);
  }
};

// 重置
const reset = () => {
  searchForm.value = {
    time: [],
    author_name: ''
  };
  getList();
};

// 搜索
const search = () => {
  getList();
};

const pageChange = (page, pageSize) => {
  pagination.value.current = page;
  pagination.value.pageSize = pageSize;
  getList();
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

  .page {
    text-align: right;
    padding: 24px 0;
  }
}
</style>
