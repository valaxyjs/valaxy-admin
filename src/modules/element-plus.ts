import ElementPlus from 'element-plus'
import { type UserModule } from '~/types'

import 'element-plus/dist/index.css'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ app }) => {
  app.use(ElementPlus)
}
