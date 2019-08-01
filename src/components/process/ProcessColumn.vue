<template>
  <v-card flat color="grey lighten-3">
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black text-uppercase">{{processName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn x-small icon :to="`/project/process/${processId}/timeline`">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="height:calc(100vh - 225px);overflow:auto" color="transparent">
      <task-list :processId="processId"></task-list>
    </div>
  </v-card>
</template>

<script>
import taskList from "@/components/process/task/TaskList";
export default {
  components: {
    taskList: taskList
  },
  props: {
    processId: Number,
    processName: String
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
