<template>
  <div>
    <v-navigation-drawer mini-variant-width="62" app clipped permanent fixed>
      <v-toolbar flat dense>
        <v-btn icon @click="$router.push({ path: `/` })">
          <v-icon size="20">mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="pl-0 subtitle-1 font-weight-black"
          >项目模版</v-toolbar-title
        >
      </v-toolbar>
      <v-list nav dense color="transparent">
        <v-list-item
          link
          v-for="(item, i) in typeList"
          :key="i"
          :to="item.route"
        >
          <template>
            <v-list-item-title style="margin-left:20px">{{
              item.name
            }}</v-list-item-title>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container grid-list-lg class="pa-6">
      <transition appear appear-active-class="fade-up-enter">
        <v-layout row wrap>
          <v-flex xs3 v-for="(item, i) in templateList" :key="`template-${i}`">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 8 : 0"
                outlined
                @click="
                  generateProjectDialog = true;
                  getTemplateInfo(item.id);
                  currentTemplateID = item.id;
                "
              >
                <v-img
                  class="white--text"
                  height="150"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                ></v-img>
              </v-card>
            </v-hover>
            <v-card-title class="body-2 font-weight-black">
              <v-layout justify-center>{{ item.name }}</v-layout>
            </v-card-title>
          </v-flex>
        </v-layout>
      </transition>
    </v-container>

    <v-dialog v-model="generateProjectDialog" width="500" persistent>
      <v-card>
        <v-toolbar flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >生成项目</v-toolbar-title
          >
        </v-toolbar>
        <v-container fluid>
          <v-form ref="createProjectForm">
            <v-text-field
              v-model="newProjectName"
              outlined
              dense
              single-line
              hide-details
              label="名称"
            ></v-text-field>
          </v-form>
          <v-card outlined class="mt-3">
            <v-treeview
              class="font-weight-black body-2"
              dense
              hoverable
              open-on-click
              :items="templateInfo.process"
              item-children="task"
            >
              <template v-slot:prepend="{ item }">
                <span v-if="!item.task">任务</span>
                <span v-else>过程</span>
              </template>
            </v-treeview>
          </v-card>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn
            rounded
            color="primary darken-1"
            depressed
            @click="generateProject()"
            >确认</v-btn
          >
          <v-btn rounded text @click="generateProjectDialog = false"
            >取消</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Authorization } from '@/types/user';
import ProjectService from '@/service/projectService';
import UserService from '@/service/userService';
import { ProjectTemplate } from '@/types/project';

const userModule = namespace('user');

@Component
export default class ProjectTemplateList extends Vue {
  @userModule.Getter('authorization')
  private authorization!: Authorization;

  private typeList = [
    {
      name: '推荐',
      route: '#foryou'
    }
  ];
  private templateList: ProjectTemplate[] = [];
  private generateProjectDialog: boolean = false;
  private templateInfo: ProjectTemplate = new ProjectTemplate();
  private currentTemplateID: string = '';
  private newProjectName: string = '';

  private async getTemplateList() {
    this.templateList = await ProjectService.getProjectTemplateList(
      this.authorization.userID
    );
  }

  private async generateProject() {
    const rsp = await ProjectService.generateProject(
      this.newProjectName,
      this.currentTemplateID
    );
    if (rsp.msg === 'success') {
      this.newProjectName = '';
      this.generateProjectDialog = false;
      await UserService.getUserInfo(this.authorization.userID);
      this.$router.push({ path: '/project' });
    }
  }

  private async getTemplateInfo(templateID: string) {
    const rsp = await ProjectService.getTemplateInfo(templateID);
    this.templateInfo = rsp.template;
  }

  private async mounted() {
    this.getTemplateList();
  }
}
</script>

<style scoped></style>
