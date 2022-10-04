<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { getDetail, updateHome } from '../../../api/home';
import { message } from 'ant-design-vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: undefined
  }
});
const emit = defineEmits(['update:visible', 'update']);

const loading = ref(false);
const spinning = ref(false);

let formState = ref({
  name: '',
  text: '',
  back_image: ''
});

const form = ref();

const action = '/blog/upload'; // 上传地址
const fileList = ref([]); // 上传文件列表

// 获取详情
const getDetailData = async () => {
  spinning.value = true;
  const res = await getDetail(props.id);
  if (res.status == '1') {
    console.log(res.data[0]);
    formState.value.name = res.data[0].name;
    formState.value.text = res.data[0].text;
    formState.value.back_image = res.data[0].back_image;
    fileList.value = res.data[0].back_image
      ? [
          {
            uid: '-1',
            name: res.data[0].back_image,
            status: 'done',
            url: '/blog' + res.data[0].back_image,
            thumbUrl: '/blog' + res.data[0].back_image
          }
        ]
      : [];
  } else {
    message.warning('获取详情失败');
  }
  spinning.value = false;
};

// 打开页面获取详情
watch(
  () => props.visible,
  async newVal => {
    if (newVal) {
      getDetailData();
    }
  }
);

const a = () => {
  console.log(90);
};

// 更新
const handleOk = async () => {
  console.log(123);
  form.value
    .validate()
    .then(async () => {
      try {
        loading.value = true;
        const res = await updateHome({
          id: props.id,
          ...formState.value
        });
        if (res.status == '1') {
          message.success('更新成功！');
          emit('update');
        } else {
          message.warning('更新失败！');
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
        message.error('更新失败！');
      }
    })
    .catch(err => {
      console.log('err');
    });
};

// 取消
const handleCancel = () => {
  emit('update:visible', false);
};

// 文件上传
const change = info => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    console.log(info);
    formState.value.back_image = info.file.response.path;
    message.success(`${info.file.name} 文件上传成功`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name}文件上传错误`);
  }
};
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="编辑"
    :mask-closable="false"
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
          name="name"
          label="图片名称"
          :rules="[{ required: true, message: '请输入名称' }]"
        >
          <a-input v-model:value="formState.name" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item name="text" label="首页文字">
          <a-input
            v-model:value="formState.text"
            placeholder="请输入首页文字"
          />
        </a-form-item>
        <!-- <a-form-item name="status" label="是否启用">
          <a-switch v-model:checked="formState.status" />
        </a-form-item> -->
        <a-form-item name="backImage" label="背景图片">
          <a-upload
            v-model:file-list="fileList"
            :action="action"
            :max-count="1"
            list-type="picture"
            @change="change"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              上传
            </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<style lang="less" scoped></style>
