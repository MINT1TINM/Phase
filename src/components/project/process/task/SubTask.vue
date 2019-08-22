<template>
  <div>
    <v-card outlined>
      <v-card-title class="font-weight-black subtitle-1">
        审计内容
        <v-spacer></v-spacer>
        <v-btn text rounded @click="createSubTask">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;新建
        </v-btn>
      </v-card-title>

      <v-data-table class="mt-4" :headers="headers" :items="subTaskShow.data" hide-default-footer>
        <template v-slot:item.status="props">
          <v-icon v-if="props.item.status===1" color="green">mdi-check-circle-outline</v-icon>
          <v-icon
            v-else-if="props.item.status===2"
            color="warning darken-1"
          >mdi-alert-circle-outline</v-icon>
          <v-icon v-else color="grey">mdi-help-circle-outline</v-icon>
        </template>

        <template v-slot:item.actions="{item}">
          <v-btn icon small color="primary" @click="editSubTaskDialog=true;currentSubTask = item">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn icon small color="error" @click="deleteSubTask(item.id)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <v-layout justify-center class="py-3">
        <v-flex xs6></v-flex>
      </v-layout>
    </v-card>

    <v-bottom-sheet v-model="editSubTaskDialog" inset persistent>
      <v-sheet class="text-center" height="800" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black">审计内容</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn rounded text @click="editSubTaskDialog=false">
            <v-icon size="20">mdi-close</v-icon>&nbsp;取消
          </v-btn>
          <v-btn rounded text @click="updateSubTask">
            <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-layout wrap>
            <v-flex xs6 class="pr-2">
              <dim-form :formContent="subTaskContent" :target="currentSubTask"></dim-form>
              <v-layout>
                <v-flex xs3>
                  <v-subheader class="body-2 px-1" style="height:36px">凭证</v-subheader>
                </v-flex>
                <v-flex xs9>
                  <v-btn block color="primary" outlined @click="searchCertificateDialog=true">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs6 class="pl-2">
              <v-container fluid>
                <v-card outlined width="100%">
                  <v-card-title class="subtitle-1 font-weight-black">相关文件</v-card-title>
                  <v-container fluid>
                    <v-btn block color="primary" outlined @click="fileDialog=true">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-container>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="searchCertificateDialog" inset persistent>
      <v-sheet class="text-center" height="750" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black">搜索凭证</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="searchCertificateDialog=false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <certificate-search></certificate-search>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="fileDialog" inset persistent>
      <v-sheet class="text-center" height="750" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black">项目文件</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="fileDialog=false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TaskService from "@/service/taskService";
import { SubTask } from "@/types/task";
import dimForm from "@/plugins/dim-form/Main.vue";
import certificateSearch from "@/components/certificate/Search.vue";

@Component({
  components: {
    "dim-form": dimForm,
    "certificate-search": certificateSearch
  }
})
export default class SubTaskList extends Vue {
  @Prop({ default: () => ({ data: [] }) }) private subTask!: {};

  private editSubTaskDialog: boolean = false;
  private searchCertificateDialog: boolean = false;
  private fileDialog: boolean = false;

  private currentSubTask: SubTask = {
    id: "",
    name: "",
    description: "",
    createdAt: "",
    status: 0,
    file: []
  };
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
  private subTaskContent = [
    {
      type: "text-field",
      name: "name",
      title: "名称"
    },
    {
      type: "select",
      name: "status",
      title: "状态",
      list: [
        {
          title: "未完成",
          value: 0
        },
        {
          title: "无异常",
          value: 1
        },
        {
          title: "异常",
          value: 2
        }
      ]
    },
    {
      type: "text-field",
      name: "description",
      title: "描述"
    },
    {
      type: "text-area",
      name: "claim",
      title: "审计说明"
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

  private async updateSubTask() {
    await TaskService.updateSubTask(
      this.$route.params.taskID,
      this.currentSubTask.id,
      this.currentSubTask.name,
      this.currentSubTask.description,
      this.currentSubTask.status
    );
    this.editSubTaskDialog = false;
  }

  private async deleteSubTask(subTaskID: string) {
    const res = await this.$confirm("此操作无法恢复", {
      title: "确认删除?",
      buttonTrueColor: "primary"
    });
    if (res) {
      await TaskService.deleteSubTask(this.$route.params.taskID, subTaskID);
      this.$emit("updateTaskInfo");
    }
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
