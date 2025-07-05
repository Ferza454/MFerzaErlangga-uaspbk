import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

import Dashboard from '@/views/Dashboard.vue'
import LapanganList from '@/views/LapanganList.vue'
import BookingForm from '@/views/BookingForm.vue'
import JadwalUser from '@/views/Jadwal.vue'
import AdminLapangan from '@/views/admin/Lapangan.vue'
import AdminJadwal from '@/views/admin/Jadwal.vue'
import Login from '@/views/Login.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/lapangan', component: LapanganList },
  { path: '/booking/:id', component: BookingForm, props: true },
  { path: '/jadwal', component: JadwalUser },
  { path: '/login', component: Login },

  // Admin routes
  {
    path: '/admin/lapangan',
    component: AdminLapangan,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/jadwal',
    component: AdminJadwal,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard agar user biasa tidak bisa akses admin
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    next('/login')
  } else {
    next()
  }
})

export default router
