<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Manajemen Jadwal Booking</h2>

    <div v-if="booking.length === 0" class="text-gray-500">Belum ada booking yang terdaftar.</div>

    <ul class="space-y-4">
      <li
        v-for="b in booking"
        :key="b.id"
        class="flex justify-between items-center bg-white p-4 border rounded shadow"
      >
        <div>
          <div class="font-semibold text-blue-800 text-lg">
            {{ getLapanganName(b.lapanganId) }}
          </div>
          <div class="text-gray-800">
            <strong>{{ b.nama }}</strong><br />
            {{ b.tanggal }} | {{ b.startTime }} - {{ b.endTime }}
          </div>
        </div>
        <button class="btn-danger" @click="hapusBooking(b.id)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api'

const booking = ref([])
const lapangan = ref([])

const fetchData = async () => {
  try {
    const resBooking = await api.get('/booking')
    booking.value = resBooking.data

    const resLapangan = await api.get('/lapangan')
    lapangan.value = resLapangan.data
  } catch (err) {
    console.error('❌ Gagal fetch data booking/lapangan:', err)
  }
}

const getLapanganName = (id) => {
  const l = lapangan.value.find(l => Number(l.id) === Number(id))
  return l ? l.nama : 'Lapangan Tidak Dikenal'
}

const hapusBooking = async (id) => {
  if (!confirm('Yakin ingin menghapus booking ini?')) return

  try {
    await api.delete(`/booking/${id}`)
    booking.value = booking.value.filter(b => b.id !== id)
    alert('✅ Booking berhasil dihapus.')
  } catch (err) {
    console.error('❌ Gagal hapus booking:', err)
    alert('❌ Terjadi kesalahan saat menghapus booking.')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.btn-danger {
  background-color: #dc2626;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 0.375rem;
  font-weight: bold;
}
</style>
