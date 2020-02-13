<template>
  <div>
    <ProjectInfo
      v-if="linkTask.extraInfo && linkTask.extraInfo.type === 'project'"
      :instance="instance"
      :projectInfo="linkTask.extraInfo.project"
    ></ProjectInfo>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FlowLinkTask, Instance } from '@/types/workflow';
import WorkflowService from '@/service/workflowService';

import ProjectInfo from '@/components/flow/ProjectInfo.vue';

@Component({
  components: {
    ProjectInfo
  }
})
export default class FlowInstaceTaskInfo extends Vue {
  @Prop() private instance!: Instance;
  private linkTask: FlowLinkTask = new FlowLinkTask();

  private get instanceID() {
    return this.$route.params.instanceID;
  }

  private get taskID() {
    return this.$route.params.taskID;
  }

  private async getTask() {
    this.linkTask = (
      await WorkflowService.getLinkTask(
        Number(this.taskID),
        Number(this.instanceID)
      )
    ).linkTask;
  }

  @Watch('taskID')
  private onChanged() {
    this.getTask();
  }

  private mounted() {
    this.getTask();
  }
}
</script>

<style scoped></style>
