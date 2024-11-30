<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <code>task backend-1 harus aktif dulu di localhost:8000 atau sesuaikan konfig secara manual</code><br/><br/>
      <div>
        <label for="email">Email</label>
        <input type="text" v-model="email" id="email" placeholder="Enter your email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" placeholder="Enter your password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import { login } from '../api'; // Import login API function

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login({ email: this.email, password: this.password });
        
        const { token, user } = response.data;
        
        localStorage.setItem('token', token); 
        localStorage.setItem('user_id', user.id); 
        
        this.$router.push('/todo-be'); 
      } catch (error) {
        alert('Login failed: ' + error.response.data.message); 
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
form div {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
