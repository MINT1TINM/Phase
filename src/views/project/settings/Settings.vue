<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card v-if="!extraInfo.started">
              <v-btn :to="`/`" class="my-2 ml-1" v-if="!extraInfo.started" text>
                <v-icon class="mr-2" size="20">mdi-arrow-left</v-icon>返回首页
              </v-btn>

              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black">
                  进程
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="
                    workflowInstance.nodeID == '开始' || !extraInfo.startFlowID
                  "
                  text
                  @click="updateProjectInfo()"
                >
                  <v-icon size="20" class="mr-2"
                    >mdi-content-save-outline</v-icon
                  >保存修改</v-btn
                >
                <v-btn
                  text
                  @click="submitForReview"
                  v-if="
                    workflowInstance.nodeID == '开始' || !extraInfo.startFlowID
                  "
                >
                  <v-icon size="20" class="mr-2">mdi-check</v-icon>提交审批
                </v-btn>
              </v-toolbar>
              <v-stepper>
                <v-stepper-header>
                  <v-stepper-step
                    :complete="
                      workflowInstance.nodeID == '开始' || extraInfo.started
                    "
                    class="body-2"
                    step="1"
                  >
                    完善信息
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="
                      workflowInstance.nodeID == '审批' || extraInfo.started
                    "
                    class="body-2"
                    step="2"
                  >
                    审计处审批中
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="extraInfo.started"
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
                <v-toolbar-title class="body-2 font-weight-black">
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
                      v-if="extraInfo.started"
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

          <v-col cols="12" class="mt-6">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="body-2 font-weight-black">
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
                      v-if="extraInfo.started"
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

          <v-col cols="12" class="mt-6" v-if="projectType == 0">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="body-2 font-weight-black">
                  送审信息
                </v-toolbar-title>
              </v-toolbar>
              <v-container>
                <dim-form
                  :formContent="finishInfoContent"
                  :target="extraInfo.finishInfo"
                ></dim-form>
                <v-layout row justify-center class="pt-10">
                  <v-flex xs6>
                    <v-btn
                      v-if="extraInfo.started"
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

          <v-col cols="12" class="mt-6">
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
      <v-col cols="6" v-if="projectType == 0">
        <v-row no-gutters>
          <v-col cols="12" class="mb-6">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="body-2 font-weight-black">
                  采购信息
                </v-toolbar-title>
              </v-toolbar>
              <v-container fluid>
                <dim-form
                  :target="extraInfo.stock"
                  :formContent="stockContent"
                ></dim-form>
                <v-layout row justify-center class="pt-10">
                  <v-flex xs6>
                    <v-btn
                      v-if="extraInfo.started"
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
          <v-col cols="12" class="mb-6">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="body-2 font-weight-black">
                  单位信息
                </v-toolbar-title>
              </v-toolbar>
              <v-container fluid>
                <v-row dense>
                  <v-col cols="6">
                    <v-card outlined>
                      <v-card-title class="body-2 font-weight-black">
                        工程主管部门
                      </v-card-title>

                      <v-container fluid>
                        <SearchGroup
                          :id.sync="extraInfo.company.projectDepartment.id"
                          :name.sync="extraInfo.company.projectDepartment.name"
                        >
                        </SearchGroup>

                        <dim-form
                          dense
                          :target="extraInfo.company.projectDepartment"
                          :formContent="companyInfoContent"
                        >
                        </dim-form>
                      </v-container>
                    </v-card>
                  </v-col>

                  <v-col cols="6">
                    <v-card outlined>
                      <v-card-title class="body-2 font-weight-black">
                        施工总承包单位
                      </v-card-title>

                      <v-container fluid>
                        <SearchSupplier
                          :id.sync="extraInfo.company.contractCompany.id"
                          :name.sync="extraInfo.company.contractCompany.name"
                        >
                        </SearchSupplier>

                        <dim-form
                          dense
                          :target="extraInfo.company.contractCompany"
                          :formContent="companyInfoContent"
                        >
                        </dim-form>
                      </v-container>
                    </v-card>
                  </v-col>

                  <v-col cols="6">
                    <v-card outlined>
                      <v-card-title class="body-2 font-weight-black">
                        工程监理单位
                      </v-card-title>
                      <v-container fluid>
                        <SearchSupplier
                          :id.sync="extraInfo.company.projectCompany.id"
                          :name.sync="extraInfo.company.projectCompany.name"
                        ></SearchSupplier>
                        <dim-form
                          dense
                          :target="extraInfo.company.projectCompany"
                          :formContent="companyInfoContent"
                        >
                        </dim-form>
                      </v-container>
                    </v-card>
                  </v-col>

                  <v-col cols="6">
                    <v-card outlined>
                      <v-card-title class="body-2 font-weight-black">
                        代建单位
                      </v-card-title>

                      <v-container fluid>
                        <SearchSupplier
                          :id.sync="extraInfo.company.constructCompany.id"
                          :name.sync="extraInfo.company.constructCompany.name"
                        ></SearchSupplier>
                        <dim-form
                          dense
                          :target="extraInfo.company.constructCompany"
                          :formContent="companyInfoContent"
                        >
                        </dim-form>
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
          <v-col cols="12" class="mb-6">
            <v-card>
              <Assign :projectInfo="currentProject"></Assign>
            </v-card>
          </v-col>
          <v-col cols="12" class="mb-6">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="body-2 font-weight-black">
                  审价结果
                </v-toolbar-title>
              </v-toolbar>
              <v-container fluid>
                <dim-form
                  :target="extraInfo.check"
                  :formContent="checkContent"
                ></dim-form>
                <v-layout row justify-center class="pt-10">
                  <v-flex xs6>
                    <v-btn
                      v-if="extraInfo.started"
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
          <v-col cols="12" class="mb-6">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="body-2 font-weight-black">
                  审计结果
                </v-toolbar-title>
              </v-toolbar>
              <v-container fluid>
                <dim-form
                  :target="extraInfo.checkResult"
                  :formContent="checkResultContent"
                ></dim-form>
                <v-layout row justify-center class="pt-10">
                  <v-flex xs6>
                    <v-btn
                      v-if="extraInfo.started"
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
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ProjectService from '@/service/projectService';
import { Project, ProjectExtraInfo } from '@/types/project';

import WorkflowService from '@/service/workflowService';
import { Instance, FlowLinkTask } from '@/types/workflow';
import { Authorization, UserInfo } from '@/types/user';
import FileService from '@/service/fileService';

import Assign from '@/components/project/dashboard/Assign.vue';
import SearchSupplier from '@/components/common/search/SearchSupplier.vue';
import SearchGroup from '@/components/common/search/SearchGroup.vue';

const systemModule = namespace('system');
const projectModule = namespace('project');
const userModule = namespace('user');

@Component({
  components: {
    SearchSupplier,
    SearchGroup,
    Assign
  }
})
export default class Settings extends Vue {
  @systemModule.Getter('lastPage') lastPage: any;
  @projectModule.Getter('currentProject') currentProject!: Project;
  @projectModule.Getter('currentProjectID') currentProjectID!: string;

  @userModule.Getter('authorization')
  authorization!: Authorization;
  @userModule.Getter('userInfo')
  userInfo!: UserInfo;

  workflowInstance: Instance = new Instance();

  projectInfoList = [
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
      type: 'date-picker',
      disabled: true,
      title: '创建时间',
      name: 'createdAt'
    }
  ];

  get projectExtraInfo() {
    return [
      {
        type: 'select',
        title: '类型',
        changeFunc: () => {
          this.updateProjectInfo();
        },
        name: 'type',
        list: [
          { name: '竣工结算审计', id: 1 },
          { name: '全过程投资审计基建工程', id: 2 },
          { name: '全过程投资审计修缮工程', id: 3 }
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
        type: 'select',
        title: '所在校区',
        name: 'area',
        list: ['徐汇', '奉贤', '金山']
      },
      {
        type: 'select',
        title: '位置',
        name: 'areaDetail',
        list: ['实验一楼', '实验二楼']
      },
      {
        type: 'text-field',
        title: '工程地点',
        name: 'address'
      },
      {
        type: 'tags',
        title: '标签',
        name: 'tags'
      },
      {
        type: 'multi-select-no-wrap',
        title: '经费来源',
        name: 'fundSource',
        list: ['国拨资金', '学校自筹', '科研经费']
      },
      {
        type: 'text-field',
        title: '经费账号',
        name: 'fundAccount'
      },
      {
        type: 'text-field',
        title: '审计处立项编号',
        name: 'auditCode'
      },
      {
        type: 'text-field',
        title: '投资总额',
        name: 'investment',
        prependIcon: '¥',
        inputType: 'number'
      },

      {
        type: 'text-field',
        title: '所属行业',
        name: 'industry'
      },
      {
        type: 'file-input',
        title: '立项文件',
        name: 'file',
        changeFunc: async (v: any) => {
          if (v) {
            const rsp = await FileService.uploadFile(v, '', '');
            this.extraInfo.file = rsp.path;
            this.updateProjectInfo();
          }
        },
        downFunc: () => {
          console.log('download');
          FileService.downloadFileFromFs(this.extraInfo.file);
        }
      }
    ];
  }

  get stockContent() {
    const start = [
      {
        type: 'select',
        title: '采购方式',
        name: 'type',
        text: 'text',
        value: 'value',
        changeFunc: () => {
          this.updateProjectInfo();
        },
        list: [
          {
            text: '非招标',
            value: 0
          },
          {
            text: '二级单位备案',
            value: 1
          },
          {
            text: '公开招投标',
            value: 2
          }
        ]
      },
      {
        type: 'text-field',
        title: '施工总承包合同价',
        name: 'contractPrice',
        prependIcon: '¥',
        inputType: 'number'
      }
    ];
    let c: any[] = [];

    switch (this.extraInfo.stock.type) {
      case 0:
        c = start;
        return c;
        break;
      case 1:
        c = [
          ...start,
          ...[
            {
              type: 'text-field',
              title: '备案编号',
              name: 'achieveCode'
            },
            {
              type: 'file-input',
              title: '备案表附件',
              name: 'achieveFile',
              changeFunc: async (v: any) => {
                if (v) {
                  const rsp = await FileService.uploadFile(v, '', '');
                  this.extraInfo.stock.achieveFile = rsp.path;
                  this.updateProjectInfo();
                }
              },
              downFunc: () => {
                console.log('download');
                FileService.downloadFileFromFs(
                  this.extraInfo.stock.achieveFile
                );
              }
            }
          ]
        ];
        return c;
        break;
      case 2:
        c = [
          ...start,
          ...[
            {
              type: 'text-field',
              title: '采购编号',
              name: 'code'
            },
            {
              type: 'text-field',
              title: '招标采购名称',
              name: 'name'
            },
            {
              type: 'text-field',
              title: '招标采购单位',
              name: 'agentCompany'
            },
            {
              type: 'date-picker',
              title: '采购日期',
              name: 'date'
            },
            { type: 'text-field', title: '招标控制价', name: 'controlPrice' },

            {
              type: 'text-field',
              title: '中标金额',
              name: 'price',
              prependIcon: '¥',
              inputType: 'number'
            },
            {
              type: 'file-input',
              title: '招标蓝图',
              name: 'sketchFile',
              changeFunc: async (v: any) => {
                if (v) {
                  const rsp = await FileService.uploadFile(v, '', '');
                  this.extraInfo.stock.sketchFile = rsp.path;
                  this.updateProjectInfo();
                }
              },
              downFunc: () => {
                FileService.downloadFileFromFs(this.extraInfo.stock.sketchFile);
              }
            },
            {
              type: 'file-input',
              title: '招标文件',
              name: 'file',
              changeFunc: async (v: any) => {
                if (v) {
                  const rsp = await FileService.uploadFile(v, '', '');
                  this.extraInfo.stock.file = rsp.path;
                  this.updateProjectInfo();
                }
              },
              downFunc: () => {
                FileService.downloadFileFromFs(this.extraInfo.stock.file);
              }
            },
            {
              type: 'file-input',
              title: '中标通知书',
              name: 'bidNotification',
              changeFunc: async (v: any) => {
                if (v) {
                  const rsp = await FileService.uploadFile(v, '', '');
                  this.extraInfo.stock.bidNotification = rsp.path;
                  this.updateProjectInfo();
                }
              },
              downFunc: () => {
                FileService.downloadFileFromFs(
                  this.extraInfo.stock.bidNotification
                );
              }
            },
            {
              type: 'file-input',
              title: '中标商务标软件版',
              name: 'bidFinance',
              changeFunc: async (v: any) => {
                if (v) {
                  const rsp = await FileService.uploadFile(v, '', '');
                  this.extraInfo.stock.bidFinance = rsp.path;
                  this.updateProjectInfo();
                }
              },
              downFunc: () => {
                FileService.downloadFileFromFs(this.extraInfo.stock.bidFinance);
              }
            }
          ]
        ];
        return c;

      default:
        break;
    }
  }

  get companyInfoContent() {
    return [
      {
        type: 'text-field',
        title: '企业名称',
        name: 'name',
        readonly: true
      },
      {
        type: 'text-field',
        title: '联系人',
        name: 'contactName'
      },
      {
        type: 'text-field',
        title: '联系人电话',
        name: 'phone'
      }
    ];
  }

  get finishInfoContent() {
    return [
      {
        type: 'text-field',
        title: '送审金额',
        name: 'auditPrice',
        prependIcon: '¥',
        inputType: 'number'
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
        changeFunc: async (v: any) => {
          if (v) {
            const rsp = await FileService.uploadFile(v, '', '');
            this.extraInfo.finishInfo.calFile = rsp.path;
            this.updateProjectInfo();
          }
        },
        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.finishInfo.cadFile);
        }
      },
      {
        type: 'file-input',
        title: '合同书',
        name: 'contractFile',
        changeFunc: async (v: any) => {
          const rsp = await FileService.uploadFile(v, '', '');
          this.extraInfo.finishInfo.contractFile = rsp.path;
          this.updateProjectInfo();
        },
        downFunc: () => {
          FileService.downloadFileFromFs(
            this.extraInfo.finishInfo.contractFile
          );
        }
      },
      {
        type: 'file-input',
        title: '开竣工',
        name: 'projectFile',
        changeFunc: async (v: any) => {
          const rsp = await FileService.uploadFile(v, '', '');
          this.extraInfo.finishInfo.projectFile = rsp.path;
          this.updateProjectInfo();
        },
        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.finishInfo.projectFile);
        }
      },
      {
        type: 'file-input',
        title: '竣工蓝图',
        name: 'cadFile',
        changeFunc: async (v: any) => {
          const rsp = await FileService.uploadFile(v, '', '');
          this.extraInfo.finishInfo.cadFile = rsp.path;
          this.updateProjectInfo();
        },
        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.finishInfo.cadFile);
        }
      },
      {
        type: 'file-input',
        title: '施工图预算',
        name: 'cadPriceFile',
        changeFunc: async (v: any) => {
          const rsp = await FileService.uploadFile(v, '', '');
          this.extraInfo.finishInfo.cadPriceFile = rsp.path;
          this.updateProjectInfo();
        },
        downloadFunc: () => {
          FileService.downloadFileFromFs(
            this.extraInfo.finishInfo.cadPriceFile
          );
        }
      }
    ];
  }

  get checkContent() {
    return [
      {
        type: 'text-field',
        title: '审价金额',
        prependIcon: '¥',
        inputType: 'number',
        name: 'price'
      },
      {
        type: 'date-picker',
        title: '审价日期',
        name: 'date'
      },
      {
        type: 'text-field',
        title: '投资审计审价编号',
        name: 'code'
      },
      {
        type: 'text-field',
        title: '乙方审计费',
        name: 'auditPrice',
        prependIcon: '¥',
        inputType: 'number'
      },
      {
        type: 'file-input',
        title: '审计报告扫描版',
        name: 'report',
        changeFunc: async (v: any) => {
          if (v) {
            const rsp = await FileService.uploadFile(v, '', '');
            this.extraInfo.check.report = rsp.path;
            this.updateProjectInfo();
          }
        },
        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.check.report);
        }
      },
      {
        type: 'file-input',
        title: '审计结算软件版',
        name: 'cal',
        changeFunc: async (v: any) => {
          if (v) {
            const rsp = await FileService.uploadFile(v, '', '');
            this.extraInfo.check.cal = rsp.path;
            this.updateProjectInfo();
          }
        },
        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.check.cal);
        }
      },
      {
        type: 'file-input',
        title: '审计费发票',
        name: 'invoice',
        changeFunc: async (v: any) => {
          if (v) {
            const rsp = await FileService.uploadFile(v, '', '');
            this.extraInfo.check.invoice = rsp.path;
            this.updateProjectInfo();
          }
        },
        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.check.invoice);
        }
      }
    ];
  }

  get checkResultContent() {
    return [
      {
        type: 'text-field',
        title: '审定金额',
        name: 'price',
        prependIcon: '¥',
        inputType: 'number'
      },
      {
        type: 'text-field',
        title: '审计编号',
        name: 'code'
      },
      {
        type: 'date-picker',
        title: '审计编号日期',
        name: 'date'
      },
      {
        type: 'file-input',
        title: '审计报告扫描版',
        name: 'report',
        changeFunc: async (v: any) => {
          if (v) {
            const rsp = await FileService.uploadFile(v, '', '');
            this.extraInfo.checkResult.report = rsp.path;
            this.updateProjectInfo();
          }
        },
        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.checkResult.report);
        }
      }
    ];
  }

  async updateProjectInfo() {
    let p = this.currentProject;
    p.extraInfo = this.extraInfo;
    await ProjectService.updateProjectInfo(p);
  }

  async deleteProject() {
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

  async updateProjectFolder(v: any) {
    await ProjectService.updateProjectFolder(v, this.currentProjectID);
    await ProjectService.getProjectList(this.authorization.userID);
  }

  async getProjectFlow() {
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

  async submitForReview() {
    await this.updateProjectInfo();

    // Init link
    const l = new FlowLinkTask();
    l.extraInfo = {
      type: 'project',
      project: this.currentProject,
      comment: '提交审核'
    };

    const c = await this.$confirm('', {
      title: '确认提交?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      // Create instance if no instance
      if (!this.extraInfo.startFlowID) {
        const rsp = await WorkflowService.createWorkflowInstance(
          1,
          this.authorization.userID,
          this.userInfo.nickName,
          '审计处',
          l
        );
        // mark started
        // this.extraInfo.started = true;
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
            '提交审核',
            this.workflowInstance.procDefId,
            l
          );
          this.$snack('提交成功');
          this.getProjectFlow();
        } catch (err) {
          this.$snack('提交失败');
        }
      }
    }
  }

  get project() {
    return this.currentProject;
  }

  get extraInfo() {
    const newExtraInfo = new ProjectExtraInfo();
    const e = { ...newExtraInfo, ...this.currentProject.extraInfo };
    console.log(this.currentProject.extraInfo);
    return e;
  }

  set extraInfo(v: ProjectExtraInfo) {
    this.extraInfo = v;
  }

  get projectType() {
    return this.extraInfo.type;
  }

  mounted() {
    this.getProjectFlow();
  }
}
</script>

<style scoped></style>
