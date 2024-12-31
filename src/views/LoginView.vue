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
  <Form v-slot="$form" :initialValues="form" @submit="onSubmit">
  <InputGroup class="mb-1">
    <InputGroupAddon>
      <i class="pi pi-user"></i>
    </InputGroupAddon>
    <InputText v-model="form.email" placeholder="Email"/>
  </InputGroup>
  <InputGroup>
    <InputGroupAddon>
      <i class="pi pi-lock"></i>
    </InputGroupAddon>
    <InputText v-model="form.password" placeholder="Password" type="password"/>
  </InputGroup>
  <Button label="Login" icon="pi pi-lock" type="submit"/>
  </Form>
  <Button label="Sign in with Cognito" @click="triggerCognitoAuthFlow"></Button>
</template>
