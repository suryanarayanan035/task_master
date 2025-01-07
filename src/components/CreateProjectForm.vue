<script setup>
  import {Form} from '@primevue/forms';
  import InputText from 'primevue/inputtext';
  import InputGroupAddon from 'primevue/inputgroupaddon';
  import InputGroup from 'primevue/inputgroup';
  import Button from 'primevue/button';
  import {ref} from 'vue';
  import {useToast} from 'vue-toastification';
  import {createProjectApi} from '../lib/backendApi';
  import {useUserStore} from '../stores/UserStore';
  const userStore  = useUserStore();

  const toast = useToast();
  const projectName = ref('');
  const createProject = async () => {
    const {error, project} = await createProjectApi(projectName.value);
    if(error){
      toast.error(`Something went wrong: ${error}`);
    } else {
      toast.success(`Project ${project.name} created successfully`);
      localStorage.setItem('currentProject', project.id);
      userStore.setCurrentProject(project);
      window.location.reload();
    }
  }

</script>

<template>
  <div>
  <Form @submit="createProject">
    <InputGroup class="mb-2">
      <InputGroupAddon>
        <i class="pi pi-book"></i>
      </InputGroupAddon>
      <InputText v-model="projectName" placeholder="Project Name" />
    </InputGroup>
    <Button type="submit" label="Create Project" icon="pi pi-plus" />
  </Form>
  </div>
</template>
