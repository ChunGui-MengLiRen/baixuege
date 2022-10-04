<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { addSay } from '../../../api/say';

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:visible', 'create']);
const loading = ref(false);

const form = ref();

const formState = ref({
  content: ''
});

const handleOk = () => {
  form.value
    .validate()
    .then(async () => {
      try {
        loading.value = true;
        const res = await addSay({
          ...formState.value
        });
        if (res.status == '1') {
          message.success('新增成功！');
          emit('create');
        } else {
          message.warning('新增失败！');
        }
        loading.value = false;
      } catch (error) {
        console.log(error);
        message.error('新增失败！');
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
      title="新增"
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
      <a-form
        ref="form"
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
      >
        <a-form-item
          name="content"
          label="内容"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-textarea
            v-model:value="formState.content"
            placeholder="请输入内容"
            :auto-size="{ minRows: 4 }"
            :maxlength="500"
            show-count
          />
        </a-form-item>
        <!-- <a-form-item name="status" label="是否启用">
          <a-switch v-model:checked="formState.status" />
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
