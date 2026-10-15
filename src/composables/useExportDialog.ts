import { shallowRef } from 'vue'

export interface ExportRequest {
  name: string
  text: string
}

export const exportRequest = shallowRef<ExportRequest | null>(null)

export function jasperDownload(name: string, text: string) {
  exportRequest.value = { name, text }
}
