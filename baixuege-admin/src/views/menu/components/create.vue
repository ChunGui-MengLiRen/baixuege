<script setup>
import { ref, reactive, defineProps, defineEmits } from "vue";
import { addMenu } from "../../../api/menu";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:visible", "create"]);

const loading = ref(false);

const formState = ref({
  menu_name: "",
  menu_router: "",
  sn: 1,
  status: 1,
});
const form = ref();

// 新增
const handleOk = async () => {
  form.value
    .validate()
    .then(async () => {
      try {
        loading.value = true;
        const res = await addMenu({
          ...formState.value,
        });
        if (res.status == "1") {
          message.success("新增成功！");
          handleCancel();
          emit("create");
        } else {
          message.warning(res.message);
        }
        loading.value = false;
      } catch (error) {
        message.error("新增失败！");
      }
    })
    .catch((err) => {
      console.log("err");
    });
};

// 取消
const handleCancel = () => {
  formState.value = {
    menu_name: "",
    menu_router: "",
    sn: 1,
    status: 1,
  };
  emit("update:visible", false);
};
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="新增"
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
  </a-modal>
</template>

<style lang="less" scoped></style>
