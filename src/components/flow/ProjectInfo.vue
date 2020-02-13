<template>
  <div>
    <v-card>
      <v-toolbar dense flat color="transparent">
        <v-spacer></v-spacer>
        <v-btn
          :disabled="instance.nodeID != '审批'"
          text
          color="success lighten-2"
          @click="completeTask(instance)"
          ><v-icon class="mr-2" size="20">mdi-check</v-icon>通过</v-btn
        >
        <v-btn
          :disabled="instance.nodeID != '审批'"
          text
          color="error lighten-2"
          @click="resistTask(instance)"
          ><v-icon class="mr-2" size="20">mdi-close</v-icon>退回</v-btn
        >
      </v-toolbar>
      <v-container fluid>
        {{ projectInfo }}
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project, ProjectExtraInfo } from '@/types/project';
import { Instance, FlowLinkTask } from '@/types/workflow';
import WorkflowService from '@/service/workflowService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import ProjectService from '../../service/projectService';

const userModule = namespace('user');

@Component
export default class ProjectInfo extends Vue {
  @userModule.Getter('authorization') private authorization!: Authorization;
  @userModule.Getter('userInfo') private userInfo!: UserInfo;

  @Prop() projectInfo!: Project;
  @Prop() instance!: Instance;

  private async completeTask(item: Instance) {
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'project',
      comment: '审核通过'
    };

    const c = await this.$confirm('', {
      title: '确认通过？',
      buttonTrueColor: 'primary darken-1',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      try {
        await WorkflowService.handleTask(
          item.taskID,
          this.authorization.userID,
          this.userInfo.nickName,
          true,
          item.id,
          '审核通过',
          this.instance.procDefId,
          l
        );

        // Update project.extrainfo.started to true
        const p = new Project();
        p.extraInfo = new ProjectExtraInfo();
        p.extraInfo.started = true;

        await ProjectService.updateProjectInfo({ ...this.projectInfo, ...p });
      } catch (err) {}
    }
  }

  private async resistTask(item: Instance) {
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'project',
      comment: '审核未通过'
    };

    const c = await this.$confirm('', {
      title: '确认退回？',
      buttonTrueColor: 'error',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      try {
        await WorkflowService.handleTask(
          item.taskID,
          this.authorization.userID,
          this.userInfo.nickName,
          false,
          item.id,
          '审核未通过',
          this.instance.procDefId,
          l
        );
      } catch (err) {}
    }
  }
}
</script>

<style scoped></style>
