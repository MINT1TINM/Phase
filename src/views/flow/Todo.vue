<template>
  <div>
    {{ instanceList }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import { Instance } from '@/types/workflow';

const userModule = namespace('user');

@Component
export default class FlowTodo extends Vue {
  @userModule.Getter('authorization') private authorization!: Authorization;
  @userModule.Getter('userInfo') private userInfo!: UserInfo;

  private instanceList: Instance[] = [];

  private async getFlowInstance() {
    // get user group
    const groupUUIDList = (
      await CompanyService.getUserGroup(this.authorization.userID)
    ).groupUUIDList;

    const rsp = await WorkflowService.getWorkflowInstanceList(
      groupUUIDList,
      this.userInfo.nickName,
      this.authorization.userID,
      1,
      100
    );

    this.instanceList = rsp.instance;
  }

  private mounted() {
    this.getFlowInstance();
  }
}
</script>

<style scoped></style>
