<script setup>
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import {Form} from '@primevue/forms';
  import InputGroup from 'primevue/inputgroup';
  import Button from 'primevue/button';
  import {useUserStore} from '../stores/UserStore';
  import {useUIStore} from '../stores/UIStore';
  import {storeToRefs} from 'pinia';
  import {ref, onUpdated, watch, computed} from 'vue';
  import {getUsersOfProject, getTaskById, createTask} from '../lib/backendApi.js';
  import Dropdown from 'primevue/dropdown';
  import {useToast} from 'vue-toastification';
  import {getCurrentProjectId} from '../lib/utils.js';

  const toast = useToast();
  const userStore = useUserStore();
  const UIStore = useUIStore();
  const {selectedTask, showTaskCreationForm} = storeToRefs(UIStore);
  console.log({selectedTask: selectedTask.value});

  const title = ref(selectedTask.value.title);
  const description = ref(selectedTask.value.description);
  const priority = ref(selectedTask.value.priority);
  const assignee = ref(selectedTask.assignee);
  const status = ref(selectedTask.status);
  const id = computed(() => selectedTask.id);
  const loading = ref(true);
  const availableUsers = ref([]);

  const reactiveShowTaskCreationForm = ref(showTaskCreationForm);
  const fetchTaskDetails = async () => {
    const {task, error} = await getTaskById(id.value);
    if(error) {
      toast.error(`Something went wrong: ${error.message}`);
    } else {
      UIStore.setSelectedTask(task);
    }
  };

  const fetchProjectUsers = async() => {
    const {users, error} = await getUsersOfProject(localStorage.getItem('currentProjectId'));
    if(error) {
      toast.error(`Something went wrong: ${error}`);
    } else {
      availableUsers.value = users;
    }
  }

  const taskStatuses = ref([
    {label: 'To Do', value: 0},
    {label: 'In Progress', value: 1},
    {label: 'Done', value: 2},
  ]);

  const taskPriorities = ref([
    {label: 'Low', value: 0},
    {label: 'Medium', value: 1},
    {label: 'High', value: 2},
  ]);




  watch(reactiveShowTaskCreationForm, async(newVal) => {
    if(newVal) {
      loading.value = true;
      if(id.value) {
        await fetchTaskDetails();
        await fetchProjectUsers();
      }
      loading.value=false;

    }
  });
  watch(id, async(newVal) => {
  console.log({newVal})
    if(newVal) {
      loading.value = true;
      await  fetchTaskDetails();
    }
    loading.value = false;
  });


  const createTaskInBackend = async () => {
    console.log({assignee: assignee.value.id});
    const {task, error} = await createTask(title.value, description.value, getCurrentProjectId(), assignee.value.id, priority.value.value, status.value.value);
    if(error) {
      toast.error(`Something went wrong: ${error}`);
    } else {
      toast.success(`Task ${task.title} created successfully`);
      UIStore.setShowTaskCreationForm(false);
    }
  }
  onUpdated(async () => {
    if(id.value) {
      loading.value = true;
      await fetchTaskDetails();
    }
    loading.value = false;
  });
  const closeCallback = () => {
    UIStore.setShowTaskCreationForm(false);
  }
</script>
<template>

  <Dialog header="Create Task" :visible="showTaskCreationForm" class="grid grid-cols-2 w-full p-4" position="top" pt:mask:class="backdrop-blur-sm bg-slate-500" :closeOnEscape="true">
    <div v-if="loading" class="text-center">
      <h1 class="text-3xl">Please wait while we fetch the information ...</h1>
    </div>
    <Form v-else @submit="createTaskInBackend">
      <InputGroup class="mb-2">
        <InputText v-model="title" placeholder="Task Title" />
      </InputGroup>
      <InputGroup class="mb-2">
        <Textarea v-model="description" placeholder="Task Description" rows="10" class="w-full"/>
      </InputGroup>
      <InputGroup class="mb-2">
        <Dropdown v-model="assignee" :options="availableUsers" optionLabel="email" placeholder="Assignee" class="mb-2" />
      </InputGroup>
      <InputGroup class="mb-2">
        <Dropdown v-model="status" :options="taskStatuses" optionLabel="label" placeholder="Task Status" class="mb-2" />
      </InputGroup>

      <InputGroup class="mb-2">
        <Dropdown v-model="priority" :options="taskPriorities" optionLabel="label" placeholder="Task Priority" class="mb-2" />
      </InputGroup>


      <Button type="submit" label="Create Task" icon="pi pi-plus" class="mr-2" />
      <Button type="Reset" label="Cancel" icon="pi pi-file-excel" @click="closeCallback" severity="secondary"/>
    </Form>
  </Dialog>
</template>
