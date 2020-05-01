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
              v-for="(item, i) in actionInstanceList"
              :key="`ad-${i}`"
              @click="actionInstanceID = item.id"
            >
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ item.createdAt | format('yyyy-MM-dd') }}
                </v-list-item-subtitle>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action-text>{{
                item.status
              }}</v-list-item-action-text>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9" style="height:calc(100vh - 48px)" class="overflow-y-auto">
        <!-- <router-view :actionInstanceID="$route.params.instanceID"></router-view> -->
        <ActionInstanceComponent
          v-if="!!actionInstanceID"
          :actionInstanceID="actionInstanceID"
          :approvalAuthority="approvalAuthority"
        />
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
import ActionInstanceComponent from '@/components/flow/action/InstanceDetail.vue';

const userModule = namespace('user');

@Component({
  components: {
    ActionInstanceComponent
  }
})
export default class InstanceView extends Vue {
  @Prop({ default: () => false }) approvalAuthority!: boolean;
  @Prop({ default: () => [] }) actionInstanceList!: ActionInstance[];
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  ActionName: string = '';
  ActionGroup: string[] = [];
  actionInstance: ActionInstance[] = [];
  content: string = '';

  actionInstanceID: string = '';

  createActionDefineDialog = false;

  async mounted() {}
}
</script>

<style scoped>
#action {
  margin-left: 3%;
  margin-right: 3%;
}
</style>
