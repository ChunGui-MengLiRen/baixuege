<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { getDetail, updateMenu } from "../../../api/menu";
import { message } from "ant-design-vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    default: undefined,
  },
});
const emit = defineEmits(["update:visible", "update"]);

const loading = ref(false);
const spinning = ref(false);

let formState = ref({
  menu_name: "",
  menu_router: "",
  sn: 1,
  status: 1,
});

const form = ref();

// 获取详情
const getDetailData = async () => {
  spinning.value = true;
  const res = await getDetail(props.id);
  if (res.status == "1") {
    console.log(res.data[0]);
    formState.value.menu_name = res.data[0].menu_name;
    formState.value.menu_router = res.data[0].menu_router;
    formState.value.sn = res.data[0].sn;
    formState.value.status = res.data[0].status;
  } else {
    message.warning("获取详情失败");
  }
  spinning.value = false;
};

// 打开页面获取详情
watch(
  () => props.visible,
  async (newVal) => {
    if (newVal) {
      getDetailData();
    }
  }
);

// 更新
const handleOk = async () => {
  form.value
    .validate()
    .then(async () => {
      try {
        loading.value = true;
        const res = await updateMenu({
          id: props.id,
          ...formState.value,
        });
        if (res.status == "1") {
          message.success("更新成功！");
          handleCancel();
          emit("update");
        } else {
          message.warning(res.message);
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
        message.error("更新失败！");
      }
    })
    .catch((err) => {
      console.log("err");
    });
};

// 取消
const handleCancel = () => {
  emit("update:visible", false);
};
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="编辑"
    :mask-closable="false"
    destroyOnClose
    @cancel="handleCancel"
  >
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        提交
      </a-button>
    </template>
    <a-spin :spinning="spinning">
      <a-form
        ref="form"
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
      >
        <a-form-item
          name="menu_name"
          label="菜单名称"
          :rules="[{ required: true, message: '请输入菜单名称' }]"
        >
          <a-input
            v-model:value="formState.menu_name"
            placeholder="请输入菜单名称"
          />
        </a-form-item>
        <a-form-item
          name="menu_router"
          label="菜单路由"
          :rules="[{ required: true, message: '请输入菜单路由' }]"
        >
          <a-input
            v-model:value="formState.menu_router"
            placeholder="请输入菜单路由"
          />
        </a-form-item>
        <a-form-item
          name="sn"
          label="排序"
          :rules="[{ required: true, message: '请输入排序' }]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="请输入排序"
            v-model:value="formState.sn"
            :min="1"
            :max="999"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="formState.status" placeholder="请选择">
            <a-select-option :value="1"> 启用 </a-select-option>
            <a-select-option :value="0"> 禁用 </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<style lang="less" scoped></style>
