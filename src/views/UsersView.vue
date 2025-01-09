<script setup>
  import {getUsersOfProject, addUserToProject} from '../lib/backendApi';
  import {useToast} from 'vue-toastification';
  import {ref, watch, onMounted} from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import InputGroup from 'primevue/inputgroup';
  import InputGroupAddon from 'primevue/inputgroupaddon';
  import {Form} from '@primevue/forms';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Row from 'primevue/row';
  import {getCurrentProjectId} from '../lib/utils';
  import {useUserStore} from '../stores/UserStore';
  import {storeToRefs} from 'pinia';

const userStore = useUserStore();
const {currentProject} = storeToRefs(userStore);
  const toast = useToast();
  const users = ref([]);
  const email = ref('');
  const loading = ref(true);
  const updateUsers = async () => {
    const {error, users: usersFromApi} = await getUsersOfProject(getCurrentProjectId());
    if(error) {
      toast.error(`Error fetching users: ${error}`);
    } else {
    console.log({usersFromApi});
      users.value = usersFromApi;
    }
  }
  const addUser = async () => {
    const {error} = await addUserToProject(getCurrentProjectId(), email.value);
    if(error) {
      toast.error(`Error adding user: ${error}`);
    } else {
      toast.success(`User added successfully`);
      updateUsers();
    }
  }

  watch(currentProject, async () => {
    loading.value= true
    await updateUsers();
    loading.value=false
  });
  onMounted(async () => {
    await updateUsers();
    loading.value=false
  });
</script>
<template>
  <div v-if="loading==true" class="flex justify-center items-center h-full">
    <i class="pi pi-spin pi-spinner h-50 w-50"></i>
  </div>
  <div v-else class="flex flex-col gap-2">
    <DataTable :value="users">
      <Column field="id" header="ID"></Column>
      <Column field="email" header="Email"></Column>
    </DataTable>
    <Form class="flex gap-2">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user-plus"></i>
        </InputGroupAddon>
        <InputText placeholder="Email" v-model="email"/>
      </InputGroup>
      <Button label="Add User" @click="addUser"/>
    </Form>
  </div>
</template>
