<template>
  <div>
    <v-toolbar flat class="navbar" dense style="z-index:2">
      <v-tabs v-model="tab">
        <v-tab :to="`/dashboard/project/${$route.params.projectId}/task`">任务清单</v-tab>
        <v-tab :to="`/dashboard/project/${$route.params.projectId}/settings`">项目设置</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
import taskList from "@/components/project/task/TaskList";
export default {
  components: {
    taskList: taskList
  },
  methods: {
    close() {
      this.$router.push({ path: "/dashboard/project" });
    }
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
