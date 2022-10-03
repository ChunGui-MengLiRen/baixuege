<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';
import { addHome } from "../../../api/home"
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible', 'create']);

const loading = ref(false);
const action = "/blog/upload"

const fileList = ref([])

const formState = ref({
  name: '',
  text: '',
  back_image: ''
});
const form = ref()

// 新增
const handleOk = async () => {
  form.value
    .validate()
    .then(async () => {
      try {
        loading.value = true;
        const res = await addHome({
          ...formState.value,
        })
        if (res.status == '1') {
          message.success('新增成功！');
          emit('create');

        } else {
          message.warning('新增失败！');
        }
        loading.value = false;
      } catch (error) {
        message.error('新增失败！');
      }
    })
    .catch((err) => {
      console.log('err')
    });
};

// 取消
const handleCancel = () => {
  formState.value = {
    name: '',
    text: '',
    back_image: ''
  }
  emit('update:visible', false);
};

// 文件上传
const change = info => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    console.log(info);
    formState.value.back_image = info.file.response.path
    message.success(`${info.file.name} 文件上传成功`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name}文件上传错误`);
  }
};
</script>

<template>
  <a-modal v-model:visible="visible" title="新增" :maskClosable="false" @cancel="handleCancel">
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        提交
      </a-button>
    </template>
    <a-form ref="form" :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
      autocomplete="off">
      <a-form-item name="name" label="名称" :rules="[{ required: true, message: '请输入名称' }]">
        <a-input v-model:value="formState.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item name="text" label="首页文字">
        <a-input v-model:value="formState.text" placeholder="请输入首页文字" />
      </a-form-item>
      <!-- <a-form-item name="status" label="是否启用">
          <a-switch v-model:checked="formState.status" />
        </a-form-item> -->
      <a-form-item name="backImage" label="背景图片">
        <a-upload v-model:file-list="fileList" :action="action" :maxCount="1" list-type="picture" @change="change">
          <a-button>
            <upload-outlined></upload-outlined>
            上传
          </a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less" scoped>

</style>
