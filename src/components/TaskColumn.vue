<script setup>
  import Divider from 'primevue/divider';
  import TaskCard from '../components/TaskCard.vue';
  import { ref } from 'vue';
  import draggable from 'vuedraggable';
  const { tasks } = defineProps({
    tasks: {
    type: Array,
    default: [{title: 'TODO Task 1'},{title: 'InProgress Task 1'},{title: 'Done Task 1'}],
    },
    status: String,
  });
  const reactiveTasks = ref(tasks);
  const onMove = (event, originalEvent) => {
    console.log({event, originalEvent});
  }
  const onEnd = (event) => {
    console.log(event);
    event.item

  }
  </script>
<template>
  <div class="task-column">
      <h3> {{status}} </h3>
      <Divider />
      <draggable :list="reactiveTasks"  item-key="id" class="task-list" group="status" :move="onMove" @end="onEnd">
            <template #item="{element: task}">
              <TaskCard :title="task.title" :description="task.description" :key="task"/>
            </template>
      </draggable>
  </div>
</template>

<style scoped>
.task-column {
  height: 200px;
  width: 300px;
  max-width:300px;
  min-width:300px;
  border: 1px solid #ccc;
  height: 100%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}
.task-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
}

.calendar-input {
  border: 1px solid #ccc;
}
</style>
