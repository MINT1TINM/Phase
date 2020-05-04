<template>
  <div>
    <v-row no-gutters>
      <v-col cols="3">
        <v-card>
          <v-toolbar color="transparent" flat dense>
            <v-toolbar-title class="subtitle-1 font-weight-black"
              >流程</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn icon @click="createWorkflowDefineDialog = true">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list
            color="transparent"
            nav
            dense
            height="calc(100vh - 96px)"
            class="overflow-y-auto"
          >
            <v-list-item-group v-model="activeItemIndex">
              <v-list-item
                v-for="(item, i) in workflowDefineList"
                :key="`ad-${i}`"
                @click="workflowDefineID = item.id"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9" style="height:calc(100vh - 48px)" class="overflow-y-auto">
        <WorkflowDefineComponent
          v-if="!!workflowDefineID"
          :workflowDefineID="workflowDefineID"
        />
        <!-- <router-view :workflowDefineID="$route.params.actionID"></router-view> -->
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
import { Instance, WorkflowDefine, ActionInstance } from '@/types/workflow';
import { Template } from '@/types/sheet';
import WorkflowDefineComponent from '@/components/flow/workflow/WorkflowDefineDetail.vue';

const userModule = namespace('user');

@Component({
  components: {
    WorkflowDefineComponent
  }
})
export default class ActionView extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;
  @Prop({ default: () => [] }) workflowDefineList!: WorkflowDefine[];
  @Prop({ default: () => [] }) sheetTemplateList!: Template[];
  @Prop({ default: () => [] }) workflowList!: any[];
  workflowDefineID: string = '';
  activeItemIndex: any = '';

  createWorkflowDefineDialog = false;

  // async updateWorkflowDefine(ad: WorkflowDefine) {
  //   const rsp = await WorkflowService.updateWorkflowDefine(ad);
  // }
  // async updateActionInstance(ai: ActionInstance) {
  //   const rsp = await WorkflowService.updateActionInstance(ai);
  // }

  // async createWorkflowDefine() {
  //   try {
  //     const ad = new WorkflowDefine(
  //       this.ActionName,
  //       this.workflowDefineID,
  //       this.sheetTemplateID,
  //       this.authorization.userID,
  //       this.ActionGroup,
  //       {}
  //     );
  //     await this.updateWorkflowDefine(ad);
  //     this.$snack('创建成功', { color: 'success' });
  //     this.createWorkflowDefineDialog = false;
  //   } catch (_) {
  //     this.$snack('创建失败', { color: 'error' });
  //   }
  // }

  @Watch('sheetTemplateID')
  onChanged(v: any) {
    console.log(v);
  }

  async mounted() {}
}
</script>

<style scoped>
#action {
  margin-left: 3%;
  margin-right: 3%;
}
</style>
