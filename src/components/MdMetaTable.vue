<script lang="ts" setup>
import { path } from '@tauri-apps/api'
import { ref, watch } from 'vue'
import type { Post } from 'valaxy/types'
import dayjs from 'dayjs'
import { useAppStore } from '~/stores/app'
import { getFilesMetadata, getFolderEntries } from '~/tauri'

const app = useAppStore()

const postsMetadata = ref<Post[]>([])

async function getPostsMetadata() {
  let filesMetadata: Post[] = []
  const postsFolder = await path.join(app.folderPath, 'pages/posts')
  // tauri exists not working
  if (app.folderPath) {
    const postsEntries = await getFolderEntries(postsFolder)
    filesMetadata = await getFilesMetadata(postsEntries)
  }

  postsMetadata.value = filesMetadata
  return filesMetadata
}

watch(() => app.folderPath, async () => {
  getPostsMetadata()
}, {
  immediate: true,
})

function formatDateTime(date: string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<template>
  <el-table :data="postsMetadata" style="width: 100%">
    <el-table-column prop="name" label="Name" />

    <el-table-column prop="data.title" label="Title" />

    <el-table-column prop="data.date" label="Date">
      <template #default="scope">
        <div flex="~" items="center">
          <div i-ri-timer-line />
          <span ml="2">{{ formatDateTime(scope.row.data.date) }}</span>
        </div>
        <div flex="~" items="center">
          <div i-ri-timer-line />
          <span ml="2">{{ formatDateTime(scope.row.data.updated) }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="data.tags" label="Tags" />
    <el-table-column prop="data.categories" label="Categories" />

    <!-- <el-table-column label="Operations">
      <template #default="scope">
        {{ scope.row.data }}
      </template>
    </el-table-column> -->
  </el-table>
</template>
