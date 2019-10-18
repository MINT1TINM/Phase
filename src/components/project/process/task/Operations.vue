<template>
  <v-card outlined>
    <v-card-title class="font-weight-black subtitle-1">操作</v-card-title>

    <v-layout justify-center class="py-3">
      <v-flex xs6>
        <v-btn block rounded depressed color="error" @click="deleteTask">删除任务</v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TaskService from '@/service/taskService';
import ProcessService from '@/service/processService';

const processModule = namespace('process');
const projectModule = namespace('project');

@Component
export default class TaskOperations extends Vue {
  @projectModule.Getter('currentProjectID') private currentProjectID: any;

  @processModule.Mutation('updateCurrentProcessList')
  private updateCurrentProcessList: any;

  private async deleteTask() {
    const res = await this.$confirm('此操作无法复原', {
      title: '确认删除?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark,
    });
    if (res) {
      const { taskID } = this.$route.params;
      await TaskService.deleteTask(taskID);

      const rsp = await ProcessService.getProcessList(this.currentProjectID);
      this.updateCurrentProcessList(rsp.process);

      this.$router.push({
        path: `/project/process/${this.$route.params.processID}/task`,
      });
    }
  }
}
</script>
