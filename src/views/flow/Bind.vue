<template>
  <div>
    <v-toolbar dense color="transparent">
      <v-tabs background-color="transparent" show-arrows v-model="tab">
        <v-tab v-for="(item, i) in appList" :key="`ac-${i}`">{{
          item.name
        }}</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-row no-gutters>
      <v-col cols="10">
        <v-container fluid>
          <v-row dense>
            <v-col cols="2" v-for="(item, i) in permissionList" :key="`p-${i}`">
              <v-card>
                <v-toolbar dense flat color="transparent">
                  <v-toolbar-title class="body-2 font-weight-black">
                    {{ getCN(i) }}
                  </v-toolbar-title>
                </v-toolbar>
                <v-container fluid>
                  <v-text-field
                    label="Flow ID"
                    dense
                    outlined
                    single-line
                    hide-details
                  ></v-text-field>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="2">
        <v-card
          style="height:calc(100vh - 96px)"
          class="overflow-y-auto elevation-8"
          color="transparent"
        >
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="body-2 font-weight-black">
              工作流预设
            </v-toolbar-title>
          </v-toolbar>
          <v-container fluid>
            <v-text-field
              solo-inverted
              dense
              flat
              single-line
              hide-details
              label="搜索"
            ></v-text-field>
          </v-container>
          <v-list color="transparent"> </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { App } from '@/types/system';
import { UserPermission, UserPermissionCN } from '@/types/user';
import UserService from '@/service/userService';

const systemModule = namespace('system');

@Component
export default class AppAccess extends Vue {
  @systemModule.Getter('appList') private appList!: App[];

  private currentApp = new App();
  private tab = null;
  private permissionShow: UserPermission = new UserPermission(false);

  private getCN(v: string) {
    return (UserPermissionCN as any)[v];
  }

  private get permissionList() {
    return (this.permissionShow as any)[this.currentApp.nameEn];
  }

  @Watch('tab')
  private onTabChanged(v: number) {
    this.currentApp = this.appList[v];
  }

  private mounted() {}
}
</script>

<style scoped></style>
