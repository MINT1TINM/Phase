<template>
  <v-container fluid>
    <ActionInstanceComponent
      :actionInstanceID="'a8d42ade-2fb3-4598-b6fa-001effe63205'"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import { Instance, ActionDefine, ActionInstance } from '@/types/workflow';
import { Template } from '@/types/sheet';
import ActionInstanceComponent from '@/components/flow/action/InstanceDetail.vue';

const userModule = namespace('user');

@Component({
  components: {
    ActionInstanceComponent
  }
})
export default class ActionView extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  workflowDefineID: string = '';
  sheetTemplateID: string = '';
  actionInstance: ActionInstance[] = [];
  sheetTemplateInstance: Template = new Template();
  workflowInstance: any = {};
  content: string = '';

  async getWorkflowInstance() {
    // const rsp = await WorkflowService.getWorkflowList(1, 10, this.content);
    // this.workflowList = rsp.flow;
  }
  //   async getSheetTemplateList() {
  //     const rsp = await SheetService.getSheetTemplateList('', '');
  //     this.sheetTemplateList = rsp.template;
  //   }
  async updateActionDefine(ad: ActionDefine) {
    const rsp = await WorkflowService.updateActionDefine(ad);
  }
  async updateActionInstance(ai: ActionInstance) {
    const rsp = await WorkflowService.updateActionInstance(ai);
  }

  async mounted() {}
}
</script>

<style scoped></style>
