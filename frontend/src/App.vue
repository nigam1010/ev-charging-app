<template>
  <div id="app">
    <!-- Show Navbar only if not on login page -->
    <Navbar v-if="!isLoginPage" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();

    const isLoginPage = computed(() => route.path === '/login');

    return {
      isLoginPage
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background-color: #f4f4f4; /* 🧾 Luxury off-white */
  color: #222;
}

/* Optional: Soft background gradient for more luxury feel */
#app {
  background: linear-gradient(to bottom, #ffffff, #f4f4f4);
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
