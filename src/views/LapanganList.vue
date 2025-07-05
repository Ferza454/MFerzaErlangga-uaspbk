<script setup>
import { onMounted } from 'vue'
import { useLapanganStore } from '@/stores/useLapanganStore'

const store = useLapanganStore()

onMounted(() => {
  store.fetchLapangan()
})
</script>

<template>
  <div>
    <h2>Daftar Lapangan</h2>
    <ul>
      <li v-for="item in store.daftarLapangan" :key="item.id">
        <router-link :to="`/booking/${item.id}`">
          {{ item.nama }} - {{ item.lokasi }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
