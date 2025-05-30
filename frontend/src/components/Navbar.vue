<template>
  <nav class="navbar">
    <div class="logo" @click="goTo('/dashboard')">
      ⚡ EVCharge
    </div>

    <div class="hamburger" @click="toggleMenu">
      ☰
    </div>

    <ul :class="['nav-links', { active: showMenu }]">
      <li @click="goTo('/dashboard')">Dashboard</li>
      <li @click="goTo('/manage')">Manage</li>
      <li @click="goTo('/chargers')">View</li>
      <li @click="logout" class="logout-btn">Logout</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    goTo(path) {
      this.$router.push(path);
      this.showMenu = false;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1e1e2f;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.hamburger {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  cursor: pointer;
  transition: 0.3s;
}

.nav-links li:hover {
  text-decoration: underline;
}

.logout-btn {
  color: #f87171;
  font-weight: bold;
}

/* Mobile view */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    display: none;
    margin-top: 1rem;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li {
    padding: 0.5rem 0;
    border-top: 1px solid #444;
  }
}
</style>
