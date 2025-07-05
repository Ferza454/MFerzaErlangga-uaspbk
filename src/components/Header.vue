<template>
  <header class="bg-green-700 text-white py-4 shadow">
    <div class="container flex justify-between items-center">
      <h1 class="text-xl font-bold">Booking Lapangan</h1>
      <nav class="space-x-4">
        <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
        <RouterLink to="/lapangan" class="nav-link">Lapangan</RouterLink>
        <RouterLink to="/jadwal" class="nav-link">Jadwal</RouterLink>
        <RouterLink v-if="isAdmin" to="/admin/lapangan" class="nav-link">Admin</RouterLink>
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
const isAdmin = localStorage.getItem('role') === 'admin'
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: white;
  font-weight: 500;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
