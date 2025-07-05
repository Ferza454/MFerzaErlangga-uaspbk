<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-1">
      <div class="container">
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #ecfdf5; /* Hijau pastel lembut */
  color: #1f2937;
  min-height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 1rem;
  padding-bottom: 2rem;
}

.container {
  max-width: 960px;
  margin: auto;
  padding: 0 1rem;
}
</style>
