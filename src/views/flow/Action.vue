<template>
  <div>
    <v-row no-gutters>
      <v-col cols="3">
        <v-toolbar color="transparent" flat dense>
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >ACTION</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="createActionDefineDialog = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list nav dense height="calc(100vh - 96px)" class="overflow-y-auto">
          <v-list-item
            :to="`/action/${item.id}`"
            v-for="(item, i) in actionDefineList"
            :key="`ad-${i}`"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="9" style="height:calc(100vh - 48px)" class="overflow-y-auto">
        <router-view :actionDefineID="$route.params.actionID"></router-view>
      </v-col>
    </v-row>

    <v-dialog width="800" v-model="createActionDefineDialog">
      <v-card>
        <v-container fluid>
          <v-row dense>
            <v-col cols="6">
              <v-subheader>表单</v-subheader>
              <v-list dense style="height: 400px" class="overflow-y-auto">
                <v-list-item-group v-model="sheetTemplateID">
                  <template v-for="(item, i) in sheetTemplateList">
                    <v-list-item :key="`st-${i}`" :value="item.id">
                      <template v-slot:default="{ active, toggle }">
                        <v-list-item-content>
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-checkbox
                            :input-value="active"
                            :true-value="item.id"
                            @click="toggle"
                          ></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-subheader>工作流定义</v-subheader>
              <v-list dense style="height: 400px" class="overflow-y-auto">
                <v-list-item-group v-model="workflowDefineID">
                  <template v-for="(item, i) in workflowList">
                    <v-list-item :key="`st-${i}`" :value="item.id">
                      <template v-slot:default="{ active, toggle }">
                        <v-list-item-content>
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-checkbox
                            :input-value="active"
                            :true-value="item.id"
                            @click="toggle"
                          ></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn rounded depressed @click="createActionDefine">确认</v-btn>
          <v-btn rounded text @click="createActionDefineDialog = false"
            >取消</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import { Instance, ActionDefine, ActionInstance } from '@/types/workflow';
import { Template } from '@/types/sheet';
import ActionInstanceComponent from '@/components/flow/action/ActionInstance.vue';

const userModule = namespace('user');

@Component({
  components: {
    ActionInstanceComponent
  }
})
export default class ActionView extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  workflowDefineID: string = '';
  sheetTemplateID: string = '';
  actionDefineList: ActionDefine[] = [];
  actionInstance: ActionInstance[] = [];
  sheetTemplateList: Template[] = [];
  workflowList: any[] = [];
  content: string = '';

  createActionDefineDialog = false;

  async getActionDefineList() {
    const rsp = await WorkflowService.getActionDefineList();
    this.actionDefineList = rsp.actionDefineList;
  }
  async getActionInstanceList() {
    const rsp = await WorkflowService.getActionInstanceList();
    this.actionDefineList = rsp.actionInstanceList;
  }
  async getWorkflowList() {
    const rsp = await WorkflowService.getWorkflowList(1, 10, this.content);
    this.workflowList = rsp.flow;
  }
  async getSheetTemplateList() {
    const rsp = await SheetService.getSheetTemplateList('', '');
    this.sheetTemplateList = rsp.template;
  }
  async updateActionDefine(ad: ActionDefine) {
    const rsp = await WorkflowService.updateActionDefine(ad);
  }
  async updateActionInstance(ai: ActionInstance) {
    const rsp = await WorkflowService.updateActionInstance(ai);
  }

  async createActionDefine() {
    try {
      const ad = new ActionDefine(
        this.workflowDefineID,
        this.sheetTemplateID,
        this.authorization.userID,
        [],
        {}
      );
      await this.updateActionDefine(ad);
      await this.getActionDefineList();
      this.$snack('创建成功', { color: 'success' });
      this.createActionDefineDialog = false;
    } catch (_) {
      this.$snack('创建失败', { color: 'error' });
    }
  }

  async createActionInstance(sheetDataID: string, actionDefineID: string) {
    const ai = new ActionInstance(
      this.authorization.userID,
      sheetDataID,
      actionDefineID
    );
    await this.updateActionInstance(ai);
    await this.getActionInstanceList();
  }

  @Watch('sheetTemplateID')
  onChanged(v: any) {
    console.log(v);
  }

  async mounted() {
    await Promise.all([
      this.getActionDefineList(),
      this.getWorkflowList(),
      this.getSheetTemplateList()
    ]);
  }
}
</script>

<style scoped>
#action {
  margin-left: 3%;
  margin-right: 3%;
}
</style>
