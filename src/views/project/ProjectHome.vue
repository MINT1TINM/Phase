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
          <v-toolbar dense flat color="transparent">
            <v-tabs v-model="tab">
              <v-tab href="#tab-1">正在进行</v-tab>
              <v-tab href="#tab-2">待审批</v-tab>
            </v-tabs>
          </v-toolbar>

          <div v-if="tab == `tab-1`">
            <v-toolbar class="mt-2" dense flat color="transparent">
              <span class="mr-3 caption">筛选</span>
              <v-text-field
                dense
                outlined
                flat
                single-line
                hide-details
                label="项目名称"
                style="max-width:200px"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn outlined>
                <v-icon size="20" class="mr-2">mdi-magnify</v-icon>搜索
              </v-btn>
            </v-toolbar>
            <v-container>
              <transition appear appear-active-class="fade-up-enter">
                <v-layout>
                  <v-col cols="12" class="pa-0">
                    <v-simple-table class="transparent">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">编号</th>
                            <th class="text-left">名称</th>
                            <th class="text-left">类型</th>
                            <th class="text-left">工程管理单位</th>
                            <th class="text-left">校区</th>
                            <th class="text-left">状态</th>
                            <th class="text-left">投资审计</th>
                            <th class="text-left">合同金额</th>
                            <th class="text-left">送审金额</th>
                            <th class="text-left">审定金额</th>
                            <th class="text-left">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, i) in runningProject"
                            :key="`project-${i}`"
                          >
                            <td>{{ item.code }}</td>
                            <td>{{ item.name }}</td>
                            <td>
                              <div v-if="item.extraInfo.type == 0">
                                竣工结算审计
                              </div>
                              <div v-else-if="item.extraInfo.type == 1">
                                全过程投资审计基建工程
                              </div>
                              <div v-else-if="item.extraInfo.type == 2">
                                全过程投资审计修缮工程
                              </div>
                            </td>
                            <td>
                              <div v-if="item.extraInfo.company">
                                {{ item.extraInfo.company.projectCompany.name }}
                              </div>
                            </td>
                            <td>
                              {{ item.extraInfo.area }}
                            </td>
                            <td>
                              {{ item.extraInfo.status }}
                            </td>
                            <td>
                              {{ (item.extraInfo.investment || 0).toFixed(2) }}
                              万元
                            </td>
                            <td>
                              {{ (item.extraInfo.price || 0).toFixed(2) }} 万元
                            </td>
                            <td>
                              {{ (item.extraInfo.auditPrice || 0).toFixed(2) }}
                              万元
                            </td>
                            <td>
                              <div v-if="item.extraInfo.check">
                                {{
                                  (item.extraInfo.check.price || 0).toFixed(2)
                                }}
                                万元
                              </div>
                              <div v-else>
                                {{ (0).toFixed(2) }}
                                万元
                              </div>
                            </td>
                            <td>
                              <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                  <v-btn v-on="on" text>
                                    <v-icon size="20" class="mr-2">
                                      mdi-information-outline
                                    </v-icon>
                                    操作
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
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-layout>
              </transition>
            </v-container>
          </div>

          <div v-else-if="tab == `tab-2`">
            <v-container>
              <transition appear appear-active-class="fade-up-enter">
                <v-layout>
                  <v-col cols="12" class="pa-0">
                    <v-simple-table class="transparent">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">编号</th>
                            <th class="text-left">名称</th>
                            <th class="text-left">类型</th>
                            <th class="text-left">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, i) in checkingProject"
                            :key="`project-${i}`"
                          >
                            <td>{{ item.code }}</td>
                            <td>{{ item.name }}</td>
                            <td>
                              <div v-if="item.extraInfo.type == 0">
                                竣工结算审计
                              </div>
                              <div v-else-if="item.extraInfo.type == 1">
                                全过程投资审计基建工程
                              </div>
                              <div v-else-if="item.extraInfo.type == 2">
                                全过程投资审计修缮工程
                              </div>
                            </td>
                            <td>
                              <v-btn @click="goToProject(item)" text>
                                <v-icon size="20" class="mr-2">
                                  mdi-information-outline
                                </v-icon>
                                详情
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-layout>
              </transition>
            </v-container>
          </div>
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
import WorkflowService from '../../service/workflowService';
import { FlowLinkTask } from '../../types/workflow';

const projectModule = namespace('project');
const userModule = namespace('user');
const systemModule = namespace('system');

@Component({
  components: {
    'app-bar': appBar
  }
})
export default class ProjectHome extends Vue {
  createProjectDialog: boolean = false;
  generateProjectDialog: boolean = false;
  createProjectContent = [
    {
      title: '名称',
      type: 'text-field',
      name: 'name'
    }
  ];
  createProjectInfo = {
    name: ''
  };
  projectListShow = [];
  templateList: ProjectTemplate[] = [];
  templateInfo: ProjectTemplate = new ProjectTemplate();
  currentTemplateID: string = '';
  newProjectName: string = '';
  tab = 'tab-1';
  assignDialog = false;

  @projectModule.Getter('projectList') projectList!: Project[];
  @projectModule.Mutation('updateCurrentProjectID')
  updateCurrentProjectID: any;
  @projectModule.Mutation('clearCurrentProjectID')
  clearCurrentProjectID: any;
  @projectModule.Mutation('updateViewMode') updateViewMode!: (
    v: string
  ) => void;

  @userModule.Getter('authorization')
  authorization!: Authorization;
  @userModule.Getter('userInfo')
  userInfo!: UserInfo;

  @systemModule.Getter('systemName') systemName!: string;

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

  async createProject() {
    try {
      const rsp = await ProjectService.createProject(
        this.createProjectInfo.name
      );
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

  get runningProject() {
    return this.projectList.filter(e => {
      return e.extraInfo.started;
    });
  }

  get checkingProject() {
    return this.projectList.filter(e => {
      return !e.extraInfo.started;
    });
  }

  mounted() {
    this.clearCurrentProjectID();
    this.getProjectList();
    this.getTemplateList();
  }
}
</script>

<style scoped></style>
