<script setup lang="ts">
import { shell } from '@tauri-apps/api'
import { Command } from '@tauri-apps/api/shell'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

async function startValaxy() {
  const command = new Command('npm', ['run', 'dev'], {
    cwd: app.folderPath,
  })
  // const command = await new Command('echo', 'message')

  await command.execute()
}
</script>

<template>
  <div>
    <div m-4>
      <p>📁: {{ app.folderPath }}</p>
    </div>
    <el-card class="box-card">
      <el-button circle type="success" @click="startValaxy">
        <div i-ri-play-line />
      </el-button>
    </el-card>
  </div>
</template>
