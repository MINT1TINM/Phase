<template>
  <v-card outlined>
    <v-card-title class="font-weight-black subtitle-1">
      审计内容
      <v-spacer></v-spacer>
      <v-btn text rounded @click="createSubTask">
        <v-icon size="20">mdi-plus</v-icon>&nbsp;新建
      </v-btn>
    </v-card-title>

    <v-data-table class="mt-4" :headers="headers" :items="subTaskShow.data" hide-default-footer>
      <template v-slot:item.actions="{item}">
        <v-btn icon small color="error">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-layout justify-center class="py-3">
      <v-flex xs6></v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TaskService from "@/service/taskService";

@Component
export default class SubTaskList extends Vue {
  @Prop({ default: () => ({ data: [] }) }) private subTask!: {};
  private headers = [
    { text: "状态", value: "status", align: "center", sortable: false },
    { text: "名称", value: "name", align: "center", sortable: false },

    { text: "描述", value: "description", align: "center", sortable: false },
    { text: "操作", value: "actions", align: "center", sortable: false }
  ];
  private statusList = [
    {
      text: "正常",
      value: true
    },
    {
      text: "异常",
      value: false
    }
  ];

  private async toggleItemStatus(item: any) {
    item.status = !item.status;
    await this.save(item);
  }

  private async createSubTask() {
    await TaskService.createSubTask(this.$route.params.taskID);
    this.$emit("updateTaskInfo");
  }

  get subTaskShow() {
    return this.subTask;
  }

  private async save(item: any) {
    console.log(item);
  }
}
</script>

<style scoped>
</style>
