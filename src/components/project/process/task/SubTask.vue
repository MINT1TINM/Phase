<template>
  <div>
    <b>subTaskMember:</b>
    {{ subTaskMember }}
    <b>currentSubTask:</b>
    {{ currentSubTask }}
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
          <!-- {{props.item.status}} -->
          <span v-if="props.item.status == '未开始'">
            {{ props.item.status }}
            <v-icon color="#3A80E7">mdi-alert-circle-outline</v-icon>
          </span>
          <span v-if="props.item.status == '处理中'">
            {{ props.item.status }}
            <v-icon color="#EB8329">mdi-alert-circle-outline</v-icon>
          </span>
          <span v-if="props.item.status == '已完成'">
            {{ props.item.status }}
            <v-icon color="#7AC09E">mdi-alert-circle-outline</v-icon>
          </span>
        </template>
        <template v-slot:item.detail="props">
          <span v-if="props.item.startDate && props.item.startDate">
            {{ props.item.startDate | format('MM.dd') }} ~
            {{ props.item.endDate | format('MM.dd') }} 共{{
              Math.floor(
                (new Date(props.item.endDate).getTime() -
                  new Date(props.item.startDate).getTime()) /
                  (24 * 3600 * 1000)
              )
            }}天
          </span>
          <span v-if="props.item.member"
            >{{ props.item.member.length }}名成员</span
          >
        </template>
        <template v-slot:item.color="props">
          <v-btn
            v-if="props.item.color"
            outlined
            :color="taskColor[props.item.color]"
            >{{ props.item.color }}</v-btn
          >
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
    <v-bottom-sheet inset v-model="editSubTaskDialog" persistent>
      <v-sheet class="text-center" height="800" style="overflow:auto">
        <v-card flat>
          <v-toolbar flat>
            <span class="headline">{{ currentSubTask.name }}</span>

            <v-spacer></v-spacer>
            <v-btn rounded text @click="editSubTaskDialog = false">
              <v-icon size="20">mdi-close</v-icon>&nbsp;取消
            </v-btn>
            <v-btn rounded text @click="updateSubTask">
              <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form ref="subTaskInfoForm">
              <dim-form
                :formContent="subTaskInfoContent"
                :target="currentSubTask"
              ></dim-form>
            </v-form>
          </v-card-text>
        </v-card>
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
import { Task, SubTask, SubTaskCertificate } from '@/types/task';
import document from '@/views/project/document/Document.vue';
import searchCertificate from '@/components/finance/certificate/SearchCertificate.vue';
import previewCertificate from '@/components/finance/certificate/PreviewCertificate.vue';
import { namespace } from 'vuex-class';
const taskModule = namespace('task');
const projectModule = namespace('project');

@Component({
  components: {
    document,
    'search-certificate': searchCertificate,
    'preview-certificate': previewCertificate
  }
})
export default class SubTaskList extends Vue {
  @Prop({ default: () => ({ data: [] }) }) subTask!: {
    data: any[];
  };
  @taskModule.Getter('currentTask') currentTask!: Task;
  @projectModule.Getter('projectMemberCache') projectMemberCache: any;

  editSubTaskDialog: boolean = false;

  searchCertificateDialog: boolean = false;

  fileDialog: boolean = false;

  currentCertificate: SubTaskCertificate = { uniNo: '', ord: '' };

  currentSubTask: SubTask = {
    id: '',
    status: '',
    name: '',
    createdAt: '',
    color: '',
    startDate: '',
    endDate: '',
    member: { data: [] },
    content: [],
    certificate: []
  };

  headers = [
    {
      text: '状态',
      value: 'status',
      align: 'center',
      sortable: false
    },
    {
      text: '等级',
      value: 'color',
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
      text: '详情',
      value: 'detail',
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
  taskColor = {
    非常紧急: '#E53935',
    非常重要: '#FB8C00',
    紧急: '#FFD708',
    重要: '#29B6F6',
    一般: '#76CC49'
  };
  taskStatus = {};
  subTaskInfoContent = [
    {
      type: 'select',
      title: '状态',
      name: 'status',
      text: 'name',
      value: 'name',
      list: [
        {
          name: '未开始',
          status: 0,
          color: '#3A80E7'
        },
        {
          name: '处理中',
          status: 1,
          color: '#EB8329'
        },
        {
          name: '已完成',
          status: 2,
          color: '#7AC09E'
        }
      ]
    },
    {
      type: 'text-field',
      title: '任务名称',
      name: 'name'
    },
    {
      type: 'date-range',
      title: '计划时间',
      nameStart: 'startDate',
      nameEnd: 'endDate'
    },
    {
      type: 'select',
      title: '任务等级',
      name: 'color',
      text: 'name',
      value: 'name',
      list: [
        {
          name: '非常紧急',
          color: '#E53935'
        },
        {
          name: '非常重要',
          color: '#FB8C00'
        },
        {
          name: '紧急',
          color: '#F8CF5E'
        },
        {
          name: '重要',
          color: '#29B6F6'
        },
        {
          name: '一般',
          color: '#76CC49'
        }
      ]
    },
    {
      type: 'multi-select',
      title: '成员',
      name: 'member',
      chips: true,
      text: 'nickName',
      value: 'userID',
      list: [] //this.subTaskMember
    }
  ];
  taskMember: any[] = [];
  get subTaskMember() {
    // console.log(
    //   'subTaskMember:',
    //   this.currentTask.member.data.map(e => this.projectMemberCache(e))
    // );
    console.log('this.currentTask:', this.currentTask);

    return (this.currentTask.member.data || []).map(e =>
      this.projectMemberCache(e)
    );
  }
  async createSubTask() {
    const newSubTask = new SubTask();
    newSubTask.name = '未命名子任务';
    newSubTask.status = '未开始';
    newSubTask.content = [];
    // const d = new Date();
    // newSubTask.startDate = `${d.getFullYear()}-${d.getMonth() +
    //   1}-${d.getDate()}`;
    newSubTask.color = '一般';

    await TaskService.createSubTask(this.$route.params.taskID, newSubTask);
    await TaskService.getTaskInfo(this.$route.params.taskID);
  }

  async copySubTask(originalSubTask: SubTask) {
    const newSubTask = new SubTask();
    newSubTask.name = originalSubTask.name;
    newSubTask.status = originalSubTask.status;
    newSubTask.content = originalSubTask.content;
    newSubTask.color = originalSubTask.color;
    newSubTask.startDate = originalSubTask.startDate;
    newSubTask.endDate = originalSubTask.endDate;
    newSubTask.member = originalSubTask.member;
    console.log('originalSubTask:', originalSubTask);
    console.log('newSubTask:', newSubTask);

    await TaskService.createSubTask(this.$route.params.taskID, newSubTask);
    await TaskService.getTaskInfo(this.$route.params.taskID);
  }

  async updateSubTask() {
    // console.log('currentSubTask:', this.currentSubTask);
    await TaskService.updateSubTask(
      this.$route.params.taskID,
      this.currentSubTask
    );
    await TaskService.getTaskInfo(this.$route.params.taskID);
    this.editSubTaskDialog = false;
  }

  async deleteSubTask(subTaskID: string) {
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

  insertContent() {
    this.currentSubTask.content!.push({
      property: '',
      description: '',
      expect: '',
      reality: '',
      status: false,
      review: ''
    });
  }

  removeContent(i: number) {
    this.currentSubTask.content!.splice(i, 1);
  }

  insertCertificate(certificate: SubTaskCertificate) {
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

  removeCertificate(i: number) {
    this.currentSubTask.certificate!.splice(i, 1);
  }

  linkFile(v: any) {
    // if (!this.currentSubTask.file) {
    //   (this.currentSubTask.file as any) = [];
    // }
    // (this.currentSubTask.file as any).push(v);
    // // remove duplicated
    // (this.currentSubTask.file as any) = Array.from(
    //   new Set(this.currentSubTask.file)
    // );
    // console.log(this.currentSubTask.file);
    // this.fileDialog = false;
  }

  async downloadFile(item: any) {
    window.open(`/api/file/download?sName=${item.sName}`, '_blank');
    // await FileService.downloadFile(item.sName);
  }

  //  showFile(item: any) {}

  // removeFile(item: any) {
  //   const index = (this.currentSubTask.file as any).indexOf(item);
  //   (this.currentSubTask.file as any).splice(index, 1);
  // }

  get subTaskShow() {
    const { subTask } = this;
    // console.log('subTask', subTask);
    if (subTask.data) {
      // for (let i = 0; i < subTask.data.length; i += 1) {
      //   let item = subTask.data[i] as any;
      //   // // item.status = 1;
      //   // for (let j = 0; j < item.content.length; j += 1) {
      //   //   const contentItem = item.content[j];
      //   //   // if any of subtask_content's status is 2,
      //   //   // this subtask's status will be false
      //   //   if (!contentItem.status) {
      //   //     // item.status = 2;
      //   //     break;
      //   //   }
      //   // }
      //   item.member = item.member || { data: [] };
      // }

      return subTask;
    }
    return [];
  }
}
</script>
