<template>
  <div>
    <v-toolbar dense color="transparent" flat>
      <v-toolbar-title class="subtitle-1 font-weight-black">{{
        actionDefine.name
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="success" @click="createActionInstance()">
        <v-icon size="20" class="mr-2">mdi-plus</v-icon>创建实例
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <!-- {{ actionDefine }} -->
      <FlowChartComponent :workflowDefine="workflowDefine" />
      <div v-if="actionDefine.sheetTemplateID">
        <v-toolbar dense color="transparent" flat>
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >表单模版</v-toolbar-title
          >
        </v-toolbar>
        <SheetTemplatePreview
          :currentTemplateID="actionDefine.sheetTemplateID"
        ></SheetTemplatePreview>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import { ActionDefine, Flow, ActionInstance } from '@/types/workflow';
import { Template } from '@/types/sheet';
import SheetTemplatePreview from '@/components/sheet/Preview.vue';
import FlowChartComponent from '@/components/flow/chart/FlowChart.vue';
const userModule = namespace('user');

@Component({
  components: {
    SheetTemplatePreview,
    FlowChartComponent
  }
})
export default class ActionDefineComponent extends Vue {
  @Prop({ default: () => '' }) actionDefineID!: string;
  @userModule.Getter('authorization') authorization!: Authorization;
  actionDefine = new ActionDefine();
  workflowDefine = new Flow();
  workflowDefineID!: string;
  async getActionDefine(id: string) {
    const rsp = await WorkflowService.getActionDefine(id);
    this.actionDefine = rsp.actionDefine;
    this.workflowDefineID = String(this.actionDefine.flowID);
    await this.getWorkflowDefine(Number(this.workflowDefineID));
  }
  async getWorkflowDefine(id: number) {
    this.workflowDefine = await WorkflowService.getFlowDef(id);
  }
  @Watch('actionDefineID', { immediate: true })
  onActionDefineIDChanged() {
    if (this.actionDefineID) this.getActionDefine(this.actionDefineID);
  }
  // @Watch('workflowDefineID', { immediate: true })
  // onWorkflowDefineIDChanged() {
  //   if (this.workflowDefineID)
  //     this.getWorkflowDefine(Number(this.workflowDefineID));
  // }

  async createActionInstance() {
    var ai = new ActionInstance(
      this.authorization.userID,
      this.actionDefineID,
      '',
      this.workflowDefine.name
    );
    WorkflowService.updateActionInstance(ai);
    this.$router.push('./instance');
  }

  async mounted() {
    // console.log('actionDefineID:', this.actionDefineID);
  }
}
</script>

<style scoped></style>
