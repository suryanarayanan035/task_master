<script setup>
  import CreateProjectForm from '../components/CreateProjectForm.vue';
  import createProjectImage from '../assets/create-project.png';
</script>

<template>
  <div class="flex items-center mb-2 flex-col gap-1">
    <h1 class="text-3xl text-black">Create A Project</h1>
    <img :src="createProjectImage" alt="project-management-image" class="w-100 h-48"/>
    <h3 class="text-xl text-slate-400">Seem's like you don't have any projects, So let's create one</h3>
  </div>
  <CreateProjectForm/>
</template>
