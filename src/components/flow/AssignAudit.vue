<template>
  <div>
    <v-toolbar dense flat color="transparent" v-if="hasAccess">
      <v-spacer></v-spacer>
      <v-btn
        v-if="instance.nodeID == '处长审批'"
        text
        color="success lighten-2"
        @click="finishDialog = true"
        ><v-icon class="mr-2" size="20">mdi-check</v-icon>通过
      </v-btn>

      <v-btn
        v-if="instance.nodeID == '组长审批'"
        text
        color="success lighten-2"
        @click="nextCanDialog = true"
        ><v-icon class="mr-2" size="20">mdi-check</v-icon>通过
      </v-btn>
      <v-btn
        v-if="instance.nodeID != '开始'"
        text
        color="error lighten-2"
        @click="commentDialog = true"
        ><v-icon class="mr-2" size="20">mdi-close</v-icon>退回</v-btn
      >
    </v-toolbar>
    <v-card>
      <v-container fluid>
        <v-list dense>
          <v-list-item>
            <v-list-item-title class="body-2">
              来源
            </v-list-item-title>
            <v-list-item-subtitle class="body-2">
              {{ instance.startUserName }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="body-2">
              组别
            </v-list-item-title>
            <v-list-item-subtitle class="body-2">
              {{ instance.department }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="body-2">
              内容
            </v-list-item-title>
            <v-list-item-subtitle class="body-2">
              {{ comment }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="body-2">
              审计单位
            </v-list-item-title>
            <v-list-item-subtitle class="body-2">
              {{ projectInfo.extraInfo.investAuditCompany.name }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-subheader>参与人员</v-subheader>
        <v-list dense>
          <v-list-item v-for="(item, i) in assignMember" :key="`m-${i}`">
            <v-list-item-title>{{ item.nickName }}</v-list-item-title>
            <v-list-item-title>{{ item.userID }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-subheader v-if="projectInfo">项目信息</v-subheader>
        <Info :projectInfo="projectInfo" v-if="projectInfo"></Info>
      </v-container>
    </v-card>

    <v-dialog width="600" v-model="nextCanDialog">
      <v-card>
        <v-container fluid>
          <v-textarea
            label="备注"
            v-model="newComment"
            outlined
            hide-details
          ></v-textarea>
        </v-container>
        <v-row class="py-4" no-gutters justify="center">
          <v-btn
            depressed
            rounded
            color="primary darken-1"
            @click="completeTask(instance)"
            >确认</v-btn
          >
          <v-btn rounded class="ml-2" text @click="nextCanDialog = false"
            >取消</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog width="600" v-model="finishDialog">
      <v-card>
        <v-container fluid>
          <v-textarea
            label="备注"
            v-model="newComment"
            outlined
            hide-details
          ></v-textarea>
        </v-container>
        <v-row class="py-4" no-gutters justify="center">
          <v-btn
            depressed
            rounded
            color="primary darken-1"
            @click="finishAssign(instance)"
            >确认</v-btn
          >
          <v-btn rounded class="ml-2" text @click="finishDialog = false"
            >取消</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog width="600" v-model="commentDialog">
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black">退回</v-card-title>
        <v-card-text>
          <v-textarea
            label="修改意见"
            v-model="newComment"
            outlined
            hide-details
          ></v-textarea>
        </v-card-text>
        <v-row class="py-4" no-gutters justify="center">
          <v-btn
            depressed
            rounded
            color="error lighten-1"
            @click="
              resistTask(instance);
              commentDialog = false;
            "
            >确认</v-btn
          >
          <v-btn rounded class="ml-2" text @click="commentDialog = false"
            >取消</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project, ProjectExtraInfo, ProjectMember } from '@/types/project';
import { Instance, FlowLinkTask } from '@/types/workflow';
import WorkflowService from '@/service/workflowService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import ProjectService from '@/service/projectService';
import CompanyService from '@/service/companyService';
import { Group } from '@/types/company';

import Info from '@/components/project/widget/Info.vue';

const userModule = namespace('user');

@Component({
  components: {
    Info
  }
})
export default class AssignAudit extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  @Prop() projectInfo!: Project;
  @Prop() instance!: Instance;
  @Prop() comment!: string;
  @Prop() hasAccess!: boolean;

  commentDialog = false;
  finishDialog = false;
  nextCanDialog = false;
  newComment = '';

  async completeTask(item: Instance) {
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'assignment',
      comment: this.newComment,
      project: this.projectInfo
    };

    this.nextCanDialog = false;
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

      this.$emit('updateTimeline');
      this.$router.push({ path: '/' });
    } catch (err) {}
  }

  async finishAssign(item: Instance) {
    console.log('shit');
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'assignment',
      project: this.projectInfo,
      comment: this.newComment
    };

    try {
      await WorkflowService.handleTask(
        item.taskID,
        this.authorization.userID,
        this.userInfo.nickName,
        true,
        item.id,
        '已阅',
        this.instance.procDefId,
        l
      );

      // add assign member to project
      // TODO: remove duplicated
      const addMember: ProjectMember[] = [];

      this.assignMember.forEach(e => {
        if (
          this.projectInfo.member.data.find(e => {
            return e.userID === e.userID;
          }) === undefined
        ) {
          const m = new ProjectMember();
          m.userID = e.userID;
          m.nickName = e.nickName;
          m.role = [];
          addMember.push(m);
        }
      });

      this.projectInfo.member.data = [
        ...this.projectInfo.member.data,
        ...addMember
      ];
      this.projectInfo.extraInfo.assigned = true;

      await ProjectService.updateProjectInfo(this.projectInfo);
      this.$snack('操作成功，该工作流结束');
      this.$router.push({ path: '/' });
    } catch (err) {}
  }

  async resistTask(item: Instance) {
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'project',
      project: this.projectInfo,
      comment: this.newComment
    };

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
      this.$router.push({ path: '/todo' });
      this.$emit('updateTimeline');
    } catch (err) {}
  }

  get assignMember() {
    return this.projectInfo.extraInfo.investAuditCompany.member;
  }

  mounted() {}
}
</script>

<style scoped></style>
