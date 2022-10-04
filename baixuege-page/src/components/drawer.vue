<script setup>
import { ref, watch, onUpdated } from 'vue';
const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(['update:visible']);

const handle = () => {
  emit('update:visible');
};

onUpdated(() => {
  document.body.style.touchAction = props.visible ? 'none' : '';
  document.body.style.overflow = props.visible ? 'hidden' : '';
});
</script>

<template>
  <Teleport to="body">
    <div
      class="drawer"
      :class="{
        'open-drawer ': visible
      }"
    >
      <div
        class="drawer-mask"
        :class="{
          'open-drawer-mask ': visible
        }"
        @click="handle"
      ></div>
      <div
        class="drawer-body"
        :class="{
          'open-drawer-body ': visible
        }"
      >
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="less" scoped>
.drawer {
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  .drawer-mask {
    position: absolute;
    width: 0;
    height: 100%;
    opacity: 1;
    background-color: #00000073;
    // transition: none;
  }

  .drawer-body {
    position: fixed;
    top: 0;
    right: 0;
    background-color: #fff;
    width: 40%;
    height: 100%;
    padding: 24px;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
}

.open-drawer {
  width: 100% !important;
}

.open-drawer-mask {
  width: 100% !important;
}

.open-drawer-body {
  transform: translateX(0%) !important;
}
</style>
