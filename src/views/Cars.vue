<template>
  <div>
    <h2>Cars</h2>
    <LoaderVue v-if="showLoader" />
    <div
      v-else
      class="flex flex-column gap-3"
    >
      <Card
        v-for="(car, i) in cars"
        :key="i"
      >
        <template #title>
          {{ car.name }}
        </template>
        <template #subtitle>
          {{ car.type }}
        </template>
      </Card>
    </div>
  </div>
</template>
<script setup>
import LoaderVue from '@/components/LoaderVue.vue';
import {ref, onMounted} from 'vue';
import axiosApiInstance from '../api.js';
import Card from 'primevue/card';

const cars = ref();
const showLoader = ref(false);

const getAllCars = async () => {
  showLoader.value = true;
  try {
    const res = await axiosApiInstance.get(
      `https://jwt-vue3-6b844-default-rtdb.europe-west1.firebasedatabase.app/cars.json`
    );
    cars.value = res.data;
  } catch (e) {
    console.log(e.response);
  } finally {
    showLoader.value = false;
  }
};

onMounted(async () => getAllCars());
</script>
<style scoped></style>
