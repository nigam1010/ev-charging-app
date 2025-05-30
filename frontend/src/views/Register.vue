<template>
  <div class="page-wrapper">
    <div class="auth-container">
      <h2>📝 Create Account</h2>
      <form @submit.prevent="register">
        <input v-model="form.username" placeholder="Username" required />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p class="switch">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'RegisterView',
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
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9f9f9;
}

.auth-container {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.7rem;
  margin-top: 1rem;
  background-color: #1e1e2f;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #2e2e4f;
}

.error {
  color: red;
  margin-top: 1rem;
  font-size: 0.95rem;
}

.switch {
  margin-top: 1.2rem;
  font-size: 0.95rem;
}
</style>
