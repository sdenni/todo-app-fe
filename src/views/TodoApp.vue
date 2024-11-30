<template>
  <div class="todo-app">
    <h2>Todo List</h2>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Add a new todo"
      class="todo-input"
    />
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <TodoItem :todo="todo" :index="index" @update-todo="updateTodo" @delete-todo="deleteTodo" />
      </li>
    </ul>
  </div>
</template>

<script>
import TodoItem from '../components/TodoItem.vue';

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({
          text: this.newTodo,
          completed: false
        });
        this.newTodo = '';
      }
    },
    updateTodo(updatedTodo) {
      const index = this.todos.findIndex(todo => todo === updatedTodo);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.todo-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
