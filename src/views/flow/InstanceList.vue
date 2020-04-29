<template>
  <div>
    <v-row no-gutters>
      <v-col cols="3">
        <v-card>
          <v-toolbar color="transparent" flat dense>
            <v-toolbar-title class="subtitle-1 font-weight-black"
              >事件</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <!-- <v-btn icon @click="createActionDefineDialog = true">
              <v-icon>mdi-plus</v-icon>
            </v-btn>-->
          </v-toolbar>
          <v-list
            color="transparent"
            nav
            dense
            two-line
            height="calc(100vh - 96px)"
            class="overflow-y-auto"
          >
            <v-list-item
              :to="`/instance/${item.id}`"
              v-for="(item, i) in actionInstanceList"
              :key="`ad-${i}`"
            >
              <v-list-item-content>
                <v-list-item-subtitle>{{
                  item.createdAt | format('yyyy-MM-dd')
                }}</v-list-item-subtitle>
                <v-list-item-title>
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action-text>
                {{ item.status }}
              </v-list-item-action-text>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9" style="height:calc(100vh - 48px)" class="overflow-y-auto">
        <router-view :actionInstanceID="$route.params.instanceID"></router-view>
      </v-col>
    </v-row>
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
// import ActionInstanceComponent from '@/components/flow/action/InstanceDetail.vue';

const userModule = namespace('user');

@Component({
  components: {
    // ActionInstanceComponent
  }
})
export default class InstanceView extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  workflowDefineID: string = '';
  sheetTemplateID: string = '';
  ActionName: string = '';
  ActionGroup: string[] = [];
  actionInstanceList: ActionDefine[] = [];
  actionInstance: ActionInstance[] = [];
  sheetTemplateList: Template[] = [];
  workflowList: any[] = [];
  content: string = '';

  createActionDefineDialog = false;

  async getActionInstanceList() {
    const rsp = await WorkflowService.getActionInstanceList();
    this.actionInstanceList = rsp.actionInstanceList;
  }
  // async getWorkflowList() {
  //   const rsp = await WorkflowService.getWorkflowList(1, 1000, this.content);
  //   this.workflowList = rsp.flow;
  // }
  // async getSheetTemplateList() {
  //   const rsp = await SheetService.getSheetTemplateList('', '');
  //   this.sheetTemplateList = rsp.template;
  // }
  // async updateActionDefine(ad: ActionDefine) {
  //   const rsp = await WorkflowService.updateActionDefine(ad);
  // }
  // async updateActionInstance(ai: ActionInstance) {
  //   const rsp = await WorkflowService.updateActionInstance(ai);
  // }

  // async createActionDefine() {
  //   try {
  //     const ad = new ActionDefine(
  //       this.ActionName,
  //       this.workflowDefineID,
  //       this.sheetTemplateID,
  //       this.authorization.userID,
  //       this.ActionGroup,
  //       {}
  //     );
  //     await this.updateActionDefine(ad);
  //     await this.getactionInstanceList();
  //     this.$snack('创建成功', { color: 'success' });
  //     this.createActionDefineDialog = false;
  //   } catch (_) {
  //     this.$snack('创建失败', { color: 'error' });
  //   }
  // }

  // async createActionInstance(sheetDataID: string, actionDefineID: string) {
  //   const ai = new ActionInstance(
  //     this.authorization.userID,
  //     sheetDataID,
  //     actionDefineID
  //   );
  //   await this.updateActionInstance(ai);
  //   await this.getActionInstanceList();
  // }

  @Watch('sheetTemplateID')
  onChanged(v: any) {
    console.log(v);
  }

  async mounted() {
    await this.getActionInstanceList();
  }
}
</script>

<style scoped>
#action {
  margin-left: 3%;
  margin-right: 3%;
}
</style>
