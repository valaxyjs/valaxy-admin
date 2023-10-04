<script lang="ts" setup>
import { dialog } from '@tauri-apps/api'
import { rel, resolve } from '@tauri-apps/api/path'
import { exists } from '@tauri-apps/api/fs'
import { onMounted, ref, watch } from 'vue'
import type { Post } from 'valaxy'
import dayjs from 'dayjs'
import { open } from '@tauri-apps/api/shell'
import { useAppStore } from '~/stores/app'
import { getFilesMetadata, getFolderEntries } from '~/tauri/fs'

const app = useAppStore()

const postsMetadata = ref<Post[]>([])
const postsFolder = ref('')

async function getPostsMetadata() {
  let filesMetadata: Post[] = []
  postsFolder.value = await resolve(app.folderPath, 'pages', 'posts')
  // // alert(postsFolder)
  // alert(await exists(postsFolder))
  if (!(await exists(postsFolder.value))) {
    dialog.message('Posts folder not found', {
      type: 'error',
    })
    return
  }

  // tauri exists not working
  if (app.folderPath) {
    const postsEntries = await getFolderEntries(postsFolder.value)
    filesMetadata = await getFilesMetadata(postsEntries)
  }

  postsMetadata.value = filesMetadata
  return filesMetadata
}

watch(() => app.folderPath, async () => {
  if (app.folderPath)
    getPostsMetadata()
}, {
  immediate: true,
})

function formatDateTime(date: string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * @see https://devtools.vuejs.org/guide/open-in-editor.html
 * @param url
 */
async function openInEditor(url: string) {
  await fetch(`/__open-in-editor?file=${encodeURIComponent(url)}`)
  return true
}

async function openInBrowser(path: string) {
  let result = path.replace(postsFolder.value, '')
  result.replace('\\', '/')
  result = result.slice(1, result.length - 3)
  open(`https://yunyoujun.cn` + `/posts/${result}`)
}
</script>

<template>
  <el-table :data="postsMetadata" style="width: 100%">
    <el-table-column prop="data.title" label="Title">
      <template #default="scope">
        <div class="text-xs" font="serif black">
          {{ scope.row.data.title }}
        </div>
        <div class="text-xs" color="gray">
          {{ scope.row.name }}
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="data.date" label="Date" width="160px">
      <template #default="scope">
        <div class="text-xs">
          <div flex="~" items="center">
            <div i-ri-timer-line />
            <span ml="1">{{ formatDateTime(scope.row.data.date) }}</span>
          </div>
          <div flex="~" items="center">
            <div i-ri-timer-line />
            <span ml="1">{{ formatDateTime(scope.row.data.updated) }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      prop="data.tags" label="Tags"
    >
      <template #default="scope">
        <div flex="~ wrap" items="center">
          <el-tag
            v-for="tag in scope.row.data.tags"
            :key="tag"
            class="m-1"
            size="small"
          >
            {{ tag }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="data.categories" label="Categories">
      <template #default="scope">
        <div flex="~ wrap" items="center">
          <el-tag
            v-for="category in scope.row.data.categories"
            :key="category"
            class="m-1"
            type="success"
            size="small"
          >
            {{ category }}
          </el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template #default="scope">
        <!-- {{ scope.row.data }} -->
        <el-button size="small" @click="openInBrowser(scope.row.path)">
          <div i-ic:round-open-in-browser />
        </el-button>
        <el-button size="small" @click="openInEditor(scope.row.path)">
          <div i-vscode-icons:file-type-vscode />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
