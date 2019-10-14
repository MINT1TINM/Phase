<template>
  <div>
    <v-card outlined>
      <v-card-title class="font-weight-black subtitle-1">
        子任务
        <v-spacer></v-spacer>
        <v-btn text rounded @click="createSubTask">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;新建
        </v-btn>
      </v-card-title>

      <v-data-table class="mt-4" :headers="headers" :items="subTaskShow.data">
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
    </v-card>

    <v-bottom-sheet v-model="editSubTaskDialog" persistent>
      <v-sheet class="text-center" height="800" style="overflow:auto">
        <v-toolbar flat>
          <v-text-field
            single-line
            hide-details
            class="subtitle-1 font-weight-black"
            v-model="currentSubTask.name"
          ></v-text-field>
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
            <v-flex xs8 class="pr-2">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-container fluid class="py-0">
                    <v-card outlined width="100%">
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th class="text-center">属性</th>
                            <th class="text-center">判断内容</th>
                            <th class="text-center">判断标准</th>
                            <th class="text-center">实际情况</th>
                            <th class="text-center">是否合规</th>
                            <th class="text-center">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="my-2"
                            v-for="(item,i) in currentSubTask.content"
                            :key="`c-${i}`"
                          >
                            <td width="130px" class="pl-3 pr-2">
                              <v-select
                                dense
                                style="height:100%;align-items:center"
                                :items="[`量化`,`非量化`]"
                                single-line
                                hide-details
                                outlined
                                v-model="item.property"
                              ></v-select>
                            </td>
                            <td width="320px" class="px-1 py-1">
                              <v-textarea
                                single-line
                                dense
                                hide-details
                                auto-grow
                                rows="1"
                                outlined
                                v-model="item.description"
                              >{{ item.description }}</v-textarea>
                            </td>
                            <td class="px-1">
                              <v-textarea
                                single-line
                                dense
                                hide-details
                                outlined
                                auto-grow
                                rows="1"
                                v-model="item.expect"
                              >{{ item.expect }}</v-textarea>
                            </td>
                            <td class="px-1">
                              <v-textarea
                                single-line
                                dense
                                hide-details
                                auto-grow
                                rows="1"
                                outlined
                                v-model="item.reality"
                              >{{ item.reality }}</v-textarea>
                            </td>
                            <td width="120">
                              <v-switch
                                class="caption"
                                style="margin-top:0"
                                color="primary"
                                hide-details
                                v-model="item.status"
                                :label="item.status?`合规`:`不合规`"
                              ></v-switch>
                            </td>
                            <td>
                              <v-btn icon @click="removeContent(i)">
                                <v-icon size="20">mdi-close</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                      <v-container fluid>
                        <v-layout justify-center>
                          <!-- complete the last one, then add another one -->
                          <v-btn
                            v-if="
                          currentSubTask.content.length===0 ||
                          currentSubTask.content.length>0&&
                          currentSubTask.content[currentSubTask.content.length-1].property
                          "
                            rounded
                            color="primary"
                            outlined
                            @click="insertContent"
                          >
                            <v-icon size="20">mdi-plus</v-icon>&nbsp;新增项目
                          </v-btn>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="searchCertificateDialog" persistent>
      <v-sheet class="text-center" height="750" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black">搜索凭证</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="searchCertificateDialog=false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <search-certificate @insertCertificate="insertCertificate"></search-certificate>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="fileDialog" persistent>
      <v-sheet class="text-center" height="750" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black">项目文件</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="fileDialog=false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <document :window="true" @linkFile="linkFile"></document>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TaskService from "@/service/taskService";
import { SubTask, SubTaskCertificate } from "@/types/task";
import document from "@/views/project/document/Document.vue";
import searchCertificate from "@/components/finance/certificate/SearchCertificate.vue";
import previewCertificate from "@/components/finance/certificate/PreviewCertificate.vue";

@Component({
  components: {
    document,
    "search-certificate": searchCertificate,
    "preview-certificate": previewCertificate
  }
})
export default class SubTaskList extends Vue {
  @Prop({ default: () => ({ data: [] }) }) private subTask!: {
    data: [];
  };

  private editSubTaskDialog: boolean = false;
  private searchCertificateDialog: boolean = false;
  private fileDialog: boolean = false;

  private currentCertificate: SubTaskCertificate = { uniNo: "", ord: "" };

  private currentSubTask: SubTask = {
    id: "",
    name: "",
    createdAt: "",
    status: 0,
    file: [],
    content: [],
    certificate: []
  };
  private headers = [
    { text: "状态", value: "status", align: "center", sortable: false },
    { text: "名称", value: "name", align: "center", sortable: false },
    { text: "操作", value: "actions", align: "center", sortable: false }
  ];

  private async toggleItemStatus(item: any) {
    item.status = !item.status;
    await this.save(item);
  }

  private async createSubTask() {
    await TaskService.createSubTask(this.$route.params.taskID);
    await TaskService.getTaskInfo(this.$route.params.taskID);
  }

  private async updateSubTask() {
    await TaskService.updateSubTask(
      this.$route.params.taskID,
      this.currentSubTask.id,
      this.currentSubTask.name,
      this.currentSubTask.content,
      this.currentSubTask.file,
      this.currentSubTask.certificate
    );
    await TaskService.getTaskInfo(this.$route.params.taskID);
    this.editSubTaskDialog = false;
  }

  private async deleteSubTask(subTaskID: string) {
    const res = await this.$confirm("此操作无法恢复", {
      title: "确认删除?",
      buttonTrueColor: "primary",
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await TaskService.deleteSubTask(this.$route.params.taskID, subTaskID);
      await TaskService.getTaskInfo(this.$route.params.taskID);
    }
  }

  private insertContent() {
    this.currentSubTask.content.push({
      property: "",
      description: "",
      expect: "",
      reality: "",
      status: false
    });
  }

  private removeContent(i: number) {
    this.currentSubTask.content.splice(i, 1);
  }

  private insertCertificate(certificate: SubTaskCertificate) {
    if (
      this.currentSubTask.certificate === undefined ||
      this.currentSubTask.certificate === null
    ) {
      this.currentSubTask.certificate = [];
    }
    this.currentSubTask.certificate.push({
      uniNo: certificate.uniNo,
      ord: certificate.ord
    });
  }

  private removeCertificate(i: number) {
    this.currentSubTask.certificate.splice(i, 1);
  }

  private linkFile(v: any) {
    if (!this.currentSubTask.file) {
      (this.currentSubTask.file as any) = [];
    }
    (this.currentSubTask.file as any).push(v);
    // remove duplicated
    (this.currentSubTask.file as any) = Array.from(
      new Set(this.currentSubTask.file)
    );
    console.log(this.currentSubTask.file);
    this.fileDialog = false;
  }

  private async downloadFile(item: any) {
    window.open("/api/file/download?sName=" + item.sName, "_blank");
    // await FileService.downloadFile(item.sName);
  }

  // private showFile(item: any) {}

  private removeFile(item: any) {
    const index = (this.currentSubTask.file as any).indexOf(item);
    (this.currentSubTask.file as any).splice(index, 1);
  }

  get subTaskShow() {
    const subTask = this.subTask;
    if (subTask.data) {
      for (const item of subTask.data as any) {
        item.status = 1;
        for (const j of item.content as any) {
          // if any of subtask_content's status is 2,
          // this subtask's status will be false
          if (!j.status) {
            item.status = 2;
            break;
          }
        }
      }
      return subTask;
    }
    return [];
  }

  private async save(item: any) {
    console.log(item);
  }
}
</script>

