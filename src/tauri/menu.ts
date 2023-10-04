import { listen } from '@tauri-apps/api/event'
import consola from 'consola'
import { openFolderDialog } from '~/utils'

export const EVENTS = {
  OPEN_FOLDER: 'open_folder',
}

export async function listenMenuIdApi() {
  try {
    await listen('menu_id', async ({ event, payload }) => {
      consola.info('listen menu id', event, payload)

      if (payload === EVENTS.OPEN_FOLDER)
        openFolderDialog()
    })
  }
  catch (e) {
    consola.error('listen error', e)
  }
}
