<script setup>
import TaskColumn from '../components/TaskColumn.vue'
const tasks =
{
  todo: [{title: 'TODO Task 1', description: 'This is a task that needs to be done'},
          {title: 'TODO Task 2', description: 'This is another task that needs to be done'}
  ],
  done: [{title: 'Done Task 1', description: 'This is a task that is done'}],
  inProgress: [{title: 'InProgress Task 1', description: 'This is a task that is in progress'}]}
</script>
<template>
  <div class="task-board">
      <TaskColumn v-for="tasksList,status in tasks" :tasks="tasksList" :status="status" :key="status"></TaskColumn>
  </div>
</template>
<style scoped>
.task-board {
  display: flex;
  gap: 1rem;
  height: 90vh;
}
</style>
