<template>
  <div class="login-page">
    <div class="login-card">
      <h2>🔐 Login to Your Account</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="form.username" placeholder="Email or Username" required />
        <input v-model="form.password" placeholder="Password" type="password" required />
        <button type="submit">Login</button>
        <p class="redirect">
          Don’t have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      // your login logic
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fdfdfd;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 0.7rem;
  background: #111;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #222;
}

.redirect {
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
