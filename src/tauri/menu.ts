import { listen } from '@tauri-apps/api/event'
import consola from 'consola'

export async function listenMenuIdApi() {
  try {
    await listen('menu_id', async ({ event, payload }) => {
      consola.info('listen menu id', event, payload)
    })
  }
  catch (e) {
    consola.error('listen error', e)
  }
}
