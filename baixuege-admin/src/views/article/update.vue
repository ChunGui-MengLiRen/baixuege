<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getDetail, updateArticle } from '../../api/article.js';

const $router = useRouter();
const $route = useRoute();

const loading = ref(false);
const spinning = ref(false);
let form = ref();
const formState = ref({
  title: '',
  image: '',
  info: '',
  content: '',
  status: 1,
  type: undefined,
  tag: []
});

const action = import.meta.env.VITE_APP_BASE_API + '/upload';
const fileList = ref([]);

const options = ref([
  {
    label: 'javascript',
    value: '1'
  },
  {
    label: 'vue',
    value: '2'
  },
  {
    label: 'css',
    value: '3'
  },
  {
    label: '随笔',
    value: '4'
  }
]);

// 获取详情
const getDetailData = async () => {
  spinning.value = true;
  const res = await getDetail($router.currentRoute.value.query.id);
  if (res.status == '1') {
    console.log(res.data[0]);
    formState.value.title = res.data[0].title;
    formState.value.image = res.data[0].image;
    formState.value.info = res.data[0].info;
    formState.value.content = res.data[0].content;
    formState.value.status = res.data[0].status;
    formState.value.type = res.data[0].type;
    formState.value.tag = res.data[0].tag.split(',');
    fileList.value = res.data[0].image
      ? [
          {
            uid: '-1',
            name: res.data[0].image,
            status: 'done',
            url: import.meta.env.VITE_APP_BASE_API + res.data[0].image,
            thumbUrl: import.meta.env.VITE_APP_BASE_API + res.data[0].image
          }
        ]
      : [];
  } else {
    message.warning('获取详情失败');
  }
  spinning.value = false;
};
getDetailData();

const cancel = () => {
  $router.back();
};

const submit = () => {
  form.value
    .validate()
    .then(async () => {
      try {
        loading.value = true;
        const res = await updateArticle({
          id: $router.currentRoute.value.query.id,
          ...formState.value,
          tag: formState.value.tag.join(',')
        });
        if (res.status == '1') {
          message.success('更新成功！');
          // emit('create');
          $router.push('/article');
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

// 文件上传
const change = info => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    console.log(info);
    formState.value.image = info.file.response.path;
    message.success(`${info.file.name} 文件上传成功`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name}文件上传错误`);
  }
};
</script>

<template>
  <div class="add-article">
    <div class="action">
      <div>新增文章</div>
      <a-space>
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="submit">确认</a-button>
      </a-space>
    </div>
    <div class="editor">
      <a-form
        ref="form"
        layout="vertical"
        :model="formState"
        name="basic"
        autocomplete="off"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              name="title"
              label="文章标题"
              :rules="[{ required: true, message: '文章标题' }]"
            >
              <a-input
                v-model:value="formState.title"
                placeholder="请输入文章标题"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态">
              <a-select v-model:value="formState.status" placeholder="请选择">
                <a-select-option :value="1"> 启用 </a-select-option>
                <a-select-option :value="0"> 禁用 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="分类">
              <a-select v-model:value="formState.type" placeholder="请选择">
                <a-select-option value="1"> 技术文章 </a-select-option>
                <a-select-option value="2"> 随笔感想 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="标签">
              <a-select
                v-model:value="formState.tag"
                placeholder="请选择"
                mode="multiple"
                :options="options"
              >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="image" label="文章图片">
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
          </a-col>
          <a-col :span="24">
            <a-form-item name="info" label="文章简介">
              <a-textarea
                v-model:value="formState.info"
                placeholder="请输入文章简介"
                :rows="4"
                show-count
                :maxlength="200"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item name="content" label="文章内容">
              <v-md-editor
                v-model="formState.content"
                height="600px"
              ></v-md-editor>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
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
}
</style>
