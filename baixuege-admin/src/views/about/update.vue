<script setup>
import { getDetail, updateAbout } from '../../api/about';
import { ref, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
const $router = useRouter();
const $route = useRoute();

let text = ref('');

const getDetailData = async () => {
  const res = await getDetail();
  if (res.status == '1') {
    console.log(res.data);
    text.value = res.data[0][$router.currentRoute.value.query.type];
  }
};

getDetailData();

const cancel = () => {
  $router.back();
};

const submit = async () => {
  try {
    const res = await updateAbout({
      type: $router.currentRoute.value.query.type,
      text: text.value
    });
    if (res.status == '1') {
      message.success('更新成功！');
      $router.push('/about');
    } else {
      message.warning('更新失败！');
    }
  } catch (error) {
    message.error('更新失败！' + error.message);
  }
};
</script>

<template>
  <div class="add-article">
    <div class="action">
      <div>编辑</div>
      <a-space>
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="submit">确认</a-button>
      </a-space>
    </div>
    <div class="editor">
      <v-md-editor v-model="text" height="100%"></v-md-editor>
    </div>
  </div>
</template>

<style lang="less" scoped>
.add-article {
  height: 100%;
  display: flex;
  flex-direction: column;

  .action {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
  }

  .editor {
    flex: 1;
  }
}
</style>
