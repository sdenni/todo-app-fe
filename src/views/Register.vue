<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <code>task backend-1 harus aktif dulu di localhost:8000 atau sesuaikan konfig secara manual</code><br/><br/>
      <div>
        <label for="name">Name</label>
        <input type="text" v-model="name" id="name" placeholder="Enter your name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" placeholder="Enter your email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" placeholder="Enter your password" required />
      </div>
      <div>
        <label for="password_confirmation">Confirm Password</label>
        <input type="password" v-model="password_confirmation" id="password_confirmation" placeholder="Confirm your password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { register } from '../api'; // Import register API function

export default {
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await register({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        alert('Registration successful! Please log in.');
        this.$router.push('/login');
      } catch (error) {
        alert('Registration failed: ' + error.response.data.message);
      }
    }
  }
};
</script>

<style scoped>
.register {
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
