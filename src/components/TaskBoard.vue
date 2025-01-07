<script setup>
import TaskColumn from '../components/TaskColumn.vue'
import {useUIStore} from '../stores/UIStore'
import {useUserStore} from '../stores/UserStore'
import {storeToRefs} from 'pinia'
import {refreshTasksList} from '../lib/utils'
import { ref,  watch, onMounted, computed} from 'vue'

const  UIStore = useUIStore();
const userStore = useUserStore();
const {currentProject} = storeToRefs(userStore);
const {tasks} = storeToRefs(UIStore);
console.log({tasks1: tasks.value});
const inProgressTasks = computed(() => tasks.value['In Progress']);
const doneTasks = computed(() =>tasks.value['Done']);
const toDoTasks = computed(() => tasks.value['To Do']);

watch(inProgressTasks, () => {
  console.log({inProgressTasks: inProgressTasks.value});
});

watch(currentProject, () => {
  refreshTasksList();
});

onMounted(() => {
  refreshTasksList();
});


</script>
<template>
  <div class="task-board">
    <div  class="flex gap-2">
      <TaskColumn :tasks="toDoTasks" status="To Do"></TaskColumn>
      <TaskColumn :tasks="inProgressTasks" status="In Progress"></TaskColumn>
      <TaskColumn :tasks="doneTasks" status="Done"></TaskColumn>
    </div>
  </div>
</template>
<style scoped>
.task-board {
  display: flex;
  gap: 1rem;
  height: 90vh;
}
</style>
