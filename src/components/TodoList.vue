<template>
  <div>
    <TodoItem
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      :index="index"
      @update-todo="updateTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  components: { TodoItem },
  props: {
    todos: Array
  },
  methods: {
    updateTodo(todo) {
      this.$emit('update-todo', todo);
    },
    deleteTodo(index) {
      this.$emit('delete-todo', index);
    }
  }
}
</script>

<style scoped>
/* Custom styles for TodoList */
</style>
