<template>
  <v-container fluid>
    <div>chart nodeList: {{ nodeList }}</div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import { ActionDefine, Flow } from '@/types/workflow';
import { Template } from '@/types/sheet';
import SheetTemplatePreview from '@/components/sheet/Preview.vue';

@Component
export default class FlowChartComponent extends Vue {
  @Prop({ default: () => [] }) flowNode!: any[];
  @Prop({ default: () => {} }) workflowDefine!: {};
  @Prop({ default: () => '' }) currentNodeID!: string;

  nodeList: any[] = [];

  @Watch('flowNode', { immediate: true })
  getNodeIdList(procdef: any) {
    var node = JSON.parse(procdef.resource || '{}');
    var nodeIdList = [];
    while (node) {
      console.log(node);
      nodeIdList.push({
        name: node.name,
        nodeID: node.nodeId,
        type: node.type
      });
      node = node.childNode;
    }
    return nodeIdList;
  }

  @Watch('workflowDefine', { immediate: true })
  onWorkflowDefinChanged() {
    this.nodeList = this.getNodeIdList(this.workflowDefine);
  }
  @Watch('flowNode', { immediate: true })
  onFlowNodeChanged() {
    this.nodeList = this.flowNode;
  }

  async mounted() {
    // console.log('actionDefineID:', this.actionDefineID);
  }
}
</script>

<style scoped></style>
