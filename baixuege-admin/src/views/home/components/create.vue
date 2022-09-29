<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);
const loading = ref(false);

const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit('update:visible', false);
  }, 2000);
};

const handleCancel = () => {
  emit('update:visible', false);
};

const formState = reactive({
  name: '',
  text: '',
  status: true,
  fileList: [],
});

const onFinish = (values) => {
  console.log('Success:', values);
  console.log(values.username);
};
</script>

<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="新增"
      :maskClosable="false"
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
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="name"
          label="图片名称"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input
            v-model:value="formState.name"
            placeholder="请输入图片名称"
          />
        </a-form-item>
        <a-form-item name="text" label="首页文字">
          <a-input
            v-model:value="formState.text"
            placeholder="请输入首页文字"
          />
        </a-form-item>
        <a-form-item name="status" label="是否启用">
          <a-switch v-model:checked="formState.status" />
        </a-form-item>
        <a-form-item name="backImage" label="背景图片">
          <a-upload
            v-model:file-list="formState.fileList"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              上传
            </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
