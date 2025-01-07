<script setup>
  import Divider from 'primevue/divider';
  import Button from 'primevue/button';
  import TaskCard from '../components/TaskCard.vue';
  import { ref, watch, computed } from 'vue';
  import draggable from 'vuedraggable';
  import {useUIStore} from '../stores/UIStore';
  import {updateTaskById} from '../lib/backendApi';
  import {useToast} from 'vue-toastification';
  import {TASK_STATUSES_NUMBER_MAPPING} from '../lib/utils';
  const toast = useToast();
  const UIStore = useUIStore();
  const props = defineProps({
    tasks: {
    type: Array,
    required: true,
    },
    status: String,
  });
  const reactiveTasks = computed(() => props.tasks);


  const onMove = (event, originalEvent) => {
    console.log({event, originalEvent});
  }
  const onEnd = (event) => {
    console.log(event);
    event.item
  }

  const onChange = async (event) => {
    console.log('Change', event, props.status);
    if(event.added) {
      const {id, title, description, assignee} = event.added.element;
      const {error} = await updateTaskById(id, title, description,TASK_STATUSES_NUMBER_MAPPING[props.status], assignee);
      if(error) {
        toast.error('Error updating task' +  error);
      }


    }
  }
  const openTaskCreationForm = () => {
    UIStore.setSelectedTask({});
    UIStore.setShowTaskCreationForm(true);
  }
  </script>
<template>
  <div class="task-column">
      <draggable :list="reactiveTasks"  item-key="id" class="task-list" group="status" @move="onMove" @end="onEnd" @change="onChange">
        <template #header>
            <div class="pl-2 uppercase pt-1">
              <h3 class="text-xl"> {{status}} </h3>
            </div>
            <Divider />
        </template>
        <template #item="{element: task}">
          <TaskCard :title="task.title" :id="task.id" :description="task.description" :key="task"/>
        </template>
        <template #footer>
          <Button label="Add Task" @click="openTaskCreationForm"/>
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
