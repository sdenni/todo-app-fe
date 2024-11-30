<template>
  <div class="logout">
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { logout } from '../api'; // Import logout API function

export default {
  methods: {
    async handleLogout() {
      try {
        // Call logout API
        await logout();
        localStorage.removeItem('token'); // Remove token from localStorage
        this.$router.push('/login'); // Redirect to login page
      } catch (error) {
        alert('Logout failed: ' + error.response.data.message); // Display error if logout fails
      }
    }
  }
};
</script>

<style scoped>
/* Style for logout button */
</style>
