<template>
  <div>
    <v-toolbar dense color="transparent" flat>
      <v-toolbar-title class="subtitle-1 font-weight-black">
        {{ actionInstance.name }} 审批权限:{{
          INSTANCE_APPROVE_AUTHORITY
        }}
        编辑权限:{{ INSTANCE_EDIT_AUTHORITY }}
      </v-toolbar-title>

      <template v-if="INSTANCE_EDIT_AUTHORITY">
        <v-spacer></v-spacer>
        <v-btn text color="success" @click="startActionInstance()">
          <v-icon size="20" class="mr-2">mdi-check</v-icon>提交审批
        </v-btn>
      </template>
      <template v-if="INSTANCE_APPROVE_AUTHORITY">
        <v-spacer></v-spacer>
        <!-- <template> -->
        <v-btn text color="success" @click="approveWorkflow(true)">
          <v-icon size="20" class="mr-2">mdi-check</v-icon>审批通过
        </v-btn>
        <v-btn text color="error" @click="approveWorkflow(false)">
          <v-icon size="20" class="mr-2">mdi-close</v-icon>审批不通过
        </v-btn>
      </template>
    </v-toolbar>

    <v-container fluid>
      <!-- {{ actionDefine }} -->
      <TimeLineComponent
        :workflowDefine="workflowDefine"
        :flowNode="flowNode"
        :timeLine="timeLine"
        :currentNodeID="currentNodeID"
        :status="actionInstance.status"
      />
      <!-- <v-toolbar dense color="transparent" flat>
        <v-toolbar-title class="subtitle-1 font-weight-black">表单模版</v-toolbar-title>
      </v-toolbar>
      <SheetTemplatePreview :currentTemplateID="actionDefine.sheetTemplateID"></SheetTemplatePreview>-->

      <v-card class="mt-3">
        <SheetContent
          :sheetTemplateID="actionDefine.sheetTemplateID"
          :sheetID="actionInstance.sheetDataID"
          :editable="INSTANCE_EDIT_AUTHORITY"
        ></SheetContent>
      </v-card>

      表单展示 编辑权限={{ INSTANCE_EDIT_AUTHORITY }}
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace, Action } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import { Sheet } from '@/types/sheet';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import {
  Instance,
  ActionDefine,
  ActionInstance,
  Event,
  NodeInfo,
  Flow
} from '@/types/workflow';
import { Template } from '@/types/sheet';
import TimeLineComponent from '@/components/flow/chart/TimeLine.vue';
import SheetContent from '@/components/sheet/Content.vue';
const userModule = namespace('user');

@Component({
  components: {
    TimeLineComponent,
    SheetContent
  }
})
export default class ActionInstanceComponent extends Vue {
  @Prop({ default: () => '' }) actionInstanceID!: string;
  @Prop({ default: () => false }) approvalAuthority!: boolean;
  // @Prop({ default: () => false }) approvalRight!: boolean;
  isApproved: string[] = [];

  get INSTANCE_APPROVE_AUTHORITY(): boolean {
    return (
      this.actionInstance.status == '审批中' &&
      this.approvalAuthority == true &&
      this.isApproved.indexOf(this.actionInstanceID) == -1
    );
  }
  get INSTANCE_EDIT_AUTHORITY(): boolean {
    return (
      this.actionInstance.status == '未提交' &&
      this.authorization.userID == this.actionInstance.userID
    );
  }

  actionDefine: ActionDefine = new ActionDefine();
  workflowDefineID: number = -1;
  async getActionDefine(id: string) {
    const rsp = await WorkflowService.getActionDefine(id);
    this.actionDefine = rsp.actionDefine;
    this.workflowDefineID = this.actionDefine.flowID;
    this.getWorkflowDefine(this.workflowDefineID);
  }

  workflowDefine: Flow = new Flow();
  async getWorkflowDefine(id: number) {
    this.workflowDefine = await WorkflowService.getFlowDef(id);
  }

  workflowInstance: Instance = new Instance();
  currentNodeID: string = '';
  flowNode: NodeInfo[] = [];
  async getWorkflowInstance(instance_id: number) {
    this.workflowInstance = (
      await WorkflowService.getWorkflowInstance(instance_id)
    ).instance;
    // console.log(this.workflowInstance);
    this.flowNode = this.workflowInstance.node_infos;
    this.currentNodeID = this.workflowInstance.nodeID;
  }

  timeLine: Event[] = [];
  async getTimeLine(instance_id: number) {
    this.timeLine = (await WorkflowService.getTimeline(instance_id)).timeline;
  }

  sheetData: Sheet = new Sheet();
  async geSheetInfo(id: string) {
    const rsp = await SheetService.getSheetInfo(id);
    this.sheetData = rsp;
  }

  actionInstance: ActionInstance = new ActionInstance();
  actionDefineID: string = '';
  async getActionInstance(id: string) {
    this.actionInstance = (
      await WorkflowService.getActionInstance(id)
    ).actionInstance;
    // console.log(this.actionInstance);
    this.actionDefineID = this.actionInstance.actionDefineID;
    this.getActionDefine(this.actionDefineID);
    this.getWorkflowInstance(this.actionInstance.flowInstanceID);
    this.getTimeLine(this.actionInstance.flowInstanceID);
  }

  refreshPage() {
    this.onActionInstanceIDChanged();
  }

  @Watch('actionInstanceID', { immediate: true })
  onActionInstanceIDChanged() {
    if (this.actionInstanceID) this.getActionInstance(this.actionInstanceID);
  }

  approvalCommand: string = 'approval command';
  approvalResult: boolean = true;
  approvalCommandDialog: boolean = false;
  @userModule.Getter('authorization') authorization!: Authorization;

  async approveWorkflow(pass: boolean) {
    try {
      await WorkflowService.completeTask(
        this.workflowInstance.taskID,
        this.authorization.userID,
        this.authorization.userID,
        pass,
        this.workflowInstance.id,
        this.approvalCommand
      );
      this.isApproved.push(this.actionInstanceID);
      this.refreshPage();
      this.$snack('操作成功', { color: 'success' });
    } catch (_) {
      this.$snack('操作失败', { color: 'error' });
    }
  }

  async startActionInstance() {
    await WorkflowService.startActionInstance(this.actionInstanceID);
    this.refreshPage();
  }

  async mounted() {}
}
</script>

<style scoped></style>
