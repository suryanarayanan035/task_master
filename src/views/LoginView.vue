<script setup>
  import InputGroup from 'primevue/inputgroup';
  import InputGroupAddon from 'primevue/inputgroupaddon';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import {Form} from '@primevue/forms';
  import {reactive} from 'vue';
  import { useToast } from 'vue-toastification';
  import { userManager } from '../auth/cognito';
  const toast = useToast();
  const form = reactive({
    email: '',
    password: ''
  });

  const onSubmit = (e) => {
    if(form.email=='user@mail.com' && form.password=='password'){
      toast.success('Login Successful');
    } else {
      toast.error('Login Failed');
    }
  }

  const triggerCognitoAuthFlow = async () => {
    console.log('Triggering Cognito Flow');
    await userManager.signinRedirect();
    }
</script>
<template>
  <div class="gap-2 items-center mx-auto border border-black-500 self-center max-w-lg p-4">
    <h1 class="text-center text-3xl">
      <i class="pi pi-user">&nbsp;</i>
      <span class="mb-2 text-center">Login</span>
    </h1>
    </div>
    <div class="flex justify-center">
    <Button label="Sign in with Cognito" @click="triggerCognitoAuthFlow" class="w-1/2"></Button>
    </div>
</template>
