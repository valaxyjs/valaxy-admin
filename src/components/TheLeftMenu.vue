<script lang="ts" setup>
import { ref } from 'vue'
import consola from 'consola'

const isCollapse = ref(true)
function handleOpen(key: string, keyPath: string[]) {
  consola.log('handleOpen', key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  consola.log('handleOpen', key, keyPath)
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'i-ri-dashboard-line',
    index: '/dashboard',
  },
  // {
  //   title: 'Test',
  //   icon: 'i-ri-play-fill',
  //   index: '/test',
  // },
  {
    title: 'Script Node Editor',
    icon: 'i-ri-node-tree',
    index: '/',
  },
  {
    title: 'Settings',
    icon: 'i-ri-settings-line',
    index: '/settings',
  },
]
</script>

<template>
  <el-menu
    default-active="/home"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    router
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">
      <el-icon>
        <div :class="item.icon" />
      </el-icon>
      <template #title>
        {{ item.title }}
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>
