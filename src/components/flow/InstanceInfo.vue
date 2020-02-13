<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WorkflowService from '@/service/workflowService';
import { Event } from '@/types/workflow';

@Component
export default class FlowInstanceInfo extends Vue {
  @Prop() private instanceID!: number;
  private timeline: Event[] = [];

  private async getTimeline() {
    this.timeline = (
      await WorkflowService.getTimeline(Number(this.instanceID))
    ).timeline;
  }

  @Watch('instanceID')
  private onIDChanged() {
    this.getTimeline();
  }

  private mounted() {
    this.getTimeline();
  }
}
</script>

<style scoped></style>
