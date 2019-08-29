<template>
  <div>
    <v-card outlined>
      <v-card-title class="font-weight-black subtitle-1">
        审计（调查）事项
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
            <v-flex xs7 class="pr-2">
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
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="my-2"
                            v-for="(item,i) in currentSubTask.content"
                            :key="`c-${i}`"
                          >
                            <td class="pl-3 pr-2">
                              <v-select
                                dense
                                class="text-field-dense"
                                :items="[`量化`,`非量化`]"
                                single-line
                                hide-details
                                outlined
                                v-model="item.property"
                              ></v-select>
                            </td>
                            <td width="370px" class="px-1">
                              <v-text-field
                                single-line
                                class="text-field-dense"
                                hide-details
                                auto-grow
                                rows="1"
                                outlined
                                v-model="item.description"
                              >{{ item.description }}</v-text-field>
                            </td>
                            <td class="px-1">
                              <v-text-field
                                single-line
                                class="text-field-dense"
                                hide-details
                                outlined
                                v-model="item.expect"
                              >{{ item.expect }}</v-text-field>
                            </td>
                            <td class="px-1">
                              <v-text-field
                                single-line
                                class="text-field-dense"
                                hide-details
                                outlined
                                v-model="item.reality"
                              >{{ item.reality }}</v-text-field>
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
                          </tr>
                        </tbody>
                      </v-simple-table>
                      <v-container fluid>
                        <v-layout justify-center>
                          <v-btn block color="primary" outlined @click="insertContent">
                            <v-icon size="20">mdi-plus</v-icon>&nbsp;新增项目
                          </v-btn>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-container>
                </v-flex>
              </v-layout>
              <v-layout class="mt-4">
                <v-flex xs12>
                  <v-card outlined width="100%">
                    <v-card-title class="subtitle-1 font-weight-black">相关凭证</v-card-title>
                    <v-container fluid>
                      <v-btn block color="primary" outlined @click="searchCertificateDialog=true">
                        <v-icon size="20">mdi-plus</v-icon>&nbsp;新增凭证
                      </v-btn>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs5 class="pl-2">
              <v-card outlined width="100%">
                <v-card-title class="subtitle-1 font-weight-black">相关文件</v-card-title>
                <v-container fluid>
                  <v-btn block color="primary" outlined @click="fileDialog=true">
                    <v-icon size="20">mdi-plus</v-icon>&nbsp;链接文件
                  </v-btn>
                </v-container>
              </v-card>
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

import certificateSearch from "@/components/certificate/Search.vue";

@Component({
  components: {
    "certificate-search": certificateSearch
  }
})
export default class SubTaskList extends Vue {
  @Prop({ default: () => ({ data: [] }) }) private subTask!: {
    data: [];
  };

  private editSubTaskDialog: boolean = false;
  private searchCertificateDialog: boolean = false;
  private fileDialog: boolean = false;

  private currentSubTask: SubTask = {
    id: "",
    name: "",
    createdAt: "",
    status: 0,
    file: [],
    content: []
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
      this.currentSubTask.content
    );
    await TaskService.getTaskInfo(this.$route.params.taskID);
    this.editSubTaskDialog = false;
  }

  private async deleteSubTask(subTaskID: string) {
    const res = await this.$confirm("此操作无法恢复", {
      title: "确认删除?",
      buttonTrueColor: "primary"
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

  get subTaskShow() {
    let subTask = this.subTask;
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

  private async save(item: any) {
    console.log(item);
  }
}
</script>

