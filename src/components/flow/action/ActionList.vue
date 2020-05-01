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
            <v-btn icon @click="createActionDefineDialog = true">
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
            <v-list-item
              v-for="(item, i) in actionDefineList"
              :key="`ad-${i}`"
              @click="actionDefineID = item.id"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9" style="height:calc(100vh - 48px)" class="overflow-y-auto">
        <ActionDefineComponent
          v-if="!!actionDefineID"
          :actionDefineID="actionDefineID"
        />
        <!-- <router-view :actionDefineID="$route.params.actionID"></router-view> -->
      </v-col>
    </v-row>

    <v-dialog width="800" v-model="createActionDefineDialog">
      <v-card>
        <v-container fluid>
          <v-row dense>
            <v-col cols="6">
              <v-subheader>表单模板</v-subheader>
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
          <!-- <hr class="primary"> -->
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                dense
                outlined
                hide-details
                label="事件名称"
                v-model="ActionName"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                dense
                outlined
                hide-details
                label="所属部门"
                v-model="ActionGroup"
              ></v-select>
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
import ActionDefineComponent from '@/components/flow/action/DefineDetail.vue';

const userModule = namespace('user');

@Component({
  components: {
    ActionDefineComponent
  }
})
export default class ActionView extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;
  @Prop({ default: () => [] }) actionDefineList!: ActionDefine[];
  @Prop({ default: () => [] }) sheetTemplateList!: Template[];
  @Prop({ default: () => [] }) workflowList!: any[];
  actionDefineID: string = '';

  workflowDefineID: string = '';
  sheetTemplateID: string = '';
  ActionName: string = '';
  ActionGroup: string[] = [];
  actionInstance: ActionInstance[] = [];
  content: string = '';

  createActionDefineDialog = false;

  async updateActionDefine(ad: ActionDefine) {
    const rsp = await WorkflowService.updateActionDefine(ad);
  }
  async updateActionInstance(ai: ActionInstance) {
    const rsp = await WorkflowService.updateActionInstance(ai);
  }

  async createActionDefine() {
    try {
      const ad = new ActionDefine(
        this.ActionName,
        this.workflowDefineID,
        this.sheetTemplateID,
        this.authorization.userID,
        this.ActionGroup,
        {}
      );
      await this.updateActionDefine(ad);
      this.$snack('创建成功', { color: 'success' });
      this.createActionDefineDialog = false;
    } catch (_) {
      this.$snack('创建失败', { color: 'error' });
    }
  }

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
