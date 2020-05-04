<template>
  <ActionListComponent
    :actionDefineList="actionDefineList"
    :sheetTemplateList="sheetTemplateList"
    :workflowList="workflowList"
  />
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
import ActionListComponent from '@/components/flow/action/ActionList.vue';

const userModule = namespace('user');

@Component({
  components: {
    ActionListComponent
  }
})
export default class ActionView extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;
  actionDefineID: string = '';

  workflowDefineID: string = '';
  sheetTemplateID: string = '';
  ActionName: string = '';
  ActionGroup: string[] = [];
  actionDefineList: ActionDefine[] = [];
  sheetTemplateList: Template[] = [];
  workflowList: any[] = [];
  content: string = '';

  createActionDefineDialog = false;

  async getActionDefineList() {
    const rsp = await WorkflowService.getActionDefineList();
    this.actionDefineList = rsp.actionDefineList;
  }
  async getWorkflowList() {
    const rsp = await WorkflowService.getWorkflowList(1, 1000, this.content);
    this.workflowList = rsp.flow;
  }
  async getSheetTemplateList() {
    const rsp = await SheetService.getSheetTemplateList('', '');
    this.sheetTemplateList = rsp.template;
  }

  @Watch('sheetTemplateID')
  onChanged(v: any) {
    console.log(v);
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
