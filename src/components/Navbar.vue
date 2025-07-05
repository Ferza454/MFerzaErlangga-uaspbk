<template>
  <nav class="navbar">
    <div class="container flex justify-between items-center py-3">
      <!-- Kiri: Brand -->
      <h2 class="text-xl font-bold brand-title">Booking Lapangan</h2>

      <!-- Kanan: Navigasi -->
      <div class="flex gap-2 items-center nav-menu">
        <RouterLink to="/dashboard" class="nav-link" active-class="active">Dashboard</RouterLink>
        <div class="separator"></div>

        <RouterLink to="/lapangan" class="nav-link" active-class="active">Lapangan</RouterLink>
        <div class="separator"></div>

        <RouterLink to="/jadwal" class="nav-link" active-class="active">Jadwal</RouterLink>

        <!-- Admin Menu -->
        <template v-if="auth.isAdmin">
          <div class="separator"></div>
          <RouterLink to="/admin/lapangan" class="nav-link" active-class="active">Admin Lapangan</RouterLink>
          <div class="separator"></div>
          <RouterLink to="/admin/jadwal" class="nav-link" active-class="active">Admin Jadwal</RouterLink>
        </template>

        <!-- Login/Logout -->
        <div class="separator"></div>
        <button v-if="auth.isLoggedIn" @click="logout" class="btn-secondary">Logout</button>
        <RouterLink v-else to="/login" class="btn-primary">Login</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background-color: #14532d; /* Hijau tua */
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.brand-title {
  color: #ffffff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
}

.nav-menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 10px;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.active {
  text-decoration: underline;
  font-weight: bold;
}

.separator {
  width: 1px;
  height: 18px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 6px;
}

.btn-primary,
.btn-secondary {
  color: white;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 4px;
  transition: background 0.2s;
  text-decoration: none;
}

.btn-primary {
  background-color: #1e40af; /* biru */
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #dc2626; /* merah */
  border: none;
}

.btn-secondary:hover {
  background-color: #b91c1c;
}
</style>
