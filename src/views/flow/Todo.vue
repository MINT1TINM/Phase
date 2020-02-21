<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="instanceList"
      hide-default-footer
      disable-sort
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-btn icon :to="`/todo/${item.id}`"
          ><v-icon size="20">mdi-information-outline</v-icon></v-btn
        >
      </template>
    </v-data-table>
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
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  instanceList: Instance[] = [];

  get headers() {
    return [
      {
        text: '名称',
        value: 'procDefName'
      },
      {
        text: '状态',
        value: 'nodeID'
      },
      {
        text: '事件',
        value: 'startTime'
      },
      {
        text: '启动人',
        value: 'startUserName'
      },
      {
        text: '操作',
        value: 'action'
      }
    ];
  }

  async getFlowInstance() {
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
    if (rsp.msg === 'failed') {
      this.$snack('🤔该服务已下线');
    } else {
      this.instanceList = rsp.instance;
    }
  }

  mounted() {
    this.getFlowInstance();
  }
}
</script>

<style scoped></style>
