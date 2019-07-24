<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black">简单了解</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn style="margin-right:-20px" icon :to="`/dashboard/project/${projectId}/task`">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="height:calc(100vh - 153px);overflow:scroll" color="transparent">
      <task-list :projectId="projectId"></task-list>
    </div>
  </div>
</template>

<script>
import taskList from "@/components/project/task/TaskList";
export default {
  components: {
    taskList: taskList
  },
  props: {
    projectId: Number
  },
  data() {
    return {
      taskList: [
        {
          id: 1,
          title: "test"
        },
        {
          id: 2,
          title: "test 2"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>
