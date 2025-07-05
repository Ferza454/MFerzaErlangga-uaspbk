<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Form Booking Lapangan</h2>

    <form @submit.prevent="submitForm" class="space-y-4 bg-gray-50 p-4 rounded shadow">
      <!-- Nama -->
      <input
        v-model="form.nama"
        type="text"
        placeholder="Nama"
        class="input w-full"
        ref="namaRef"
        @keydown.enter.prevent="focusNext('tanggalRef')"
      />

      <!-- Tanggal -->
      <input
        v-model="form.tanggal"
        type="date"
        class="input w-full"
        ref="tanggalRef"
        @keydown.enter.prevent="focusNext('startRef')"
      />

      <!-- Jam Mulai dan Selesai -->
      <div class="flex gap-2">
        <input
          v-model="form.startTime"
          type="time"
          class="input w-full"
          ref="startRef"
          @keydown.enter.prevent="focusNext('endRef')"
        />
        <input
          v-model="form.endTime"
          type="time"
          class="input w-full"
          ref="endRef"
          @keydown.enter.prevent="submitForm"
        />
      </div>

      <button type="submit" class="btn-primary w-full">Booking Sekarang</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/api'

const route = useRoute()
const router = useRouter()

const form = ref({
  nama: '',
  tanggal: '',
  startTime: '',
  endTime: ''
})

const bookingList = ref([])

// Refs untuk navigasi enter
const namaRef = ref(null)
const tanggalRef = ref(null)
const startRef = ref(null)
const endRef = ref(null)

const focusNext = (refName) => {
  if (refName === 'tanggalRef') tanggalRef.value?.focus()
  else if (refName === 'startRef') startRef.value?.focus()
  else if (refName === 'endRef') endRef.value?.focus()
}

const fetchBooking = async () => {
  const res = await api.get('/booking')
  bookingList.value = res.data
}

const isOverlap = () => {
  return bookingList.value.some(b =>
    b.lapanganId === route.params.id &&
    b.tanggal === form.value.tanggal &&
    !(
      form.value.endTime <= b.startTime || form.value.startTime >= b.endTime
    )
  )
}

const submitForm = async () => {
  const { nama, tanggal, startTime, endTime } = form.value

  if (!nama || !tanggal || !startTime || !endTime) {
    alert('❌ Semua kolom harus diisi.')
    return
  }

  if (endTime <= startTime) {
    alert('❌ Jam selesai harus lebih besar dari jam mulai.')
    return
  }

  if (isOverlap()) {
    alert('❌ Jadwal bentrok dengan booking lain.')
    return
  }

  try {
    const newBooking = {
      ...form.value,
      lapanganId: route.params.id
    }

    await api.post('/booking', newBooking)

    // Simpan nama user di localStorage
    localStorage.setItem('username', form.value.nama)

    alert('✅ Booking berhasil.')
    router.push('/jadwal')
  } catch (err) {
    console.error(err)
    alert('❌ Gagal booking.')
  }
}

onMounted(() => {
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
</style>
