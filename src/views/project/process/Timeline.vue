<template>
  <div>
    <dim-timeline
      v-if="taskList.length >= 1"
      :columnWidth="100"
      :taskList="taskList"
      style="height:calc(100vh - 100px)"
    ></dim-timeline>
    <v-container v-else fluid style="height:calc(100vh - 100px)">
      <v-layout justify-center align-center fill-height>
        <h3>暂无可用任务</h3>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Process, ProcessTask } from '@/types/process';
import TaskService from '@/service/taskService';

const processModule = namespace('process');

@Component({
  components: {}
})
export default class Timeline extends Vue {
  @processModule.Mutation('updateCurrentProcessTask')
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
::-webkit-scrollbar {
  display: block;
}
</style>
