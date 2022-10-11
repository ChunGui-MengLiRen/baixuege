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
          <a-form-item label="图片名称">
            <a-input v-model:value="searchForm.name" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="首页文字">
            <a-input v-model:value="searchForm.text" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col v-if="showAll" :span="8">
          <a-form-item label="上传时间">
            <a-range-picker
              v-model:value="searchForm.time"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="showAll" :span="8">
          <a-form-item label="状态">
            <a-select v-model:value="searchForm.status" placeholder="请选择">
              <a-select-option :value="1"> 启用 </a-select-option>
              <a-select-option :value="0"> 禁用 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" :offset="showAll ? 8 : 0">
          <a-form-item label=" " :colon="false">
            <a-space>
              <a-button @click="reset">重置</a-button>
              <a-button type="primary" @click="search">搜索</a-button>
              <div class="form-action" @click="showAll = !showAll">
                <span v-if="showAll">收起</span>
                <span v-else>展开</span>
                <up-outlined v-if="showAll" class="arrow" />
                <down-outlined v-else class="arrow" />
              </div>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="table">
      <div class="action">
        <a-button type="primary" @click="openCreate"
          ><plus-outlined />新增</a-button
        >
      </div>
      <a-table
        size="small"
        :columns="columns"
        :data-source="data"
        :pagination="false"
        :loading="loading"
      >
        <template #headerCell="{ column }">
          <span>{{ column.title }}</span>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'is_shici'">
            <div :style="{ color: record.is_shici ? 'green' : 'red' }">
              {{ record.is_shici == "1" ? "使用" : "禁用" }}
            </div>
          </template>
          <template v-if="column.key === 'status'">
            <div :style="{ color: record.status ? 'green' : 'red' }">
              {{ record.status == "1" ? "启用" : "禁用" }}
            </div>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button type="link" size="small" @click="openUpdate(record)">
                <edit-outlined />编辑
              </a-button>
              <a-divider
                v-if="record.status == '0'"
                type="vertical"
              ></a-divider>
              <a-popconfirm
                v-if="record.status == '0'"
                title="确认启用当前数据吗？"
                ok-text="是"
                cancel-text="否"
                @confirm="changeConfirm(record)"
              >
                <a-button type="link" size="small"
                  ><retweet-outlined />启用</a-button
                >
              </a-popconfirm>
              <a-divider
                v-if="record.status == '0'"
                type="vertical"
              ></a-divider>
              <a-popconfirm
                v-if="record.status == '0'"
                title="确认删除当前数据吗？"
                ok-text="是"
                cancel-text="否"
                @confirm="delConfirm(record)"
              >
                <a-button type="link" danger size="small"
                  ><delete-outlined />删除</a-button
                >
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
          :show-total="(total) => `共 ${total} 条`"
          @change="pageChange"
        />
      </div>
    </div>
  </div>
  <Create v-model:visible="visibleCreate" @create="onCreate" />
  <Update :id="row.id" v-model:visible="visibleUpdate" @update="onUpdate" />
</template>
<script setup>
import {
  SmileOutlined,
  DownOutlined,
  UpOutlined,
  EditOutlined,
  DeleteOutlined,
  RetweetOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref, reactive, computed } from "vue";
import Create from "./components/create.vue";
import Update from "./components/update.vue";
import { getHomeList, delHome, changeStatus } from "../../api/home";

// 查询表单
const searchForm = ref({
  name: "",
  text: "",
  time: [],
  status: undefined,
});

// 显示所有查询表单
let showAll = ref(false);

// 当前行
let row = ref({});

const visibleCreate = ref(false); // 新增
const visibleUpdate = ref(false); // 编辑

let data = ref([]); // 列表数据

let loading = ref(false);

// 分页
let pagination = ref({
  total: 100,
  current: 1,
  pageSize: 10,
});

// 列
const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 80,
    align: "center",
    customRender: ({ text, record, index, column }) => `${index + 1}`,
  },
  {
    title: "图片名称",
    name: "name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "首页文字",
    name: "text",
    dataIndex: "text",
    key: "text",
    align: "center",
  },
  {
    title: "使用诗词",
    dataIndex: "is_shici",
    key: "is_shici",
    align: "center",
  },
  {
    title: "创建/更新时间",
    dataIndex: "time",
    key: "time",
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    width: 300,
    align: "center",
  },
]);

// 获取列表
const getList = async () => {
  try {
    loading.value = true;
    const res = await getHomeList({
      page: {
        current: pagination.value.current,
        pageSize: pagination.value.pageSize,
      },
      data: searchForm.value,
    });
    if (res.status == "1") {
      data.value = res.data.data;
      pagination.value = res.data.page;
    } else {
      message.error("获取列表失败！");
    }
  } catch (error) {
    message.error("获取列表失败！");
  } finally {
    loading.value = false;
  }
};

getList();

// 打开新增弹框
const openCreate = () => {
  visibleCreate.value = true;
};

// 打开编辑弹框
const openUpdate = (record) => {
  console.log(record);
  row.value = record;
  visibleUpdate.value = true;
};

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

// 删除
const delConfirm = async (record) => {
  console.log(record);
  try {
    const res = await delHome(record.id);
    if (res.status == "1") {
      message.success("删除成功！");
      getList();
    } else {
      message.warning("删除失败！");
    }
  } catch (error) {
    message.error("删除失败！" + error);
  }
};

// 更改状态
const changeConfirm = async (record) => {
  console.log(record);
  try {
    const res = await changeStatus(record.id);
    if (res.status == "1") {
      message.success("更新成功！");
      getList();
    } else {
      message.warning("更新失败！");
    }
  } catch (error) {
    message.error("更新失败！" + error);
  }
};

// 重置
const reset = () => {
  searchForm.value = {
    name: "",
    text: "",
    time: [],
    status: undefined,
  };
  getList();
};

// 搜索
const search = () => {
  getList();
};

// 分页
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

    .form-action {
      display: flex;
      align-items: center;
      color: #999;
      cursor: pointer;
    }
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

/deep/.ant-table-thead > tr > th {
  font-weight: 600;
  background: #f2f2f2 !important;
}
</style>
