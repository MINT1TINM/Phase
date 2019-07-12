<template>
  <div>
    <v-toolbar flat class="navbar" dense>
      <v-btn icon :to="`/dashboard/project`">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-tabs right>
        <v-tab>任务</v-tab>
        <v-tab>项目</v-tab>
      </v-tabs>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
</style>
