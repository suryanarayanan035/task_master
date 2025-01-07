<script setup>
  import Menubar from 'primevue/menubar';
  import {RouterLink} from 'vue-router';
  import router from '../router';
  import LogoutForm from '../components/LogoutForm.vue';
  import {useAuthStore} from '../stores/AuthStore';
  import {useUserStore} from '../stores/UserStore';
  import {userManager} from '../auth/cognito';
  import {onMounted, ref, watch} from 'vue';
  import {storeToRefs} from 'pinia';
  import {getProjectsOfUser} from '../lib/backendApi';
  import {useToast} from 'vue-toastification';
  import Dropdown from 'primevue/dropdown';
  import {refreshTasksList} from '../lib/utils';

const toast = useToast();
const authStore = useAuthStore();
const userStore = useUserStore();

  const {email} = storeToRefs(authStore);
  const {availableProjects, currentProject} = storeToRefs(userStore);

  const navItems = ref([
                    {to: '/', label: 'Home', icon: 'pi pi-home', command: () => {router.push('/')}},
                    {to: '/tasks', label: 'Tasks', icon: 'pi pi-ticket', command: () => {router.push('/tasks')}},
                    {to: '/create_project', label: 'New Project', icon: 'pi pi-plus', command: () => {router.push('/create_project')}},
                    {to: '/users', label: 'Users', icon: 'pi pi-users', command: () => {router.push('/users')}},
                  ]);

  const setAvailableProjects = async(projects) => {
    userStore.setAvailableProjects(projects);
  }
  const authenticated = $cookies.get('idToken') != null;
       userManager.getUser().then((user) => {
        console.log({email: user?.profile.email});
        authStore.setEmail(user?.profile.email);
      });
  const handleProjectChange = (event) => {
    const {value} = event;
    console.log('project changed', {value:{...value}});
    userStore.setCurrentProject({...value});
  }

   userStore.$subscribe(async (state) => {
    const currentProjectId = state.events.target.currentProject?.id;
    if(currentProjectId)
    {
    localStorage.setItem('currentProjectId', currentProjectId);
    }

  });
  onMounted(async () => {
    if(authenticated){
      const {error, projects} = await getProjectsOfUser();
      if(error) {
        toast.error(`Something went wrong when fething projects of user: ${error}`);
      } else {
        setAvailableProjects(projects);
      }
      const currentProjectId = localStorage.getItem('currentProjectId');
      if(currentProjectId) {
        const project = projects.find((project) => project.id == currentProjectId);
        if(project) {
          userStore.setCurrentProject(project);
        }
      }
  }});
</script>

<template>
  <Menubar :model="navItems" v-if="authenticated==true">
    <template #item="{item}">
      <RouterLink  :to="item.to" class="flex gap-1 items-center">
        <i :class="item.icon"></i>
        <span>{{item.label}}</span>
      </RouterLink>
    </template>
    <template #end>
      {{email }}<Dropdown v-model="currentProject" :options="availableProjects" class="mr-2" optionLabel="name" placeholder="Select a Project" @change="handleProjectChange"/>
        <LogoutForm/>
    </template>
  </Menubar>
</template>
