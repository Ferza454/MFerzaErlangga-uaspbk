<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Jadwal Booking</h2>

    <div v-if="bookingSaya.length === 0" class="text-gray-500">
      Belum ada bookingan.
    </div>

    <ul class="space-y-4">
      <li
        v-for="b in bookingSaya"
        :key="b.id"
        class="bg-white p-4 border rounded shadow"
      >
        <!-- Edit Mode -->
        <div v-if="form.id === b.id" class="space-y-2">
          <input v-model="form.tanggal" type="date" class="input w-full" />
          <div class="flex gap-2">
            <input v-model="form.startTime" type="time" class="input w-full" />
            <input v-model="form.endTime" type="time" class="input w-full" />
          </div>
          <div class="flex gap-2">
            <button class="btn-primary" @click="submitUpdate">Simpan</button>
            <button class="btn-secondary" @click="batalEdit">Batal</button>
          </div>
        </div>

        <!-- View Mode -->
        <div v-else class="flex justify-between items-center">
          <div>
            <div class="text-blue-800 font-semibold text-lg">
              {{ getLapanganName(b.lapanganId) }}
            </div>
            <div>
              {{ b.nama }}<br />
              {{ b.tanggal }} | {{ b.startTime }} - {{ b.endTime }}
            </div>
          </div>
          <div class="flex gap-2">
            <button class="btn-secondary" @click="edit(b)">Edit</button>
            <button class="btn-danger" @click="hapus(b.id)">Hapus</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '@/api'

// Ambil nama user dari localStorage
const currentUser = localStorage.getItem('username') || 'anonim'

const booking = ref([])
const lapangan = ref([])

const fetchData = async () => {
  const resBooking = await api.get('/booking')
  booking.value = resBooking.data

  const resLapangan = await api.get('/lapangan')
  lapangan.value = resLapangan.data
}

// Filter booking milik user
const bookingSaya = computed(() =>
  booking.value.filter(b => b.nama.toLowerCase() === currentUser.toLowerCase())
)

const getLapanganName = (id) => {
  const l = lapangan.value.find(l => Number(l.id) === Number(id))
  return l ? l.nama : 'Lapangan Tidak Dikenal'
}

// Form edit
const form = ref({
  id: null,
  tanggal: '',
  startTime: '',
  endTime: ''
})

const edit = (b) => {
  form.value = {
    id: b.id,
    tanggal: b.tanggal,
    startTime: b.startTime,
    endTime: b.endTime
  }
}

const batalEdit = () => {
  form.value = { id: null, tanggal: '', startTime: '', endTime: '' }
}

// Validasi jadwal bertabrakan
const isOverlap = (item) => {
  return booking.value.some(b =>
    b.id !== item.id &&
    b.lapanganId === item.lapanganId &&
    b.tanggal === item.tanggal &&
    !(
      item.endTime <= b.startTime || item.startTime >= b.endTime
    )
  )
}

// Submit update
const submitUpdate = async () => {
  const item = booking.value.find(b => b.id === form.value.id)
  if (!item) return

  const updated = {
    ...item,
    tanggal: form.value.tanggal,
    startTime: form.value.startTime,
    endTime: form.value.endTime
  }

  if (form.value.endTime <= form.value.startTime) {
    alert('❌ Jam selesai harus lebih besar dari jam mulai.')
    return
  }

  if (isOverlap(updated)) {
    alert('❌ Jadwal bentrok dengan booking lain.')
    return
  }

  try {
    await api.put(`/booking/${updated.id}`, updated)
    alert('✅ Booking diperbarui.')
    form.value.id = null
    await fetchData()
  } catch (err) {
    console.error(err)
    alert('❌ Gagal update booking.')
  }
}

// Hapus booking
const hapus = async (id) => {
  if (!confirm('Yakin ingin menghapus booking ini?')) return

  try {
    await api.delete(`/booking/${id}`)
    booking.value = booking.value.filter(b => b.id !== id)
    alert('✅ Booking berhasil dihapus.')
  } catch (err) {
    console.error(err)
    alert('❌ Gagal menghapus booking.')
  }
}

onMounted(fetchData)
</script>

<style scoped>
.input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.4rem 0.8rem;
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
