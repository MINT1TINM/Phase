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
        <v-btn icon><v-icon size="20">mdi-information-outline</v-icon></v-btn>
        <v-btn icon color="success" @click="completeTask(item)"
          ><v-icon size="20">mdi-check</v-icon></v-btn
        >
        <v-btn icon color="error" @click="resistTask(item)"
          ><v-icon size="20">mdi-close</v-icon></v-btn
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
  @userModule.Getter('authorization') private authorization!: Authorization;
  @userModule.Getter('userInfo') private userInfo!: UserInfo;

  private instanceList: Instance[] = [];

  private get headers() {
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
        value: 'startUserId'
      },
      {
        text: '操作',
        value: 'action'
      }
    ];
  }

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
    if (rsp.msg === 'failed') {
      this.$snack('🤔该服务已下线');
    } else {
      this.instanceList = rsp.instance;
    }
  }

  private async completeTask(item: Instance) {
    const c = await this.$confirm('', {
      title: '确认通过？',
      buttonTrueColor: 'primary darken-1',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      const rsp = await WorkflowService.handleTask(
        item.taskID,
        this.authorization.userID,
        this.userInfo.nickName,
        true,
        item.id,
        'fucking passed!'
      );
    }
  }

  private async resistTask(item: Instance) {
    const c = await this.$confirm('', {
      title: '确认退回？',
      buttonTrueColor: 'error darken-1',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      const rsp = await WorkflowService.handleTask(
        item.taskID,
        this.authorization.userID,
        this.userInfo.nickName,
        false,
        item.id,
        'fucking not passed!'
      );
    }
  }

  private mounted() {
    this.getFlowInstance();
  }
}
</script>

<style scoped></style>
