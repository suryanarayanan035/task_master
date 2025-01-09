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
  import {getUsersOfProject, getTaskById, createTask, updateTaskById} from '../lib/backendApi.js';
  import Dropdown from 'primevue/dropdown';
  import {useToast} from 'vue-toastification';
  import {getCurrentProjectId, getKeyValuePairFromValue, TASK_STATUSES, TASK_PRIORITIES} from '../lib/utils.js';

  const toast = useToast();
  const userStore = useUserStore();
  const UIStore = useUIStore();
  const {selectedTask, showTaskCreationForm} = storeToRefs(UIStore);

  const title = ref(selectedTask.value.title);
  const description = ref(selectedTask.value.description);

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

  const status = ref(taskStatuses.value.filter((taskStatus) => taskStatus.value==selectedTask.status));
  const priority = ref(taskPriorities.value.filter((taskPriority) => taskPriority.value == selectedTask.priority));

  const assignee = ref(selectedTask.assignee);
  const id = ref(selectedTask.id);
  const loading = ref(true);
  const availableUsers = ref([]);

  const reactiveShowTaskCreationForm = ref(showTaskCreationForm);
  const fetchTaskDetails = async () => {
    const {task, error} = await getTaskById(id.value);
    if(error) {
      toast.error(`Something went wrong: ${error.message}`);
    } else {
      title.value = task.title;
      description.value = task.description;
      priority.value = task.priority;
      assignee.value = task.assignee;
      status.value = task.status;

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



  watch(reactiveShowTaskCreationForm, async(newVal) => {
    if(newVal) {
      loading.value = true;
      if(id.value) {
        await fetchTaskDetails();
      }
      await fetchProjectUsers();
      loading.value=false;

    }
  });

  watch(selectedTask, async(newVal) => {
    console.log({newVal});
    id.value = newVal.id;
    title.value = newVal.title;
    description.value = newVal.description;
    priority.value = newVal.priority;
    console.log({au: availableUsers.value.filter(({id}) => {console.log({id, newVal}); return id==newVal.assignee} )})
    status.value = newVal.status;
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

  const updateTaskInBackend = async () => {
    const {task, error} = await updateTaskById(id.value, title.value, description.value, status.value.value, assignee.value?.id, priority.value.value);
    if(error) {
      toast.error(`Something went wrong: ${error}`);
    } else {
      toast.success(`Task ${title} updated successfully`);
      UIStore.setShowTaskCreationForm(false);
    }
  }

  const createOrUpdateTask = () => {
    if(id.value) {
      updateTaskInBackend();
    } else {
      createTaskInBackend();
    }
  }

  const closeCallback = () => {
    UIStore.setShowTaskCreationForm(false);
    UIStore.setSelectedTask({});
  }
</script>
<template>

  <Dialog header="Create/Update Task" :visible="showTaskCreationForm" class="grid grid-cols-2 w-full p-4" position="top" pt:mask:class="backdrop-blur-sm bg-slate-500" :closeOnEscape="true">
    <div v-if="loading" class="text-center">
      <h1 class="text-3xl">Please wait while we fetch the information ...</h1>
    </div>
    <Form v-else @submit="createOrUpdateTask">
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


      <Button type="submit" :label="`${id ? 'Update' : 'Create' } Task`" icon="pi pi-plus" class="mr-2" />
      <Button type="Reset" label="Cancel" icon="pi pi-file-excel" @click="closeCallback" severity="secondary"/>
    </Form>
  </Dialog>
</template>
