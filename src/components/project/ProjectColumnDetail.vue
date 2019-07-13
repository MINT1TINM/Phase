<template>
  <div>
    <v-toolbar flat class="navbar" dense>
      <v-tabs v-model="tab">
        <v-tab key="1">任务清单</v-tab>
        <v-tab key="2">项目设置</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon :to="`/dashboard/project`">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item key="1">
        <project-task-list></project-task-list>
      </v-tab-item>
      <v-tab-item key="2"></v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import projectTaskList from "./ProjectTaskList";
export default {
  components: {
    projectTaskList: projectTaskList
  },
  data() {
    return {
      tab: 0
    };
  }
};
</script>

<style>
</style>
