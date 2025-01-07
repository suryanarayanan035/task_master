<script setup>
  import {getUsersOfProject, addUserToProject} from '../lib/backendApi';
  import {useToast} from 'vue-toastification';
  import {ref} from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import InputGroup from 'primevue/inputgroup';
  import InputGroupAddon from 'primevue/inputgroupaddon';
  import {Form} from '@primevue/forms';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Row from 'primevue/row';
  import {getCurrentProjectId} from '../lib/utils';

  const toast = useToast();
  const users = ref([]);
  const email = ref('');
  const updateUsers = async () => {
    const {error, users: usersFromApi} = await getUsersOfProject(getCurrentProjectId());
    if(error) {
      toast.error(`Error fetching users: ${error}`);
    } else {
    console.log({usersFromApi});
      users.value = usersFromApi;
    }
  }
  updateUsers();

  const addUser = async () => {
    const {error} = await addUserToProject(getCurrentProjectId(), email.value);
    if(error) {
      toast.error(`Error adding user: ${error}`);
    } else {
      toast.success(`User added successfully`);
      updateUsers();
    }
  }
</script>
<template>
  <div class="flex flex-col gap-2">
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
