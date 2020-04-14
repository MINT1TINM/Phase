<template>
  <v-container fluid>
    <v-text-field v-model="workflowDefineID" />sheetTemplateID:
    <v-text-field v-model="sheetTemplateID" />
    <v-btn @click="createActionDefine">新增ActionDefine</v-btn>
    <p>
      <b>actionDefineList:</b>
    </p>
    <p v-for="(item, i) in actionDefineList" :key="'actionDefineList' + i">
      {{ i }}: {{ item }}
    </p>
    <p>
      <b>workflowList:</b>
    </p>
    <p v-for="(item, i) in workflowList" :key="'workflowListList' + i">
      {{ i }}: {{ item }}
    </p>
    <p>
      <b>sheetTemplateList:</b>
    </p>
    <p v-for="(item, i) in sheetTemplateList" :key="'sheetTemplateList' + i">
      {{ i }}: {{ item }}
    </p>
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
import ActionInstanceComponent from '@/components/flow/action/ActionInstance.vue';

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
  actionDefineList: ActionDefine[] = [];
  actionInstance: ActionInstance[] = [];
  sheetTemplateList: Template[] = [];
  workflowList: any[] = [];
  content: string = '';
  async getActionDefineList() {
    const rsp = await WorkflowService.getActionDefineList();
    this.actionDefineList = rsp.actionDefineList;
  }
  async getActionInstanceList() {
    const rsp = await WorkflowService.getActionInstanceList();
    this.actionDefineList = rsp.actionInstanceList;
  }
  async getWorkflowList() {
    const rsp = await WorkflowService.getWorkflowList(1, 10, this.content);
    this.workflowList = rsp.flow;
  }
  async getSheetTemplateList() {
    const rsp = await SheetService.getSheetTemplateList('', '');
    this.sheetTemplateList = rsp.template;
  }
  async updateActionDefine(ad: ActionDefine) {
    const rsp = await WorkflowService.updateActionDefine(ad);
  }
  async updateActionInstance(ai: ActionInstance) {
    const rsp = await WorkflowService.updateActionInstance(ai);
  }

  async createActionDefine() {
    const ad = new ActionDefine(
      this.workflowDefineID,
      this.sheetTemplateID,
      this.authorization.userID,
      [],
      {}
    );
    await this.updateActionDefine(ad);
    await this.getActionDefineList();
  }

  async createActionInstance(sheetDataID: string, actionDefineID: string) {
    const ai = new ActionInstance(
      this.authorization.userID,
      sheetDataID,
      actionDefineID
    );
    await this.updateActionInstance(ai);
    await this.getActionInstanceList();
  }

  async mounted() {
    await Promise.all([
      this.getActionDefineList(),
      this.getWorkflowList(),
      this.getSheetTemplateList()
    ]);
  }
}
</script>

<style scoped>
#action {
  margin-left: 3%;
  margin-right: 3%;
}
</style>
