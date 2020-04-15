<template>
  <div>
    <b>actionInstanceID:{{ actionInstanceID }}</b>
    <br />
    actionInstance:{{ actionInstance }}
    <br />
    <ActionDefineComponent :actionDefineID="actionDefineID" />
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
import ActionDefineComponent from '@/components/flow/action/DefineList.vue';

@Component({
  components: {
    ActionDefineComponent
  }
})
export default class ActionInstanceComponent extends Vue {
  @Prop({ default: () => '' }) actionInstanceID!: string;

  actionInstance: ActionInstance = new ActionInstance();
  actionDefineID: string = '';

  async getActionInstance(id: string) {
    const rsp = await WorkflowService.getActionInstance(id);
    this.actionInstance = rsp.actionInstance;
    this.actionDefineID = this.actionInstance.actionDefineID;
  }
  async mounted() {
    await this.getActionInstance(this.actionInstanceID);
  }
}
</script>

<style scoped></style>
