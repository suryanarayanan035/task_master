<script setup>
  import Menubar from 'primevue/menubar';
  import Button from 'primevue/button';
  import {RouterLink} from 'vue-router';
  import router from '../router';
  import LogoutForm from '../components/LogoutForm.vue';
  import {useAuthStore} from '../stores/AuthStore';
  import {ref} from 'vue';

  const email = useAuthStore().email;

  const navItems = ref([
                    {to: '/', label: 'Home', icon: 'pi pi-home', command: () => {router.push('/')}},
                    {to: '/tasks', label: 'Tasks', icon: 'pi pi-tasks', command: () => {router.push('/tasks')}},
                  ]);
  const authenticated = $cookies.get('accessToken') != null;
  console.log({authenticated});
  if(!authenticated){
    navItems.value.push({to: '/login', label: 'Login', icon: 'pi pi-sign-in', command: () => {router.push('/login')}});
    }
</script>
<template>
  <Menubar :model="navItems">
  <template #item="{item}">
    <RouterLink  :to="item.to" class="flex gap-4">
      <i :class="item.icon"></i>
      <span>{{item.label}}</span>
    </RouterLink>
  </template>
  <template #end>
      <LogoutForm v-if="authenticated==true"/>
  </template>
  </Menubar>
</template>
