<template>
  <div>
    <v-toolbar dense flat class="navbar">
      <v-tabs v-model="tab" background-color="transparent">
        <v-tab :to="`/process/${$route.params.processID}/timeline`"
          >时间轴</v-tab
        >
        <v-tab :to="`/process/${$route.params.processID}/task`">任务清单</v-tab>
        <v-tab :to="`/process/${$route.params.processID}/settings`"
          >过程设置</v-tab
        >
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { namespace } from 'vuex-class';

const projectModule = namespace('project');
const processModule = namespace('process');

import { Component, Prop, Vue } from 'vue-property-decorator';
import taskList from '@/components/project/process/task/TaskList.vue';

import ProcessService from '@/service/processService';

@Component({
  components: {
    'task-list': taskList
  }
})
export default class ProcessBoard extends Vue {
  tab: number = 0;

  @projectModule.Getter('currentProjectID') currentProjectID!: string;
  @projectModule.Mutation('updateCurrentProject') updateCurrentProject: any;
  @processModule.Mutation('updateCurrentProcessList')
  updateCurrentProcessList: any;

  close() {
    this.$router.push({ path: '/process' });
  }

  async getProcessList() {
    console.log('getProcessList');
    const rsp = await ProcessService.getProcessList(this.currentProjectID);
    this.updateCurrentProcessList(rsp.process);
  }

  mounted() {
    this.getProcessList();
  }
}
</script>
