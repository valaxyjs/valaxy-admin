<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { useAppStore } from '~/stores/app'

// import { onMounted } from 'vue'
// import { entries } from '~/utils'

// onMounted(() => {
//   console.log('mounted')
//   console.log('entries', entries)
// })

const app = useAppStore()
</script>

<template>
  <div v-if="!app.folderPath">
    <a href="https://valaxy.site/" target="_blank">
      <img src="/valaxy-logo.png" class="logo valaxy" alt="Valaxy logo">
    </a>

    <h1 font="bold">
      Valaxy Admin
    </h1>

    <HelloValaxy />
  </div>
  <div v-else>
    <MdMetaTable />
  </div>
</template>

<style scoped>
.logo {
  display: inline-block;
  height: 10em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.2s;
}
/* todo valaxy */
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
