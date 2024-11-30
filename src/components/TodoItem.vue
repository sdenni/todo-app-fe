<template>
  <div class="todo-item">
    <input
      type="checkbox"
      v-model="todo.completed"
      @change="updateTodo"
    />
    <span v-if="!isEditing" :class="{ completed: todo.completed }">
      {{ todo.text }}
    </span>
    <input
      v-if="isEditing"
      v-model="editedTodoText"
      @keyup.enter="saveEdit"
      @blur="saveEdit"
      placeholder="Edit task"
    />
    <button @click="deleteTodo">Delete</button>
    <button v-if="!isEditing" @click="editTodo">Edit</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object,
    index: Number
  },
  data() {
    return {
      isEditing: false,
      editedTodoText: this.todo.text
    };
  },
  methods: {
    editTodo() {
      this.isEditing = true;
    },
    saveEdit() {
      if (this.editedTodoText.trim() !== '') {
        this.todo.text = this.editedTodoText;
        this.isEditing = false;
        this.$emit('update-todo', this.todo);
      }
    },
    updateTodo() {
      this.$emit('update-todo', this.todo);
    },
    deleteTodo() {
      this.$emit('delete-todo', this.index);
    }
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: grey;
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
button {
  margin-left: 10px;
}
</style>
