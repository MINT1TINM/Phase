<template>
  <div>
    <b>actionInstanceID:{{ actionInstanceID }}</b>
    <br />
    actionInstance:{{ actionInstance }}
    <br />
    <FlowChartComponent :workflowDefine="workflowDefine" />

    <!-- <ActionDefineComponent :actionDefineID="actionDefineID"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import { Instance, ActionDefine, ActionInstance } from '@/types/workflow';
import { Template } from '@/types/sheet';
import ActionDefineComponent from '@/components/flow/action/DefineDetail.vue';
import FlowChartComponent from '@/components/flow/chart/FlowChart.vue';

@Component({
  components: {
    ActionDefineComponent,
    FlowChartComponent
  }
})
export default class ActionInstanceComponent extends Vue {
  @Prop({ default: () => '' }) actionInstanceID!: string;

  actionInstance: ActionInstance = new ActionInstance();
  actionDefineID: string = '';
  workflowDefineID: number = -1;
  actionDefine: any = {};
  workflowDefine: any = {};

  async getActionDefine(id: string) {
    const rsp = await WorkflowService.getActionDefine(id);
    this.actionDefine = rsp.actionDefine;
    this.workflowDefineID = this.actionDefine.flowID;
    this.getWorkflowDefine(this.workflowDefineID);
  }

  async getWorkflowDefine(id: number) {
    this.workflowDefine = await WorkflowService.getFlowDef(id);
  }

  async getActionInstance(id: string) {
    const rsp = await WorkflowService.getActionInstance(id);
    this.actionInstance = rsp.actionInstance;
    this.actionDefineID = this.actionInstance.actionDefineID;
    this.getActionDefine(this.actionDefineID);
  }

  async mounted() {
    await this.getActionInstance(this.actionInstanceID);
  }
}
</script>

<style scoped></style>
