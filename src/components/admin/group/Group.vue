<template>
  <v-layout>
    <v-flex
      xs12
      class="inner-sidebar-withoutpadding"
      style="height:calc(100vh - 48px);overflow-y:auto"
    >
      <v-row no-gutters>
        <v-col cols="3" class="inner-sidebar-withoutpadding">
          <v-toolbar class="transparent" dense flat>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn text @click="createGroupDialog = true">
                <v-icon class="mr-2" size="20">mdi-plus</v-icon>新建群组
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-treeview
            style="height:calc(100vh - 96px);overflow-y:auto"
            open-all
            dense
            class="body-2"
            activatable
            :items="groupList"
            item-text="name"
            item-children="children"
            item-key="id"
            :active.sync="active"
            return-object
          ></v-treeview>
        </v-col>
        <v-col cols="9">
          <div v-if="currentGroupID">
            <group-info
              :groupID="currentGroupID"
              @updateGroupList="getGroup"
            ></group-info>

            <v-row no-gutters justify="center" class="mt-10">
              <v-col cols="6">
                <v-btn
                  v-if="currentGroupLevel != 0"
                  block
                  rounded
                  depressed
                  color="error darken-2"
                  @click="deleteGroup(currentGroupID)"
                  >删除群组</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-flex>

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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
  active: Group[] = [];
  createGroupDialog: boolean = false;
  infoNav: boolean = false;
  newGroupName: string = '';

  async createGroup() {
    const g = new Group();
    g.name = this.newGroupName;
    g.parent = this.currentGroupID;
    g.level = this.currentGroupLevel;

    await CompanyService.createGroup(g);

    this.createGroupDialog = false;
    this.newGroupName = '';
    await this.getGroup();
  }

  async getGroup() {
    const rsp = await CompanyService.getGroup();
    this.groupList = rsp.group;
  }

  async deleteGroup(id: string) {
    const rsp = await this.$confirm('此操作无法恢复', {
      title: '删除群组',
      buttonTrueColor: 'error',
      dark: this.$vuetify.theme.dark
    });
    if (rsp) {
      try {
        await CompanyService.deleteGroup(id);
        this.$snack('删除成功');
        this.getGroup();
      } catch (_) {
        this.$snack('删除失败');
      }
    }
  }

  get currentGroupID() {
    return this.active[0]?.id;
  }

  get currentGroupLevel() {
    return this.active[0]?.level;
  }

  async mounted() {
    this.getGroup();
  }
}
</script>

<style scoped></style>
