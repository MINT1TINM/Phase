<template>
  <div>
    <v-toolbar flat class="navbar" dense style="z-index:2">
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
        <router-view></router-view>
      </v-tab-item>
      <v-tab-item key="2"></v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import taskList from "@/components/project/task/TaskList";
export default {
  components: {
    taskList: taskList
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
