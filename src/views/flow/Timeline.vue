<template>
  <div>
    <v-toolbar dense flat class="navbar">
      <v-btn icon @click="$router.push({ path: `/todo` })">
        <v-icon size="20">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="subtitle-1 font-weight-black">
        {{ instance.procDefName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div>
      <v-row no-gutters>
        <v-col cols="4" style="height:calc(100vh - 96px);overflow-y:auto">
          <v-timeline dense class="pr-5">
            <v-timeline-item
              v-for="(item, i) in timeline"
              :key="`t-${i}`"
              color="primary"
              fill-dot
              small
              right
            >
              <v-card
                :color="
                  item.taskID == $route.params.taskID ? 'cyan darken-1' : ''
                "
                :to="`/todo/${instanceID}/${item.taskID}`"
              >
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="body-2 font-weight-black">
                      {{ item.username }} 执行的操作</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      item.updateTime
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-container class="px-4 body-2"
                  >{{ item.comment }}
                </v-container>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
        <v-col cols="8">
          <v-container fluid v-if="$route.params.taskID">
            <router-view
              @updateTimeline="getTimeline"
              :instance="instance"
              :hasAccess="hasAccess"
            ></router-view>
          </v-container>
          <v-row style="height:100%" v-else justify="center" align="center">
            <div class="title">请选择操作项</div>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WorkflowService from '@/service/workflowService';
import { Event, Instance, FlowLinkTask } from '@/types/workflow';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import CompanyService from '@/service/companyService';

const userModule = namespace('user');

@Component({
  components: {}
})
export default class FlowTimeline extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  instance: Instance = new Instance();
  timeline: Event[] = [];
  linkTask: FlowLinkTask = new FlowLinkTask();
  hasAccess: boolean = false;

  async getInstance() {
    this.instance = (
      await WorkflowService.getWorkflowInstance(Number(this.instanceID))
    ).instance;
  }

  async getTimeline() {
    const t = (
      await WorkflowService.getTimeline(Number(this.instance.id))
    ).timeline.reverse();

    this.timeline = t;
    if (!this.$route.params.taskID) {
      this.$router.push({
        path: `/todo/${this.$route.params.instanceID}/${this.timeline[0].taskID}`
      });
    }
  }

  async checkAccess() {
    const member = (await CompanyService.getGroupInfo(this.instance.candidate))
      .member.data;
    if (
      member.findIndex(e => {
        return e.userID === this.authorization.userID;
      }) != -1
    ) {
      this.hasAccess = true;
    } else {
      this.hasAccess = false;
    }
  }

  get linkContent() {
    if (this.linkTask.extraInfo) {
      return this.linkTask.extraInfo.project;
    }
    return {};
  }

  get instanceID() {
    return this.$route.params.instanceID;
  }

  @Watch('instance')
  onChanged() {
    this.getTimeline();
    this.checkAccess();
  }

  mounted() {
    this.getInstance();
    if (this.instance.id) {
      this.getTimeline();
      this.checkAccess();
    }
  }
}
</script>

<style scoped></style>
