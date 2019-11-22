<template>
  <v-snackbar :timeout="2000" top v-model="snackbar">
    {{ message }}
    <v-btn text :color="color" @click="snackbar = false">关闭</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  data: () => ({
    snackbar: false,
    message: '',
    color: ''
  }),
  methods: {
    show(message, color) {
      this.message = message;
      this.color = color;
      this.snackbar = true;
    }
  }
};
</script>

<style></style>
