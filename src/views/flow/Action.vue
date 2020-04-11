<template>
  <div>actionList:{{ actionList }}</div>
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
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;
  actionDefineList: any[] = [];

  async mounted() {
    this.actionDefineList = await WorkflowService.getActionDefineList();
  }
}
</script>

<style scoped></style>
