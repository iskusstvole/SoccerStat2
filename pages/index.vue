<template>
  <div>
    <Header />
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

router.replace({ name: "Competitions" });
</script>
