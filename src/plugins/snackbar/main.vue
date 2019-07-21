<template>
  <v-snackbar :color="color" :timeout="2000" top v-model="snackbar">
    {{message}}
    <v-btn text @click="snackbar = false">关闭</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  data: () => ({
    snackbar: false,
    message: "",
    color: ""
  }),
  methods: {
    show(message) {
      this.message = message;
      this.snackbar = true;
    }
  }
};
</script>

<style>
</style>
