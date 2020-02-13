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
          <v-timeline dense>
            <v-timeline-item
              v-for="(item, i) in timeline"
              :key="`t-${i}`"
              color="primary"
              fill-dot
              small
              right
            >
              <v-card :to="`/todo/${instanceID}/${item.taskID}`">
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
          <v-container fluid>
            <router-view :instance="instance"></router-view>
          </v-container>
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

const userModule = namespace('user');

@Component({
  components: {}
})
export default class FlowTimeline extends Vue {
  @userModule.Getter('authorization') private authorization!: Authorization;
  @userModule.Getter('userInfo') private userInfo!: UserInfo;

  private instance: Instance = new Instance();
  private timeline: Event[] = [];
  private linkTask: FlowLinkTask = new FlowLinkTask();

  private async getInstance() {
    this.instance = (
      await WorkflowService.getWorkflowInstance(Number(this.instanceID))
    ).instance;
  }

  private async getTimeline() {
    const t = (await WorkflowService.getTimeline(Number(this.instance.id)))
      .timeline;

    this.timeline = t;
  }

  private get linkContent() {
    if (this.linkTask.extraInfo) {
      return this.linkTask.extraInfo.project;
    }
    return {};
  }

  private get instanceID() {
    return this.$route.params.instanceID;
  }

  @Watch('instance')
  private onChanged() {
    this.getTimeline();
  }

  private mounted() {
    this.getInstance();
    if (this.instance.id) this.getTimeline();
  }
}
</script>

<style scoped></style>
