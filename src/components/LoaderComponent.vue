<template>
  <div class="loader-overlay">
    <v-progress-circular indeterminate color="green"></v-progress-circular>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
</style>