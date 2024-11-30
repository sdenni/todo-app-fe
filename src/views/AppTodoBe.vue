<template>
  <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />

  <div v-if="isLoggedIn" class="container">
    <div class="app-todo">
      <h1>Todo App Backend Integration</h1>
      <button class='btn-danger' @click="handleLogout">Logout</button>
      <h2>Create a New Task</h2>
      <form @submit.prevent="createTask">
        <div>
          <label for="title">Title</label>
          <input id='title' v-model="newTask.title" placeholder="Title" required />
        </div>
        
        <div>
          <label for="description">Description</label>
          <textarea id='description' v-model="newTask.description" placeholder="Description"></textarea>
        </div>
        
        <div>
          <label for="status">Status</label>
          <select id='status' v-model="newTask.status">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <label for="status">Deadline ?</label>
          <input id='status' type="datetime-local" v-model="newTask.deadline" />
        </div>
  
        <button type="submit">Create Task</button>
        
      </form>
    </div>
    
    <div class='task-container'>
        <h2>Task List</h2>
        <ul class="task-list">
          <li v-for="task in tasks" :key="task.id" class="task-item">
            <div class="task-info">
              <h4>{{ task.title }}</h4>
              <p>Status: <span class="status">{{ task.status }}</span></p>
            </div>
            <div class="task-actions">
              <button class="btn btn-sm btn-primary" @click="viewTask(task.id)">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
  
      <!-- Popup for Task Details -->
      <div v-if="showPopup" class="overlay">
        <div class="popup">
          <h2>Task Details</h2>
          <form @submit.prevent="updateTask">
          
            <div>
              <label for="title">Title</label>
              <input v-model="selectedTask.title" placeholder="Title" required />
            </div>
            
            <div>
              <label for="description">Description</label>
              <textarea v-model="selectedTask.description" placeholder="Description"></textarea>
            </div>
            
            <div>
              <label for="status">Status</label>
              <select v-model="selectedTask.status">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label for="status">Deadline ?</label>
              <input type="datetime-local" v-model="selectedTask.deadline" />
            </div>
      
            <button class="btn btn-sm btn-warning" type="submit">Update Task</button><br/>
            <button class="btn btn-sm btn-secondary" type="button" @click="closePopup">Close</button>
            
          </form>
        </div>
      </div>
  </div>
  
  <div v-else>
    <p>You are not logged in. Please <router-link to="/login">Login</router-link>.</p>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('token'),
      tasks: [],
      newTask: {
        title: '',
        description: '',
        status: 'pending',
        deadline: null,
        user_id: localStorage.getItem('user_id'),
      },
      selectedTask: null,
      showPopup: false
    };
  },
  methods: {
    // Fetch all tasks
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.tasks = response.data;
      } catch (error) {
        alert('Failed to fetch tasks: ' + error.response.data.message);
      }
    },
    // View a single task (popup)
    async viewTask(id) {
      try {
        const response = await axios.get(`http://localhost:8000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.selectedTask = response.data;
        this.showPopup = true;
      } catch (error) {
        alert('Failed to fetch task: ' + error.response.data.message);
      }
    },
    // Create a new task
    async createTask() {
      try {
        await axios.post('http://localhost:8000/api/tasks', this.newTask, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Task created successfully!');
        this.newTask = {
          title: '',
          description: '',
          status: 'pending',
          deadline: null
        };
        this.fetchTasks(); // Refresh task list
      } catch (error) {
        alert('Failed to create task: ' + error.response.data.message);
      }
    },
    // Update an existing task
    async updateTask() {
      try {
        await axios.put(`http://localhost:8000/api/tasks/${this.selectedTask.id}`, this.selectedTask, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        // alert('Task updated successfully!');
        this.closePopup();
        this.fetchTasks(); // Refresh task list
      } catch (error) {
        alert('Failed to update task: ' + error.response.data.message);
      }
    },
    // Delete a task
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Task deleted successfully!');
        this.fetchTasks(); // Refresh task list
      } catch (error) {
        alert('Failed to delete task: ' + error.response.data.message);
      }
    },
    // Close popup
    closePopup() {
      this.showPopup = false;
      this.selectedTask = null;
    },
    // Logout and clear token
    handleLogout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.fetchTasks();
    }
  }
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1001; 
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
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

.container {
  display: flex;
  gap: 20px; /* Spasi antara elemen */
  padding: 20px;
}

.app-todo {
  flex: 1;
  max-width: 700px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-container {
  flex: 2;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.task-container h2 {
  margin-bottom: 20px;
}

.task-container ul {
  list-style-type: none;
  padding: 0;
}

.task-container li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-container button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-container button:hover {
  background-color: #e64a19;
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 14px;
}
.btn-danger {
  background-color: red;
}
.btn-warning {
  background-color: #ffc107;
  color: #000;
}
.btn-secondary {
  background-color: #ccc;
  color: #000;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Task Information */
.task-info h4 {
  margin: 0;
  font-size: 18px;
}

.task-info p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.status {
  font-weight: bold;
  color: #4CAF50; /* Green for better readability */
}

/* Action Buttons */
.task-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #b02a37;
}
</style>

