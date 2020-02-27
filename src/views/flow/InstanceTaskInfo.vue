<template>
  <div>
    <ProjectInfo
      v-if="linkTask.extraInfo && linkTask.extraInfo.type === 'project'"
      :instance="instance"
      @updateTimeline="$emit('updateTimeline')"
      :projectInfo="linkTask.extraInfo.project"
      :comment="linkTask.extraInfo.comment"
      :hasAccess="hasAccess"
    ></ProjectInfo>

    <AssignAudit
      v-if="linkTask.extraInfo && linkTask.extraInfo.type === 'assignment'"
      :instance="instance"
      @updateTimeline="$emit('updateTimeline')"
      :projectInfo="linkTask.extraInfo.project"
      :comment="linkTask.extraInfo.comment"
      :hasAccess="hasAccess"
    ></AssignAudit>

    <ProjectTrack
      v-if="linkTask.extraInfo && linkTask.extraInfo.type === 'track'"
      :instance="instance"
      @updateTimeline="$emit('updateTimeline')"
      :track="linkTask.extraInfo.track"
      :comment="linkTask.extraInfo.comment"
      :hasAccess="hasAccess"
    ></ProjectTrack>

    <ProjectMeeting
      v-if="linkTask.extraInfo && linkTask.extraInfo.type === 'meeting'"
      :instance="instance"
      @updateTimeline="$emit('updateTimeline')"
      :meeting="linkTask.extraInfo.meeting"
      :comment="linkTask.extraInfo.comment"
      :hasAccess="hasAccess"
    ></ProjectMeeting>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FlowLinkTask, Instance } from '@/types/workflow';
import WorkflowService from '@/service/workflowService';

import ProjectInfo from '@/components/flow/ProjectInfo.vue';
import AssignAudit from '@/components/flow/AssignAudit.vue';
import ProjectTrack from '@/components/flow/Track.vue';
import ProjectMeeting from '@/components/flow/Meeting.vue';

import CompanyService from '@/service/companyService';

@Component({
  components: {
    ProjectInfo,
    AssignAudit,
    ProjectTrack,
    ProjectMeeting
  }
})
export default class FlowInstaceTaskInfo extends Vue {
  @Prop() instance!: Instance;
  @Prop() hasAccess!: boolean;
  linkTask: FlowLinkTask = new FlowLinkTask();

  get instanceID() {
    return this.$route.params.instanceID;
  }

  get taskID() {
    return this.$route.params.taskID;
  }

  async getTask() {
    this.linkTask = (
      await WorkflowService.getLinkTask(
        Number(this.taskID),
        Number(this.instanceID)
      )
    ).linkTask;
  }

  @Watch('taskID')
  onChanged() {
    this.getTask();
  }

  mounted() {
    this.getTask();
  }
}
</script>

<style scoped></style>
