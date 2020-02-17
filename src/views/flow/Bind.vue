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
      <v-col cols="9">
        <v-container fluid>
          <v-row dense>
            <v-col cols="3" v-for="(item, i) in permissionList" :key="`p-${i}`">
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
                    append-outer-icon="mdi-check"
                  ></v-text-field>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="3">
        <SearchFlow></SearchFlow>
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

import SearchFlow from '@/components/flow/SearchFlow.vue';

const systemModule = namespace('system');

@Component({
  components: {
    SearchFlow
  }
})
export default class AppAccess extends Vue {
  @systemModule.Getter('appList') appList!: App[];

  currentApp = new App();
  tab = null;
  permissionShow: UserPermission = new UserPermission(false);

  getCN(v: string) {
    return (UserPermissionCN as any)[v];
  }

  get permissionList() {
    return (this.permissionShow as any)[this.currentApp.nameEn];
  }

  @Watch('tab')
  onTabChanged(v: number) {
    this.currentApp = this.appList[v];
  }

  mounted() {}
}
</script>

<style scoped></style>
