<template>
  <v-container fluid>
    <v-row dense justify="center">
      <v-col lg="8" md="12">
        <v-row no-gutters>
          <v-col cols="12" class="mb-2">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black">
                  进程
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="submitForReview"
                  v-if="!extraInfo.started || workflowInstance.nodeID == '开始'"
                >
                  <v-icon size="20" class="mr-2">mdi-check</v-icon>提交审批
                </v-btn>
              </v-toolbar>
              <v-stepper>
                <v-stepper-header>
                  <v-stepper-step
                    :complete="workflowInstance.nodeID == '开始'"
                    class="body-2"
                    step="1"
                  >
                    完善信息
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="workflowInstance.nodeID == '审批'"
                    class="body-2"
                    step="2"
                  >
                    审计处审批中
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="
                      workflowInstance.isFinished ||
                        workflowInstance.nodeID == '完成'
                    "
                    step="3"
                    class="body-2"
                    >启动项目</v-stepper-step
                  >
                </v-stepper-header>
              </v-stepper>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black">
                  基本信息
                </v-toolbar-title>
              </v-toolbar>
              <v-container>
                <dim-form
                  :formContent="projectInfoList"
                  :target="currentProject"
                ></dim-form>

                <v-layout>
                  <v-flex xs3>
                    <v-subheader class="body-2 px-1" style="height:36px">
                      封面
                    </v-subheader>
                  </v-flex>
                  <v-flex xs9>
                    <v-img
                      max-width="200"
                      v-if="currentProject.folderURL"
                      :src="
                        `/api/file/download?sName=${currentProject.folderURL}`
                      "
                    ></v-img>
                    <v-file-input
                      dense
                      class="mt-3"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="上传封面"
                      prepend-inner-icon="mdi-camera-outline"
                      prepend-icon=""
                      single-line
                      @change="updateProjectFolder"
                      hide-details
                      outlined
                    ></v-file-input>
                  </v-flex>
                </v-layout>

                <v-layout row justify-center class="pt-10">
                  <v-flex xs6>
                    <v-btn
                      block
                      rounded
                      depressed
                      color="primary darken-1"
                      @click="updateProjectInfo()"
                      >保存</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-col>

          <v-col cols="12" class="mt-2">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black">
                  附加信息
                </v-toolbar-title>
              </v-toolbar>
              <v-container>
                <dim-form
                  :formContent="projectExtraInfo"
                  :target="extraInfo"
                ></dim-form>

                <v-layout row justify-center class="pt-10">
                  <v-flex xs6>
                    <v-btn
                      block
                      rounded
                      depressed
                      color="primary darken-1"
                      @click="updateProjectInfo()"
                      >保存</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-col>

          <v-col cols="12" class="mt-2" v-if="projectType == 0">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black">
                  竣工阶段
                </v-toolbar-title>
              </v-toolbar>
              <v-container>
                <dim-form
                  :formContent="finishInfoContent"
                  :target="extraInfo.finishInfo"
                ></dim-form>
              </v-container>
              <v-container fluid>
                <v-row dense>
                  <v-col cols="4">
                    <v-card outlined>
                      <v-card-title class="body-2 font-weight-black">
                        施工总承包单位
                      </v-card-title>

                      <v-container fluid>
                        <SearchSupplier
                          :id.sync="extraInfo.finishInfo.contractCompany.id"
                          :name.sync="extraInfo.finishInfo.contractCompany.name"
                        >
                        </SearchSupplier>

                        <v-text-field
                          dense
                          class="mt-3"
                          outlined
                          disabled
                          v-model="extraInfo.finishInfo.contractCompany.name"
                          hide-details
                          label="企业名称"
                        ></v-text-field>

                        <v-text-field
                          dense
                          class="mt-3"
                          outlined
                          v-model="
                            extraInfo.finishInfo.contractCompany.contactName
                          "
                          hide-details
                          label="联系人"
                        ></v-text-field>
                        <v-text-field
                          dense
                          v-model="extraInfo.finishInfo.contractCompany.phone"
                          outlined
                          class="mt-3"
                          hide-details
                          label="联系人电话"
                        ></v-text-field>
                      </v-container>
                    </v-card>
                  </v-col>

                  <v-col cols="4">
                    <v-card outlined>
                      <v-card-title class="body-2 font-weight-black">
                        投资监理单位
                      </v-card-title>

                      <v-container fluid>
                        <SearchSupplier
                          :id.sync="extraInfo.finishInfo.investCompany.id"
                        ></SearchSupplier>
                        <v-text-field
                          dense
                          class="mt-3"
                          outlined
                          disabled
                          v-model="extraInfo.finishInfo.investCompany.name"
                          hide-details
                          label="企业名称"
                        ></v-text-field>
                        <v-text-field
                          dense
                          class="mt-3"
                          outlined
                          v-model="extraInfo.finishInfo.investCompany.name"
                          hide-details
                          label="联系人"
                        ></v-text-field>
                        <v-text-field
                          dense
                          v-model="extraInfo.finishInfo.investCompany.phone"
                          outlined
                          class="mt-3"
                          hide-details
                          label="联系人电话"
                        ></v-text-field>
                      </v-container>
                    </v-card>
                  </v-col>

                  <v-col cols="4">
                    <v-card outlined>
                      <v-card-title class="body-2 font-weight-black">
                        工程监理单位
                      </v-card-title>
                      <v-container fluid>
                        <SearchSupplier
                          :id.sync="extraInfo.finishInfo.projectCompany.id"
                        ></SearchSupplier>
                        <v-text-field
                          dense
                          disabled
                          class="mt-3"
                          outlined
                          v-model="extraInfo.finishInfo.projectCompany.name"
                          hide-details
                          label="企业名称"
                        ></v-text-field>
                        <v-text-field
                          dense
                          class="mt-3"
                          outlined
                          v-model="extraInfo.finishInfo.projectCompany.name"
                          hide-details
                          label="联系人"
                        ></v-text-field>
                        <v-text-field
                          dense
                          v-model="extraInfo.finishInfo.projectCompany.phone"
                          outlined
                          class="mt-3"
                          hide-details
                          label="联系人电话"
                        ></v-text-field>
                      </v-container>
                    </v-card>
                  </v-col>

                  <v-col cols="4">
                    <v-card outlined>
                      <v-card-title class="body-2 font-weight-black">
                        代建单位
                      </v-card-title>

                      <v-container fluid>
                        <SearchSupplier
                          :id.sync="extraInfo.finishInfo.constructCompany.id"
                        ></SearchSupplier>
                        <v-text-field
                          dense
                          disabled
                          class="mt-3"
                          outlined
                          v-model="extraInfo.finishInfo.constructCompany.name"
                          hide-details
                          label="企业名称"
                        ></v-text-field>
                        <v-text-field
                          dense
                          class="mt-3"
                          outlined
                          v-model="extraInfo.finishInfo.constructCompany.name"
                          hide-details
                          label="联系人"
                        ></v-text-field>
                        <v-text-field
                          dense
                          v-model="extraInfo.finishInfo.constructCompany.phone"
                          outlined
                          class="mt-3"
                          hide-details
                          label="联系人电话"
                        ></v-text-field>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>

                <v-layout row justify-center class="pt-10">
                  <v-flex xs6>
                    <v-btn
                      block
                      rounded
                      depressed
                      color="primary darken-1"
                      @click="updateProjectInfo()"
                      >保存</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-col>

          <v-col cols="12" class="mt-2">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black">
                  ⚠️危险
                </v-toolbar-title>
              </v-toolbar>

              <v-layout justify-center class="py-3">
                <v-flex xs6>
                  <v-btn
                    @click="deleteProject"
                    color="error"
                    block
                    rounded
                    depressed
                  >
                    <v-icon size="20">mdi-delete-outline</v-icon>&nbsp;删除项目
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ProjectService from '@/service/projectService';
import { Project, ProjectExtraInfo } from '@/types/project';

import SearchSupplier from '@/plugins/search-supplier/Index.vue';
import WorkflowService from '@/service/workflowService';
import { Instance } from '@/types/workflow';
import { Authorization, UserInfo } from '@/types/user';

const systemModule = namespace('system');
const projectModule = namespace('project');
const userModule = namespace('user');

@Component({
  components: {
    SearchSupplier
  }
})
export default class Settings extends Vue {
  @systemModule.Getter('lastPage') private lastPage: any;
  @projectModule.Getter('currentProject') private currentProject!: Project;
  @projectModule.Getter('currentProjectID') private currentProjectID!: string;

  @userModule.Getter('authorization')
  private authorization!: Authorization;
  @userModule.Getter('userInfo')
  private userInfo!: UserInfo;

  private workflowInstance: Instance = new Instance();

  private projectInfoList = [
    {
      type: 'text-field',
      title: '名称',
      name: 'name'
    },
    {
      type: 'text-area',
      title: '简介',
      name: 'description'
    },
    {
      type: 'date-range',
      title: '审计期间',
      nameStart: 'startDate',
      nameEnd: 'endDate'
    },
    {
      type: 'date-picker',
      disabled: true,
      title: '创建时间',
      name: 'createdAt'
    },
    {
      type: 'date-picker',
      title: '实施时间',
      name: 'actionDate'
    }
  ];

  private get projectExtraInfo() {
    return [
      {
        type: 'select',
        title: '类型',
        name: 'type',
        list: [
          { name: '竣工结算审计', id: 0 },
          { name: '全过程投资审计基建工程', id: 1 },
          { name: '全过程投资审计修缮工程', id: 2 }
        ],
        text: 'name',
        value: 'id'
      },
      {
        disabled: true,
        type: 'text-field',
        title: '编号',
        name: 'code'
      },
      {
        type: 'tags',
        title: '标签',
        name: 'tags'
      },
      {
        type: 'text-field',
        title: '工程地点',
        name: 'address'
      },
      {
        type: 'text-field',
        title: '财务处立项编号',
        name: 'financeCode'
      },
      {
        type: 'text-field',
        title: '财务处立项编号',
        name: 'feeCode'
      },
      {
        type: 'text-field',
        title: '投资总额',
        name: 'investment'
      },
      {
        type: 'text-field',
        title: '施工总承包合同价',
        name: 'price'
      },
      {
        type: 'text-field',
        title: '所属行业',
        name: 'industry'
      }
    ];
  }

  private get finishInfoContent() {
    return [
      {
        type: 'date-picker',
        title: '开工日期',
        name: 'startDate'
      },
      {
        type: 'date-picker',
        title: '竣工日期',
        name: 'startDate'
      },
      {
        type: 'text-field',
        title: '送审金额',
        name: 'auditPrice'
      },
      {
        type: 'date-picker',
        title: '送审日期',
        name: 'auditDate'
      },
      {
        type: 'file-input',
        title: '结算书',
        name: 'calFile',
        changeFunc: (v: any) => {
          console.log(v);
        },
        downFunc: () => {
          console.log('download');
        }
      },
      {
        type: 'file-input',
        title: '合同书',
        name: 'contractFile',
        changeFunc: () => {
          console.log('changed');
        },
        downFunc: () => {
          console.log('download');
        }
      },
      {
        type: 'file-input',
        title: '开竣工',
        name: 'projectFile',
        changeFunc: () => {
          console.log('changed');
        },
        downFunc: () => {
          console.log('download');
        }
      },
      {
        type: 'file-input',
        title: '竣工蓝图',
        name: 'cadFile',
        changeFunc: () => {
          console.log('changed');
        },
        downFunc: () => {
          console.log('download');
        }
      },
      {
        type: 'file-input',
        title: '施工图预算',
        name: 'cadPriceFile',
        changeFunc: () => {
          console.log('changed');
        },
        downloadFunc: () => {
          console.log('download');
        }
      }
    ];
  }

  private async updateProjectInfo() {
    let p = this.currentProject;
    p.extraInfo = this.extraInfo;
    await ProjectService.updateProjectInfo(p);
  }

  private async deleteProject() {
    const res = await this.$confirm('此操作无法还原', {
      title: '确认删除?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await ProjectService.deleteProject(this.currentProjectID);
      window.location.href = '/project';
    }
  }

  private async updateProjectFolder(v: any) {
    await ProjectService.updateProjectFolder(v, this.currentProjectID);
    await ProjectService.getProjectList();
  }

  private async getProjectFlow() {
    if (this.extraInfo.startFlowID) {
      this.workflowInstance = {
        ...new Instance(),
        ...(
          await WorkflowService.getWorkflowInstance(
            this.currentProject.extraInfo.startFlowID
          )
        ).instance
      };
    } else {
      this.workflowInstance = new Instance();
    }
  }

  private async submitForReview() {
    const c = await this.$confirm('', {
      title: '确认提交?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      if (!this.extraInfo.startFlowID) {
        const rsp = await WorkflowService.createWorkflowInstance(
          1,
          this.authorization.userID,
          this.userInfo.nickName,
          '审计处'
        );
        // mark started
        this.extraInfo.started = true;
        this.extraInfo.startFlowID = rsp.id;

        await this.updateProjectInfo();
        this.getProjectFlow();
      } else {
        try {
          await WorkflowService.handleTask(
            this.workflowInstance.taskID,
            this.authorization.userID,
            this.userInfo.nickName,
            true,
            this.workflowInstance.id,
            'submit'
          );
          this.$snack('提交成功');
          this.getProjectFlow();
        } catch (err) {
          this.$snack('提交失败');
        }
      }
    }
  }

  private get project() {
    return this.currentProject;
  }

  private get extraInfo() {
    const newExtraInfo = new ProjectExtraInfo();
    const e = { ...newExtraInfo, ...this.currentProject.extraInfo };
    console.log(this.currentProject.extraInfo);
    return e;
  }

  private set extraInfo(v: ProjectExtraInfo) {
    this.extraInfo = v;
  }

  private get projectType() {
    return this.extraInfo.type;
  }

  private mounted() {
    this.getProjectFlow();
  }
}
</script>

<style scoped></style>
