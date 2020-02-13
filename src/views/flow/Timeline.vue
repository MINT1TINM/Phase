<template>
  <div>
    <v-toolbar dense flat color="transparent">
      <v-btn icon @click="$router.go(-1)">
        <v-icon size="20">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="subtitle-1 font-weight-black">
        {{ instance.procDefName }}
      </v-toolbar-title>
    </v-toolbar>
    <InstanceInfo :instanceID="instanceID"></InstanceInfo>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import WorkflowService from '@/service/workflowService';
import { Event, Instance } from '@/types/workflow';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import InstanceInfo from '@/components/flow/InstanceInfo.vue';

const userModule = namespace('user');

@Component({
  components: {
    InstanceInfo
  }
})
export default class FlowTimeline extends Vue {
  @userModule.Getter('authorization') private authorization!: Authorization;
  @userModule.Getter('userInfo') private userInfo!: UserInfo;

  private instance: Instance = new Instance();

  private get instanceID() {
    return this.$route.params.instanceID;
  }

  private async getInstance() {
    this.instance = (
      await WorkflowService.getWorkflowInstance(Number(this.instanceID))
    ).instance;
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
    this.getInstance();
  }
}
</script>

<style scoped></style>
