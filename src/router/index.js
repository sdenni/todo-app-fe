import { createRouter, createWebHistory } from 'vue-router';
import TodoApp from '../views/TodoApp.vue'; 
import Login from '../views/Login.vue'; 
import Register from '../views/Register.vue';
import AppTodoBe from '../views/AppTodoBe.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: TodoApp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/todo-be',
    name: 'AppTodo',
    component: AppTodoBe
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
