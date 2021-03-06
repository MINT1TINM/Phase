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

      <v-data-table class="mt-4" :headers="headers" :items="subTaskShow.data">
        <template v-slot:item.status="props">
          <v-icon v-if="props.item.status === 1" color="green"
            >mdi-check-circle-outline</v-icon
          >
          <v-icon v-else-if="props.item.status === 2" color="warning darken-1"
            >mdi-alert-circle-outline</v-icon
          >
          <v-icon v-else color="grey">mdi-help-circle-outline</v-icon>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            small
            color="primary"
            @click="
              editSubTaskDialog = true;
              currentSubTask = item;
            "
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn class="ml-1" icon small @click="copySubTask(item)">
            <v-icon size="18">mdi-content-copy</v-icon>
          </v-btn>
          <v-btn
            class="ml-1"
            icon
            small
            color="error"
            @click="deleteSubTask(item.id)"
          >
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
          <v-btn rounded text @click="editSubTaskDialog = false">
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
                            <th class="text-center">复核意见</th>
                            <th class="text-center">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="my-2"
                            v-for="(item, i) in currentSubTask.content"
                            :key="`c-${i}`"
                          >
                            <td width="130px" class="pl-3 pr-2">
                              <v-select
                                dense
                                style="height:100%;align-items:center"
                                :items="[`量化`, `非量化`]"
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
                                >{{ item.description }}</v-textarea
                              >
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
                                >{{ item.expect }}</v-textarea
                              >
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
                                >{{ item.reality }}</v-textarea
                              >
                            </td>
                            <td width="120">
                              <v-switch
                                class="caption"
                                style="margin-top:0"
                                color="primary"
                                hide-details
                                v-model="item.status"
                                :label="item.status ? `合规` : `不合规`"
                              ></v-switch>
                            </td>
                            <td class="px-1">
                              <v-textarea
                                single-line
                                dense
                                hide-details
                                auto-grow
                                rows="1"
                                outlined
                                v-model="item.review"
                                >{{ item.review }}</v-textarea
                              >
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
                              currentSubTask.content.length === 0 ||
                                (currentSubTask.content.length > 0 &&
                                  currentSubTask.content[
                                    currentSubTask.content.length - 1
                                  ].property)
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
              <v-layout class="mt-4">
                <v-flex xs12>
                  <v-card outlined width="100%">
                    <v-container fluid>
                      <v-layout>
                        <v-flex xs6>
                          <v-card-title class="subtitle-1 font-weight-black"
                            >相关凭证</v-card-title
                          >
                          <v-simple-table>
                            <thead>
                              <tr>
                                <th class="text-center">凭证号</th>
                                <th class="text-center">顺序</th>
                                <th class="text-center">操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                class="my-2"
                                v-for="(item, i) in currentSubTask.certificate"
                                :key="`f-${i}`"
                                @click="currentCertificate = item"
                                :style="
                                  currentCertificate.uniNo === item.uniNo
                                    ? `background-color:#efefef36`
                                    : ``
                                "
                              >
                                <td>{{ item.uniNo }}</td>
                                <td>{{ item.ord }}</td>
                                <td>
                                  <v-btn
                                    color="error"
                                    icon
                                    @click="removeCertificate(i)"
                                  >
                                    <v-icon>mdi-close</v-icon>
                                  </v-btn>
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                          <v-btn
                            class="mt-3"
                            rounded
                            color="primary"
                            outlined
                            @click="searchCertificateDialog = true"
                          >
                            <v-icon size="20">mdi-plus</v-icon>&nbsp;新增凭证
                          </v-btn>
                        </v-flex>
                        <v-flex xs6 d-flex>
                          <v-layout fill-height justify-center align-center>
                            <preview-certificate
                              :ord="currentCertificate.ord"
                              :uniNo="currentCertificate.uniNo"
                            ></preview-certificate>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs4 class="pl-2">
              <v-card outlined width="100%">
                <v-card-title class="subtitle-1 font-weight-black"
                  >相关文件</v-card-title
                >
                <v-container fluid>
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th class="text-center">名称</th>
                        <th class="text-center">创建时间</th>
                        <th class="text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="my-2"
                        v-for="(item, i) in currentSubTask.file"
                        :key="`f-${i}`"
                      >
                        <td class="pl-3 pr-2">{{ item.name }}</td>
                        <td class="pl-3 pr-2">
                          {{ item.createdAt | format('yyyy-MM-dd hh:mm') }}
                        </td>
                        <td class="pl-3 pr-2">
                          <v-btn icon @click="downloadFile(item)">
                            <v-icon size="20">mdi-download-outline</v-icon>
                          </v-btn>
                          <v-btn icon @click="removeFile(item)" color="error">
                            <v-icon size="20">mdi-close</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                  <v-btn
                    class="mt-3"
                    rounded
                    color="primary"
                    outlined
                    @click="fileDialog = true"
                  >
                    <v-icon size="20">mdi-plus</v-icon>&nbsp;链接文件
                  </v-btn>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="searchCertificateDialog" persistent>
      <v-sheet class="text-center" height="750" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >搜索凭证</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="searchCertificateDialog = false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <search-certificate
          @insertCertificate="insertCertificate"
        ></search-certificate>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="fileDialog" persistent>
      <v-sheet class="text-center" height="750" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >项目文件</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="fileDialog = false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <document :window="true" @linkFile="linkFile"></document>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TaskService from '@/service/taskService';
import { SubTask, SubTaskCertificate } from '@/types/task';
import document from '@/views/project/document/Document.vue';
import searchCertificate from '@/components/finance/certificate/SearchCertificate.vue';
import previewCertificate from '@/components/finance/certificate/PreviewCertificate.vue';

@Component({
  components: {
    document,
    'search-certificate': searchCertificate,
    'preview-certificate': previewCertificate
  }
})
export default class SubTaskList extends Vue {
  @Prop({ default: () => ({ data: [] }) }) private subTask!: {
    data: [];
  };

  private editSubTaskDialog: boolean = false;

  private searchCertificateDialog: boolean = false;

  private fileDialog: boolean = false;

  private currentCertificate: SubTaskCertificate = { uniNo: '', ord: '' };

  private currentSubTask: SubTask = {
    id: '',
    name: '',
    createdAt: '',
    status: 0,
    file: [],
    content: [],
    certificate: []
  };

  private headers = [
    {
      text: '状态',
      value: 'status',
      align: 'center',
      sortable: false
    },
    {
      text: '名称',
      value: 'name',
      align: 'center',
      sortable: false
    },
    {
      text: '操作',
      value: 'actions',
      align: 'center',
      sortable: false
    }
  ];

  private async createSubTask() {
    const newSubTask = new SubTask();
    newSubTask.name = '未命名子任务';
    newSubTask.content = [];

    await TaskService.createSubTask(this.$route.params.taskID, newSubTask);
    await TaskService.getTaskInfo(this.$route.params.taskID);
  }

  private async copySubTask(originalSubTask: SubTask) {
    const newSubTask = new SubTask();
    newSubTask.name = originalSubTask.name;
    newSubTask.content = originalSubTask.content;

    await TaskService.createSubTask(this.$route.params.taskID, newSubTask);
    await TaskService.getTaskInfo(this.$route.params.taskID);
  }

  private async updateSubTask() {
    await TaskService.updateSubTask(
      this.$route.params.taskID,
      this.currentSubTask.id!,
      this.currentSubTask.name!,
      this.currentSubTask.content!,
      this.currentSubTask.file!,
      this.currentSubTask.certificate!
    );
    await TaskService.getTaskInfo(this.$route.params.taskID);
    this.editSubTaskDialog = false;
  }

  private async deleteSubTask(subTaskID: string) {
    const res = await this.$confirm('此操作无法恢复', {
      title: '确认删除?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await TaskService.deleteSubTask(this.$route.params.taskID, subTaskID);
      await TaskService.getTaskInfo(this.$route.params.taskID);
    }
  }

  private insertContent() {
    this.currentSubTask.content!.push({
      property: '',
      description: '',
      expect: '',
      reality: '',
      status: false,
      review: ''
    });
  }

  private removeContent(i: number) {
    this.currentSubTask.content!.splice(i, 1);
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
    this.currentSubTask.certificate!.splice(i, 1);
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
    window.open(`/api/file/download?sName=${item.sName}&type=upload`, '_blank');
    // await FileService.downloadFile(item.sName);
  }

  // private showFile(item: any) {}

  private removeFile(item: any) {
    const index = (this.currentSubTask.file as any).indexOf(item);
    (this.currentSubTask.file as any).splice(index, 1);
  }

  get subTaskShow() {
    const { subTask } = this;
    if (subTask.data) {
      for (let i = 0; i < subTask.data.length; i += 1) {
        const item = subTask.data[i] as any;
        item.status = 1;
        for (let j = 0; j < item.content.length; j += 1) {
          const contentItem = item.content[j];
          // if any of subtask_content's status is 2,
          // this subtask's status will be false
          if (!contentItem.status) {
            item.status = 2;
            break;
          }
        }
      }

      return subTask;
    }
    return { data: [] };
  }
}
</script>
