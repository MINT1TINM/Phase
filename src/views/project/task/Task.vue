<template>
  <div style="height:calc(100vh - 113px)">
    <v-layout fill-height>
      <v-flex xs3 class="inner-sidebar-withoutpadding">
        <task-list :projectId="$route.params.projectId"></task-list>
      </v-flex>
      <v-flex xs9>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import taskList from "@/components/project/task/TaskList";
export default {
  components: {
    taskList: taskList
  },
  data() {
    return {};
  },

  mounted() {}
};
</script>

<style>
</style>
