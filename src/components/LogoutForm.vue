<script setup>
  import ConfirmDialog from 'primevue/confirmdialog';
  import Button from 'primevue/button';
  import {useAuthStore} from '../stores/AuthStore';
  import {useConfirm} from 'primevue/useconfirm'
  import  router from '../router';
  import {signoutRedirect} from '../auth/cognito';
  const authStore = useAuthStore()
  const confirm = useConfirm();

  const logoutConfirmation = () => {
  confirm.require({
    message: 'Are you sure you want to logout?',
    header: 'Logout Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      secondary: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Yes, Log me out',
      severity: 'danger',
    },
    accept: async () => {
      $cookies.remove('accessToken');
      $cookies.remove('idToken');
      $cookies.remove('refreshToken');
      await signoutRedirect();
    }
  })
  };
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <Button @click="logoutConfirmation()" label="Logout" severity="danger"></Button>
</template>
