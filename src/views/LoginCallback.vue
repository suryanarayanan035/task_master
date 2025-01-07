<template>
<div>
  Please wait while you are being redirected to the application...
</div>
</template>
<script setup>
    import { userManager } from "../auth/cognito.js";
    import router from '../router';
    import {useAuthStore} from '../stores/AuthStore';

    const authStore = useAuthStore();
    console.log($cookies)

    userManager.signinCallback().then(function (user) {
        authStore.setEmail(user.profile?.email);
        $cookies.set("accessToken", user.access_token, 60*60);
        $cookies.set("idToken", user.id_token, 60*60);
        $cookies.set("refreshToken", user.refresh_token, 60*60*24*5);
        window.location.href = "/";
    });
</script>
