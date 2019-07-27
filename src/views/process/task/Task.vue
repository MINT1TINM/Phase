<template>
  <div style="height:calc(100vh - 113px)">
    <v-layout fill-height>
      <v-flex xs3 class="inner-sidebar-withoutpadding">
        <task-list :processId="processId"></task-list>
      </v-flex>
      <v-flex xs9>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import taskList from "@/components/process/task/TaskList";
export default {
  components: {
    taskList: taskList
  },
  data() {
    return {};
  },
  computed: {
    processId: function() {
      return Number(this.$route.params.processId);
    }
  },
  mounted() {}
};
</script>

<style>
</style>
