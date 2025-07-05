<template>
  <div>
    <h2>Manajemen Lapangan</h2>

    <form @submit.prevent="tambahAtauEditLapangan">
      <input v-model="form.nama" placeholder="Nama Lapangan" required />
      <input v-model="form.lokasi" placeholder="Lokasi Lapangan" required />
      <button type="submit">{{ form.id ? 'Update' : 'Tambah' }}</button>
    </form>

    <ul>
      <li v-for="lap in lapangan" :key="lap.id">
        {{ lap.nama }} - {{ lap.lokasi }}
        <button @click="editLapangan(lap)">Edit</button>
        <button @click="hapusLapangan(lap.id)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api'

const lapangan = ref([])
const form = ref({ nama: '', lokasi: '', id: null })

const fetchLapangan = async () => {
  const res = await api.get('/lapangan')
  lapangan.value = res.data
}

const tambahAtauEditLapangan = async () => {
  if (form.value.id) {
    // UPDATE
    await api.put(`/lapangan/${form.value.id}`, {
      nama: form.value.nama,
      lokasi: form.value.lokasi
    })
  } else {
    // CREATE
    await api.post('/lapangan', {
      nama: form.value.nama,
      lokasi: form.value.lokasi
    })
  }

  form.value = { nama: '', lokasi: '', id: null }
  fetchLapangan()
}

const editLapangan = (lap) => {
  form.value = { ...lap }
}

const hapusLapangan = async (id) => {
  await api.delete(`/lapangan/${id}`)
  fetchLapangan()
}

onMounted(fetchLapangan)
</script>
