<template>
  <div>
    <b>actionDefineID:{{ actionDefineID }}</b>
    <br />
    actionDefine:{{ actionDefine }}
    <br />
    <b>workflowDefineID:{{ workflowDefineID }}</b>
    <br />
    workflowDefine:{{ workflowDefine }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import { ActionDefine } from '@/types/workflow';
import { Template } from '@/types/sheet';

@Component
export default class ActionDefineComponent extends Vue {
  @Prop({ default: () => '' }) actionDefineID!: string;
  @Prop({ default: () => '' }) workflowDefineID!: string;

  actionDefine: any = {};
  workflowDefine: any = {};
  async getActionDefine(id: string) {
    const rsp = await WorkflowService.getActionDefine(id);
    this.actionDefine = rsp.actionDefine;
  }
  async getWorkflowDefine(id: string) {
    // const rsp = await WorkflowService.getWorkflowDefine(id);
    // this.workflowDefine = rsp.workflowDefine;
  }

  @Watch('actionDefineID', { immediate: true })
  onActionDefineIDChanged() {
    this.getActionDefine(this.actionDefineID);
  }
  @Watch('workflowDefineID', { immediate: true })
  onWorkflowDefineIDChanged() {
    this.getWorkflowDefine(this.workflowDefineID);
  }

  async mounted() {
    // console.log('actionDefineID:', this.actionDefineID);
  }
}
</script>

<style scoped></style>
