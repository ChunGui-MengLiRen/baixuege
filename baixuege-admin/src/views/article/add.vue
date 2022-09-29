<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();

let text = ref('')

const cancel = () => {
  $router.back()
}
</script>


<template>
  <div class="add-article">
    <div class="action">
      <div>新增文章</div>
      <a-space>
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary">确认</a-button>
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
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .editor {
    flex: 1;
  }
}
</style>