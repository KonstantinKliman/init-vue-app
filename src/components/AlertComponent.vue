<template>
  <v-alert
    :type="type"
    :text="message"
    class="mt-4 h-auto"
    v-if="show"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>