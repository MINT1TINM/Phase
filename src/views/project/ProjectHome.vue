<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-title class="subtitle-1 font-weight-black">
            创建
            <v-spacer></v-spacer>
            <v-btn
              text
              rounded
              @click="$router.push({ path: `/template#foryou` })"
            >
              更多模版
              <v-icon size="20" class="ml-1">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <transition appear appear-active-class="fade-up-enter">
              <v-layout row wrap>
                <v-flex xs3>
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      :elevation="hover ? 8 : 0"
                      @click="createProjectDialog = true"
                      outlined
                    >
                      <v-img height="150">
                        <v-layout fill-height justify-center align-center>
                          <v-icon size="30">mdi-plus</v-icon>
                        </v-layout>
                      </v-img>
                    </v-card>
                  </v-hover>
                  <v-card-title class="body-2 font-weight-black">
                    <v-layout justify-center>新建空白项目</v-layout>
                  </v-card-title>
                </v-flex>

                <v-flex
                  xs3
                  v-for="(item, i) in templateList.slice(0, 3)"
                  :key="`template-${i}`"
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      :elevation="hover ? 8 : 0"
                      outlined
                      @click="
                        generateProjectDialog = true;
                        getTemplateInfo(item.id);
                        currentTemplateID = item.id;
                      "
                    >
                      <v-img
                        class="white--text"
                        height="150"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      ></v-img>
                    </v-card>
                  </v-hover>
                  <v-card-title class="body-2 font-weight-black">
                    <v-layout justify-center>{{ item.name }}</v-layout>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </transition>
          </v-container>

          <v-card-title class="subtitle-1 font-weight-black">
            我的项目
            <v-spacer></v-spacer>
          </v-card-title>

          <v-toolbar class="mt-2" dense flat color="transparent">
            <v-btn
              icon
              @click="
                restoreOptions();
                filt();
              "
              ><v-icon size="20">mdi-close</v-icon></v-btn
            >
            <v-select
              dense
              outlined
              hide-details
              class="body-2"
              label="状态"
              style="max-width:150px"
              :items="statusList"
              v-model="options.status"
            ></v-select>
            <v-select
              dense
              outlined
              hide-details
              class="body-2 ml-3"
              label="类型"
              style="max-width:150px"
              :items="typeList"
              item-text="name"
              item-value="id"
              v-model="options.type"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn outlined @click="filt">筛选</v-btn>
          </v-toolbar>

          <v-container>
            <transition appear appear-active-class="fade-up-enter">
              <v-layout>
                <v-col cols="12" class="pa-0">
                  <v-data-table
                    class="transparent"
                    :headers="headers"
                    :items="projectListShow"
                  >
                    <template v-slot:item.type="{ item }">
                      <div v-if="item.extraInfo.type == 0">
                        竣工结算审计
                      </div>
                      <div v-else-if="item.extraInfo.type == 1">
                        全过程投资审计基建工程
                      </div>
                      <div v-else-if="item.extraInfo.type == 2">
                        全过程投资审计修缮工程
                      </div>
                    </template>
                    <template v-slot:item.company="{ item }">
                      <div v-if="item.extraInfo.company">
                        {{ item.extraInfo.company.projectCompany.name }}
                      </div>
                    </template>
                    <template v-slot:item.area="{ item }">
                      {{ item.extraInfo.area }}
                    </template>
                    <template v-slot:item.status="{ item }">
                      {{ item.extraInfo.status }}
                    </template>
                    <template v-slot:item.investment="{ item }">
                      ¥ {{ (item.extraInfo.investment || 0).toFixed(2) }}
                      万元
                    </template>
                    <template v-slot:item.price="{ item }">
                      ¥ {{ (item.extraInfo.price || 0).toFixed(2) }}
                      万元
                    </template>
                    <template v-slot:item.auditPrice="{ item }">
                      ¥ {{ (item.extraInfo.auditPrice || 0).toFixed(2) }}
                      万元
                    </template>
                    <template v-slot:item.checkPrice="{ item }">
                      <div v-if="item.extraInfo.check">
                        ¥ {{ (item.extraInfo.check.price || 0).toFixed(2) }}
                        万元
                      </div>
                      <div v-else>
                        {{ (0).toFixed(2) }}
                        万元
                      </div>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn v-on="on" text>
                            操作
                            <v-icon size="20" class="ml-2">
                              mdi-chevron-down
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-list dense>
                          <v-list-item @click="goToProject(item)">
                            <v-icon size="20">
                              mdi-information-outline
                            </v-icon>

                            <v-list-item-action class="body-2">
                              详情
                            </v-list-item-action>
                          </v-list-item>
                          <v-list-item @click="goToAssign(item)">
                            <v-icon size="20">
                              mdi-call-split
                            </v-icon>

                            <v-list-item-action class="body-2">
                              分配
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                  </v-data-table>
                </v-col>
              </v-layout>
            </transition>
          </v-container>
        </v-flex>
      </v-layout>

      <v-dialog v-model="createProjectDialog" width="300" persistent>
        <v-card>
          <v-toolbar flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black"
              >新建项目</v-toolbar-title
            >
          </v-toolbar>
          <v-container fluid>
            <v-form ref="createProjectForm">
              <dim-form
                dense
                keyName="create-project"
                :formContent="createProjectContent"
                :target="createProjectInfo"
              ></dim-form>
            </v-form>
          </v-container>
          <v-card-actions class="justify-center">
            <v-btn
              rounded
              color="primary darken-1"
              depressed
              @click="createProject"
              >确认</v-btn
            >
            <v-btn rounded text @click="createProjectDialog = false"
              >取消</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="generateProjectDialog" width="500" persistent>
        <v-card>
          <v-toolbar flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black"
              >生成项目</v-toolbar-title
            >
          </v-toolbar>
          <v-container fluid>
            <v-form ref="createProjectForm">
              <v-text-field
                v-model="newProjectName"
                outlined
                dense
                single-line
                hide-details
                label="名称"
              ></v-text-field>
            </v-form>
            <v-card outlined class="mt-3">
              <v-treeview
                class="font-weight-black body-2"
                dense
                hoverable
                open-on-click
                :items="templateInfo.process"
                item-children="task"
              >
                <template v-slot:prepend="{ item }">
                  <span v-if="!item.task">任务</span>
                  <span v-else>过程</span>
                </template>
              </v-treeview>
            </v-card>
          </v-container>
          <v-card-actions class="justify-center">
            <v-btn
              rounded
              color="primary darken-1"
              depressed
              @click="generateProject()"
              >确认</v-btn
            >
            <v-btn rounded text @click="generateProjectDialog = false"
              >取消</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ProjectService from '@/service/projectService';
import appBar from '@/components/common/app-bar/AppBar.vue';

import UserService from '@/service/userService';
import { Authorization, UserInfo } from '@/types/user';
import { ProjectTemplate, Project } from '@/types/project';
import WorkflowService from '@/service/workflowService';
import { FlowLinkTask } from '@/types/workflow';

const projectModule = namespace('project');
const userModule = namespace('user');
const systemModule = namespace('system');

@Component({
  components: {
    'app-bar': appBar
  }
})
export default class ProjectHome extends Vue {
  @projectModule.Getter('projectList') projectList!: Project[];
  @projectModule.Mutation('updateCurrentProjectID')
  updateCurrentProjectID: any;
  @projectModule.Mutation('clearCurrentProjectID')
  clearCurrentProjectID: any;

  @projectModule.State('statusList') statusList!: string[];
  @projectModule.State('typeList') typeList!: any[];
  @projectModule.State('options') options!: any;

  @projectModule.Mutation('updateOptions') updateOptions!: any;
  @projectModule.Mutation('restoreOptions') restoreOptions!: any;
  @projectModule.Mutation('updateViewMode') updateViewMode!: (
    v: string
  ) => void;
  @userModule.Getter('authorization')
  authorization!: Authorization;
  @userModule.Getter('userInfo')
  userInfo!: UserInfo;
  @systemModule.Getter('systemName') systemName!: string;

  createProjectDialog: boolean = false;
  generateProjectDialog: boolean = false;
  createProjectContent = [
    {
      title: '名称',
      type: 'text-field',
      name: 'name'
    }
  ];
  createProjectInfo = new Project();

  templateList: ProjectTemplate[] = [];
  templateInfo: ProjectTemplate = new ProjectTemplate();
  currentTemplateID: string = '';
  newProjectName: string = '';
  tab = 'tab-1';
  assignDialog = false;
  projectListShow: Project[] = [];

  goToProject(p: Project) {
    this.updateCurrentProjectID(p.id);
    if (p.extraInfo.started) {
      this.$router.push({ path: '/dashboard' });
    } else {
      this.$router.push({ path: '/settings' });
    }
  }

  goToAssign(p: Project) {
    this.updateCurrentProjectID(p.id);
    this.$router.push({ path: `/assign` });
  }

  get headers() {
    return [
      {
        text: '编号',
        value: 'code',
        sortable: false
      },
      {
        text: '名称',
        value: 'name',
        sortable: false
      },
      {
        text: '类型',
        value: 'type',
        sortable: false
      },
      {
        text: '工程管理单位',
        value: 'company',
        sortable: false
      },
      {
        text: '校区',
        value: 'area',
        sortable: false
      },
      {
        text: '状态',
        value: 'status',
        sortable: false
      },
      {
        text: '投资审计',
        value: 'investment',
        sortable: false
      },
      {
        text: '合同金额',
        value: 'price',
        sortable: false
      },
      {
        text: '送审金额',
        value: 'auditPrice',
        sortable: false
      },
      {
        text: '审定金额',
        value: 'checkPrice',
        sortable: false
      },
      {
        text: '操作',
        value: 'action',
        sortable: false
      }
    ];
  }

  get optionsShow() {
    return this.options;
  }

  set optionsShow(v) {
    this.updateOptions(v);
  }

  filt() {
    this.projectListShow = this.projectList
      .filter(e => {
        if (this.options.type == 0) return true;
        return e.extraInfo.type == this.options.type;
      })
      .filter(e => {
        if (this.options.status == 0) return true;
        return e.extraInfo.status == this.options.status;
      });
  }

  async createProject() {
    try {
      this.createProjectInfo.extraInfo.status = '立项申请';
      const rsp = await ProjectService.createProject(this.createProjectInfo);
      this.$snack('创建成功');
      await UserService.getUserInfo(this.authorization.userID);
      this.getProjectList();

      this.goToProject(rsp.project);
    } catch (err) {
      console.log(err);
      this.$snack('创建失败');
    }
    this.createProjectDialog = false;
  }

  async generateProject() {
    try {
      await ProjectService.generateProject(
        this.newProjectName,
        this.currentTemplateID
      );

      await UserService.getUserInfo(this.authorization.userID);
      this.getProjectList();

      this.newProjectName = '';
      this.generateProjectDialog = false;
    } catch (err) {
      console.log(err);
      this.$snack('创建失败');
    }
  }

  async getProjectList() {
    await ProjectService.getProjectList(this.authorization.userID);
  }

  async getTemplateList() {
    this.templateList = await ProjectService.getProjectTemplateList(
      this.authorization.userID
    );
  }

  async getTemplateInfo(templateID: string) {
    const rsp = await ProjectService.getTemplateInfo(templateID);
    this.templateInfo = rsp.template;
  }

  async mounted() {
    this.clearCurrentProjectID();
    this.getTemplateList();
    await this.getProjectList();

    this.filt();
  }
}
</script>

<style scoped></style>
