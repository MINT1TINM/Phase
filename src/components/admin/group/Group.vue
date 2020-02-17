<template>
  <v-layout>
    <v-flex
      xs12
      class="inner-sidebar-withoutpadding"
      style="height:calc(100vh - 48px);overflow-y:auto"
    >
      <v-toolbar class="transparent" dense>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="createGroupDialog = true">
            <v-icon size="20">mdi-plus</v-icon>&nbsp;新建群组
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-simple-table class="transparent">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">名称</th>
              <th class="text-left">简介</th>
              <th class="text-left">创建时间</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in groupList"
              :key="`user-${i}`"
              @click="showInfo(item.id)"
            >
              <td class="caption">{{ item.name }}</td>
              <td class="caption">{{ item.description }}</td>
              <td class="caption">
                {{ item.createdAt | format('yyyy-MM-dd') }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-flex>

    <v-navigation-drawer width="800" right temporary fixed v-model="infoNav">
      <group-info
        :groupID="currentGroupID"
        @updateGroupList="getGroup"
      ></group-info>
    </v-navigation-drawer>

    <v-dialog persistent v-model="createGroupDialog" width="300">
      <v-card>
        <v-toolbar flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >新建群组</v-toolbar-title
          >
        </v-toolbar>
        <v-container fluid>
          <v-form ref="createGroupForm">
            <v-text-field
              dense
              outlined
              single-line
              hide-details
              v-model="newGroupName"
              :rules="[v => !!v || '']"
              label="群组名称"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn rounded color="primary" depressed @click="createGroup"
            >确认</v-btn
          >
          <v-btn rounded text @click="createGroupDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { Group } from '@/types/company';
import groupInfo from './GroupInfo.vue';

@Component({
  components: {
    'group-info': groupInfo
  }
})
export default class AdminGroup extends Vue {
  groupList: Group[] = [];

  createGroupDialog: boolean = false;

  infoNav: boolean = false;

  newGroupName: string = '';

  currentGroupID: string = '';

  async createGroup() {
    await CompanyService.createGroup(this.newGroupName);
    this.createGroupDialog = false;
    this.newGroupName = '';
    await this.getGroup();
  }

  async getGroup() {
    const rsp = await CompanyService.getGroup();
    this.groupList = rsp.group;
  }

  async showInfo(id: string) {
    this.infoNav = true;
    this.currentGroupID = id;
  }

  async mounted() {
    this.getGroup();
  }
}
</script>

<style scoped></style>
