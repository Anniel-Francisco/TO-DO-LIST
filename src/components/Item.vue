<script setup>
const props = defineProps({
  state: String,
  exercise: String,
});
</script>
<template>
  <div
    class="flex items-center mt-4 transition-all hover:shadow-lg p-5 min-w-full justify-between h-14"
    :class="state === 'Done' ? 'bg-green-300' : 'bg-red-300'"
  >
    <div>
      <span> {{ exercise }} - {{ state }} </span>
    </div>
    <!-- For icons -->
    <slot />
  </div>
</template>
