<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getDetail, updateTags } from '@/api/tags';
import { number } from 'vue-types';

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

const form = ref();

const formState = ref({
  label: '',
  value: ''
});

// 获取详情
const getDetailData = async () => {
  spinning.value = true;
  const res = await getDetail(props.id);
  if (res.status == '1') {
    console.log(res.data[0]);
    formState.value.label = res.data[0].label;
    formState.value.value = res.data[0].value;
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

const handleOk = () => {
  form.value
    .validate()
    .then(async () => {
      try {
        loading.value = true;
        const res = await updateTags({
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
        console.log(error);
        message.error('更新失败！');
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const handleCancel = () => {
  formState.value.content = '';
  emit('update:visible', false);
};
</script>

<template>
  <div>
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
            name="label"
            label="类型名称"
            :rules="[{ required: true, message: '请输入类型名称' }]"
          >
            <a-input v-model:value="formState.label" placeholder="请输入" />
          </a-form-item>
          <a-form-item
            name="value"
            label="类型数值"
            :rules="[{ required: true, message: '请输入类型数值' }]"
          >
            <a-input v-model:value="formState.value" placeholder="请输入" />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
