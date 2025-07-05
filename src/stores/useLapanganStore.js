import { defineStore } from 'pinia'
import { api } from '../api'

export const useLapanganStore = defineStore('lapangan', {
  state: () => ({
    daftarLapangan: []
  }),
  actions: {
    async fetchLapangan() {
      const res = await api.get('/lapangan')
      this.daftarLapangan = res.data
    }
  }
})
