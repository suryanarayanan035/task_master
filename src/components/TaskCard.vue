<script setup>
  import Card from 'primevue/card';
  const {title, description, id} = defineProps({
    title: String,
    id: Number,
    description: String,
  });
  </script>

<template>
  <Card class="card" >
    <template #title> {{title}} </template>
    <template #content> {{description}} </template>
  </Card>

</template>


<style scoped>
.card {
  width: 100%;
  border: 1px solid black;
  border-radius: 1rem;
  min-height: 120px;
  max-height: 150px;
  padding: 0.5rem;
  cursor: pointer;
  background-color: white;
}


.card:hover {
  box-shadow: 0 0 10px
}
</style>
