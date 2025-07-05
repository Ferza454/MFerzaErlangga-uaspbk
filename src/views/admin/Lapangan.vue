<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Manajemen Lapangan</h2>

    <!-- Form Tambah/Edit -->
    <form @submit.prevent="submitLapangan" class="space-y-3 bg-gray-50 p-4 rounded shadow">
      <input v-model="form.nama" placeholder="Nama Lapangan" class="input w-full" />
      <input v-model="form.lokasi" placeholder="Lokasi" class="input w-full" />
      <button type="submit" class="btn-primary w-full">
        {{ form.id ? 'Update Lapangan' : 'Tambah Lapangan' }}
      </button>
    </form>

    <!-- Daftar Lapangan -->
    <ul class="mt-6 space-y-2">
      <li
        v-for="l in lapangan"
        :key="l.id"
        class="flex justify-between items-center bg-white p-3 shadow rounded"
      >
        <div>
          <strong>{{ l.nama || '(Tanpa Nama)' }}</strong> - {{ l.lokasi || '(Tanpa Lokasi)' }}
          <div class="text-sm mt-1" :class="getStatus(l.id).terpakai ? 'text-red-600' : 'text-green-600'">
            Status: {{ getStatus(l.id).label }}
          </div>
        </div>
        <div class="space-x-2">
          <button class="btn-secondary" @click="editLapangan(l)">Edit</button>
          <button class="btn-danger" @click="hapusLapangan(l.id)">Hapus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api'

const lapangan = ref([])
const booking = ref([])

const form = ref({
  id: null,
  nama: '',
  lokasi: ''
})

// Ambil data
const fetchLapangan = async () => {
  try {
    const res = await api.get('/lapangan')
    lapangan.value = res.data
    console.log('Data lapangan:', lapangan.value)
  } catch (err) {
    console.error('❌ Gagal fetch lapangan:', err)
  }
}


const fetchBooking = async () => {
  try {
    const res = await api.get('/booking')
    booking.value = res.data
  } catch (err) {
    console.error('❌ Gagal fetch booking:', err)
  }
}

// Cek status lapangan
const getStatus = (lapId) => {
  const booked = booking.value.some(b => Number(b.lapanganId) === Number(lapId))
  return booked
    ? { terpakai: true, label: 'Terpakai' }
    : { terpakai: false, label: 'Tersedia' }
}

// Tambah atau Update
const submitLapangan = async () => {
  const isEdit = !!form.value.id

  if (!isEdit && (!form.value.nama || !form.value.lokasi)) {
    alert('❌ Kolom tidak boleh kosong saat tambah.')
    return
  }

  try {
    if (isEdit) {
      await api.put(`/lapangan/${form.value.id}`, {
        nama: form.value.nama,
        lokasi: form.value.lokasi
      })
      alert('✅ Lapangan diperbarui.')
    } else {
      await api.post('/lapangan', {
        nama: form.value.nama,
        lokasi: form.value.lokasi
      })
      alert('✅ Lapangan ditambahkan.')
    }

    form.value = { id: null, nama: '', lokasi: '' }
    await fetchLapangan()
  } catch (err) {
    console.error(err)
    alert('❌ Gagal menyimpan lapangan.')
  }
}

// Isi form untuk edit
const editLapangan = (l) => {
  form.value = {
    id: l.id,
    nama: l.nama,
    lokasi: l.lokasi
  }
}

// Hapus lapangan
const hapusLapangan = async (id) => {
  if (!confirm('Yakin hapus lapangan ini?')) return

  try {
    await api.delete(`/lapangan/${id}`)
    alert('✅ Lapangan dihapus.')
    await fetchLapangan()
  } catch (err) {
    console.error('❌ Gagal hapus lapangan:', err)
    alert('❌ Gagal menghapus.')
  }
}


onMounted(() => {
  fetchLapangan()
  fetchBooking()
})
</script>

<style scoped>
.input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 0.95rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: bold;
}

.btn-secondary {
  background-color: #facc15;
  color: black;
  padding: 0.4rem 0.8rem;
  border-radius: 0.375rem;
  font-weight: bold;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 0.375rem;
  font-weight: bold;
}
</style>
