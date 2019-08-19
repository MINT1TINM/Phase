<template>
  <dim-timeline :columnWidth="100" :taskList="taskList" style="height:calc(100vh - 100px)"></dim-timeline>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import dimTimeline from "@/plugins/dim-timeline/Main.vue";
import { namespace } from "vuex-class";
import { Process, ProcessTask } from "@/types/process";
import TaskService from "@/service/taskService";

const processModule = namespace("process");

@Component({
  components: {
    "dim-timeline": dimTimeline
  }
})
export default class Timeline extends Vue {
  @processModule.Mutation("updateCurrentProcessTask")
  private updateCurrentProcessTask: any;

  private taskList = [];
  private taskListShow = [];

  private async getTaskListManually() {
    const rsp = await TaskService.getTaskList(this.$route.params.processID);
    this.taskList = rsp.taskList;

    this.updateCurrentProcessTask({
      processID: this.$route.params.processID,
      taskList: rsp.taskList
    });
  }

  private mounted() {
    this.getTaskListManually();
  }
}
</script>

<style scoped>
</style>
