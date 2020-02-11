<template>
  <div>
    <v-card
      style="height:calc(100vh - 96px)"
      class="overflow-y-auto elevation-8"
      color="transparent"
    >
      <v-toolbar dense flat color="transparent">
        <v-toolbar-title class="body-2 font-weight-black">
          工作流预设
        </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-text-field
          solo-inverted
          dense
          flat
          single-line
          hide-details
          v-model="content"
          label="搜索"
          :append-outer-icon="`mdi-magnify`"
          @click:append-outer="searchFlow"
          @keyup.enter="searchFlow"
        ></v-text-field>
      </v-container>
      <v-list two-line dense color="transparent">
        <div v-for="(item, i) in flowList" :key="`f-${i}`">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                >ID:
                <span :id="`flow-${item.id}`">{{
                  item.id
                }}</span></v-list-item-subtitle
              >
              <v-list-item-title class="body-2">{{
                item.name
              }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-clipboard:copy="item.id"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    v-on="on"
                  >
                    <v-icon size="20">mdi-content-copy</v-icon>
                  </v-btn>
                </template>
                <span>复制ID到剪贴板</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueClipboard from 'vue-clipboard2';
import WorkflowService from '@/service/workflowService';
import { Flow } from '@/types/workflow';

VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);

@Component
export default class SearchFlow extends Vue {
  private content: string = '';
  private flowList: Flow[] = [];

  private async searchFlow() {
    if (this.content) {
      const rsp = await WorkflowService.getWorkflowList(1, 10, this.content);
      this.flowList = rsp.flow;
    }
  }

  private onCopy(e: any) {
    this.$snack(`ID: ${e.text} 已复制到剪贴板`);
  }
  private onError(e: any) {
    this.$snack(`复制失败`);
  }
}
</script>

<style scoped></style>
