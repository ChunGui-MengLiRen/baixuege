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
          <a-form-item label="标题">
            <a-input v-model:value="searchForm.title" placeholder="请输入">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="发布日期">
            <a-range-picker
              v-model:value="searchForm.time"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="8">
          <a-form-item label="标签">
            <a-select placeholder="请选择" v-model:value="searchForm.tag">
              <a-select-option value="node"> node </a-select-option>
              <a-select-option value="vue"> vue </a-select-option>
            </a-select>
          </a-form-item>
        </a-col> -->
        <a-col v-if="showAll" :span="8">
          <a-form-item label="状态">
            <a-select v-model:value="searchForm.status" placeholder="请选择">
              <a-select-option :value="1"> 启用 </a-select-option>
              <a-select-option :value="0"> 禁用 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" :offset="showAll ? 16 : 0">
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
        <a-button type="primary" @click="addArticle">新增</a-button>
      </div>
      <a-table
        size="small"
        :columns="columns"
        :data-source="data"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <div :style="{ color: record.status ? 'green' : 'red' }">
              {{ record.status == "1" ? "启用" : "禁用" }}
            </div>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button type="link" size="small" @click="updateArticle(record)">
                编辑
              </a-button>
              <a-divider type="vertical"></a-divider>
              <a-popconfirm
                :title="`确认${
                  record.status == '0' ? '启用' : '禁用'
                }当前数据吗？`"
                ok-text="是"
                cancel-text="否"
                @confirm="changeConfirm(record)"
              >
                <a-button type="link" size="small">{{
                  record.status == "0" ? "启用" : "禁用"
                }}</a-button>
              </a-popconfirm>
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
          :show-total="(total) => `共 ${total} 条`"
          @change="pageChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { SmileOutlined, DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getArticleList, delArticle, changeStatus } from "../../api/article.js";
const $router = useRouter();
const $route = useRoute();

// 查询表单
const searchForm = ref({
  title: "",
  tag: undefined,
  time: [],
  status: undefined,
});

// 显示所有查询表单
let showAll = ref(false);

// 跳转新增文章
const addArticle = () => {
  $router.push("/article/add");
};

// 跳转编辑文章
const updateArticle = (record) => {
  $router.push("/article/update?id=" + record.id);
};

// 分页
let pagination = ref({
  total: 100,
  current: 1,
  pageSize: 10,
});

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
    title: "标题",
    name: "title",
    dataIndex: "title",
    key: "title",
    align: "center",
  },
  {
    title: "作者",
    dataIndex: "author_name",
    key: "author_name",
    align: "center",
  },
  {
    title: "发布日期",
    dataIndex: "time",
    key: "time",
    align: "center",
  },
  {
    title: "类型",
    name: "type",
    dataIndex: "type",
    key: "type",
    align: "center",
  },
  {
    title: "标签",
    name: "tag",
    dataIndex: "tag",
    key: "tag",
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
    width: 200,
    align: "center",
  },
]);
let data = ref([]);

// 获取列表
const getList = async () => {
  const res = await getArticleList({
    page: {
      current: pagination.value.current,
      pageSize: pagination.value.pageSize,
    },
    data: searchForm.value,
  });
  if (res.status == "1") {
    data.value = res.data.data;
    pagination.value = res.data.page;
  }
};

getList();

// 删除
const delConfirm = async (record) => {
  console.log(record);
  try {
    const res = await delArticle(record.id);
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
    const res = await changeStatus(record.id, record.status == 1 ? 0 : 1);
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
    title: "",
    tag: undefined,
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
