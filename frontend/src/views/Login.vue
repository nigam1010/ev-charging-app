<template>
  <div class="auth-container">
    <h2>🔐 Login to Your Account</h2>
    <form @submit.prevent="login">
      <input v-model="form.username" placeholder="Email or Username" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p class="switch">Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('/auth/login', this.form)
        localStorage.setItem('token', res.data.token)
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = 'Login failed'
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}
input {
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin: 0.5rem 0;
}
button {
  width: 100%;
  padding: 0.7rem;
  background-color: #1e1e2f;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 1rem;
}
.switch {
  margin-top: 1rem;
}
</style>
