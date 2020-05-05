<template>
  <ActionInstanceListComponent :actionInstanceList="actionInstanceList" />
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
import ActionInstanceListComponent from '@/components/flow/action/InstanceList.vue';

const userModule = namespace('user');

@Component({
  components: {
    ActionInstanceListComponent
  }
})
export default class InstanceView extends Vue {
  @Prop({ default: () => '00000000-0000-0000-0000-000000000000' })
  projectID!: string;
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  // ActionName: string = '';
  // ActionGroup: string[] = [];
  actionInstanceList: ActionInstance[] = [];
  content: string = '';

  createActionDefineDialog = false;

  async getActionInstanceList() {
    console.log('projectID:', this.projectID);

    const rsp = await WorkflowService.getActionInstanceList(
      this.authorization.userID,
      this.projectID
    );
    this.actionInstanceList = rsp.actionInstanceList;
  }

  async mounted() {
    await this.getActionInstanceList();
  }
}
</script>

<style scoped>
#action {
  margin-left: 3%;
  margin-right: 3%;
}
</style>
