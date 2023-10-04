<script lang="ts" setup>
import type { FileEntry } from '@tauri-apps/api/fs'
import { computed, watch } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { useAppStore } from '~/stores/app'
import { getFolderEntries, sortEntries } from '~/tauri'

const app = useAppStore()

const defaultProps = {
  label: 'name',
  children: 'children',
  isLeaf: 'isLeaf',
}

// get folder entries on mount if folderPath is set
watch(() => app.folderPath, async () => {
  if (app.folderPath) {
    const entries = await getFolderEntries(app.folderPath)
    app.folderEntries = sortEntries(entries)
  }
}, {
  immediate: true,
})

function convertEntriesToTree(entries: FileEntry[]) {
  return entries.map((entry) => {
    // @ts-expect-error isLeaf
    entry.isLeaf = !entry.children
    return entry
  })
}

/**
 * load node lazy
 * @param node
 * @param resolve
 */
async function loadNode(node: Node, resolve: (data: FileEntry[]) => void) {
  const entry = node.data as FileEntry
  if (!entry.children || !entry.path)
    return
  const entries = await getFolderEntries(entry.path)
  resolve(convertEntriesToTree(entries))
}

const folderEntries = computed(() => {
  return convertEntriesToTree(app.folderEntries)
})

function handleNodeClick() {}
</script>

<template>
  <el-tree
    :data="folderEntries" :props="defaultProps"
    lazy
    :load="loadNode"
    @node-click="handleNodeClick"
  />
</template>
