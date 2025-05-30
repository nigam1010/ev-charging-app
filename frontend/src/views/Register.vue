<template>
  <div class="auth-container">
    <h2>📝 Create Account</h2>
    <form @submit.prevent="register">
      <input v-model="form.username" placeholder="Username" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p class="switch">Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async register() {
      try {
        await axios.post('/auth/register', this.form)
        this.$router.push('/login')
      } catch (err) {
        this.error = err.response?.data?.msg || 'Registration failed'
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);
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
