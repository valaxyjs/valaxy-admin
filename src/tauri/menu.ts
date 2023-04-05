import { listen } from '@tauri-apps/api/event'

export async function listenMenuIdApi() {
  try {
    await listen('menu_id', async ({ event, payload }) => {
      console.log('listen menu id', event, payload)
    })
  }
  catch (e) {
    console.log('listen error', e)
  }
}
