<script setup>
  import Card from 'primevue/card';
  import {ref, onMounted} from 'vue'
  import CreateTaskForm from './CreateTaskForm.vue';
  import {useUIStore} from '../stores/UIStore';
  import {getTaskById} from '../lib/backendApi';
  import {useToast} from 'vue-toastification';
  const toast = useToast();
  const UIStore = useUIStore();
  const {title, description, id, assignee, priority, status} = defineProps({
    title: String,
    id: Number,
    description: String,
    assignee: Number,
    priority: Number,
    status: Number,

  });
  const {updateUIState} = UIStore;

  const handleCardClick = () => {
    console.log({id});
    updateUIState({showTaskCreationForm: true, selectedTask: {id, title, description, assignee, priority, status}});
  }
  </script>

<template>
  <Card class="card" @click="handleCardClick">
    <template #title > {{title}} </template>
    <template #content> {{description}} </template>
  </Card>

</template>


<style scoped>
.card {
  width: 100%;
  border: 1px solid black;
  border-radius: 1rem;
  min-height: 120px;
  max-height: 150px;
  padding: 0.5rem;
  cursor: pointer;
  background-color: white;
}


.card:hover {
  box-shadow: 0 0 10px
}
</style>
