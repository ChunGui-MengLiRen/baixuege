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
    content: '',
    status: true,
  });
  
  const onFinish = (values) => {
    console.log('Success:', values);
    console.log(values.username);
  };
  </script>
  
  <template>
    <div>
      <a-modal v-model:visible="visible" title="编辑" :maskClosable="false" @cancel="handleCancel">
        <template #footer>
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
            提交
          </a-button>
        </template>
        <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off"
          @finish="onFinish">
          <a-form-item name="content" label="内容" :rules="[{ required: true, message: '请输入账号' }]">
            <a-textarea v-model:value="formState.content" placeholder="请输入内容" :rows="4" />
          </a-form-item>
          <a-form-item name="status" label="是否启用">
            <a-switch v-model:checked="formState.status" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </template>
  
  <style lang="less" scoped>
  
  </style>
  