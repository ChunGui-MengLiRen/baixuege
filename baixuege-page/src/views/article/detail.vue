<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import MyFooter from "../../components/footer.vue";
import { getArticleDetail } from "../../api";

const $router = useRouter();

// const baseURL = import.meta.env.VITE_APP_BASE_API;

// 预览组件的引用
const preview = ref(null);
const container = ref(null);
//锚点数组
const nav = ref([]);
const navDOM = ref([]);

// 文章详情
const detail = ref({});

// 获取文章详情
const getDetail = async () => {
  const res = await getArticleDetail($router.currentRoute.value.query.id);
  if (res.status == "1") {
    console.log(res.data);
    detail.value = res.data[0];
  }
};
getDetail();

//获取锚点数组 获取完接口后调用
// const getTitle = () => {
//   nextTick(() => {
//     //获取所有的标题
//     const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");

//     navDOM.value = Array.from(anchors);

//     const titles = Array.from(anchors).filter(
//       (title) => !!title.innerText.trim()
//     );
//     if (!titles.length) {
//       titles.value = [];
//       return;
//     }

//     const hTags = Array.from(
//       new Set(titles.map((title) => title.tagName))
//     ).sort();

//     // //给每一个加样式
//     nav.value = titles.map((el) => ({
//       title: el.innerText,
//       lineIndex: el.getAttribute("data-v-md-line"),
//       indent: hTags.indexOf(el.tagName),
//     }));

//     nextTick(() => {
//       //改变样式
//       let arr = document.getElementById("permiss").getElementsByTagName("a");
//       let div = document.getElementById("permiss").getElementsByTagName("div");
//       for (let i = 0; i < arr.length; i++) {
//         if (i == 0) {
//           arr[i].style.color = "#00bfa6";
//           arr[i].style.marginLeft = "20px";
//           div[i].style.borderLeft = "1px solid #00bfa6";
//         } else {
//           arr[i].style.color = "black";
//           div[i].style.borderLeft = "1px solid #eee";
//         }
//       }
//     });
//   });
// };

// const handleAnchorClick = (anchor, line) => {
//   console.log(anchor);
//   console.log(line);

//   let dom = preview.value.$el.querySelector(`[data-v-md-line="${line}"]`);
// };

// getDetail().then(() => {
//   getTitle();
// });
</script>

<template>
  <div class="container wrap" ref="container">
    <v-md-editor
      v-model="detail.content"
      mode="preview"
      ref="preview"
    ></v-md-editor>
    <!-- <div class="navigation">
      <div class="navigation-content" id="permiss">
        <div
          v-for="(anchor, index) in nav"
          :key="index"
          :style="{ padding: `5px 0 5px ${anchor.indent * 10}px` }"
        >
          <a
            style="cursor: pointer; color: black; margin-left: 20px"
            @click="handleAnchorClick(anchor, anchor.lineIndex)"
            >{{ anchor.title }}</a
          >
        </div>
      </div>
    </div> -->
  </div>
  <MyFooter />
</template>

<style lang="less" scoped>
.wrap {
  padding: 80px 12px 24px 12px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  min-height: 100vh;

  .navigation {
    width: 240px;
    background-color: #fff;
    .navigation-content {
      position: fixed;
    }
  }
}
</style>
