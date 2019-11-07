<template>
  <div>
    <div class="subtitle-2 pl-0 mt-6 mb-1">应用内权限</div>
    <div class="caption pl-0 mb-2">*对管理员用户无效</div>
    <v-card min-height="400" outlined flat>
      <v-tabs show-arrows v-model="tab">
        <v-tab v-for="(item,i) in appList" :key="`ac-${i}`">{{item.name}}</v-tab>
      </v-tabs>
      <v-container fluid>
        <div v-for="(item,i) in permissionList" :key="`p-${i}`">
          <v-switch dense hide-details v-model="permissionList[i]" :label="getCN(i)"></v-switch>
        </div>
      </v-container>
      <v-layout row wrap justify-center class="my-3">
        <v-flex xs8>
          <v-btn block rounded depressed @click="updatePermission">
            <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { App } from '@/types/system';
import { UserPermission, UserPermissionCN } from '@/types/user';
import UserService from '@/service/userService';

const systemModule = namespace('system');

@Component
export default class AppAccess extends Vue {
  @Prop() private permission!: UserPermission

  @Prop() private userID!: string

  @systemModule.Getter('appList') private appList!: App[]

  private currentApp = new App()

  private tab = null

  private permissionShow: UserPermission = new UserPermission(false)

  private getCN(v: string) {
    return (UserPermissionCN as any)[v];
  }

  private async updatePermission() {
    console.log(this.permissionShow);
    await UserService.updateUserPermission(this.userID, this.permissionShow);
    this.$emit('getUserInfo');
  }

  private get permissionList() {
    return (this.permissionShow as any)[this.currentApp.nameEn];
  }

  @Watch('tab')
  private onTabChanged(v: number) {
    this.currentApp = this.appList[v];
  }

  @Watch('permission')
  private onPermissionChanged() {
    this.permissionShow = this.permission;
  }

  private mounted() {
    this.permissionShow = this.permission || new UserPermission(false);
    console.log(this.permissionShow);
  }
}
</script>

<style scoped>
</style>
