import { setActivePinia, createPinia } from 'pinia'
import { useLapanganStore } from '@/stores/useLapanganStore'
import { describe, it, expect, vi } from 'vitest'
import { api } from '@/api'

vi.mock('@/api', () => ({
  api: {
    get: vi.fn().mockResolvedValue({
      data: [
        { id: 1, nama: 'Lapangan A' },
        { id: 2, nama: 'Lapangan B' }
      ]
    })
  }
}))

describe('useLapanganStore', () => {
  it('fetchLapangan works and sets data', async () => {
    setActivePinia(createPinia())
    const store = useLapanganStore()
    await store.fetchLapangan()
    expect(store.daftarLapangan.length).toBe(2)
    expect(store.daftarLapangan[0].nama).toBe('Lapangan A')
  })
})
