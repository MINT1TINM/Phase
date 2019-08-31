<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="250">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-light mb-5 mt-5">Phase 项目</h1>
          <v-btn rounded outlined dark @click="createProjectDialog=true" class="mt-4">
            <v-icon>mdi-plus</v-icon>&nbsp;新建项目
          </v-btn>
        </v-layout>
      </v-parallax>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="subtitle-1 font-weight-black">
              正在进行的项目
              <v-spacer></v-spacer>
            </v-card-title>
            <v-container>
              <transition appear appear-active-class="fade-up-enter">
                <v-layout row wrap>
                  <v-flex xs3 v-for="(item,i) in projectList" :key="`project-${i}`">
                    <v-hover v-slot:default="{ hover }">
                      <v-card :elevation="hover ? 8 : 2" @click="goToProject(item.id)">
                        <v-img
                          class="white--text"
                          height="100"
                          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        ></v-img>
                        <v-card-title class="body-2 font-weight-black">
                          {{item.name}}
                          <span
                            class="grey--text ml-2 font-weight-regular"
                          >{{item.createdAt| format("yyyy-MM-dd")}}</span>
                          <v-spacer></v-spacer>
                        </v-card-title>

                        <v-card-text>{{item.description}}</v-card-text>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </transition>
            </v-container>
          </v-flex>
          <v-flex xs12 class="mt-4">
            <v-card-title class="subtitle-1 font-weight-black">
              已完成的项目
              <v-spacer></v-spacer>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-dialog v-model="createProjectDialog" width="300" persistent>
          <v-card>
            <v-card-title class="subtitle-1 font-weight-black">新建项目</v-card-title>
            <v-container fluid>
              <v-form ref="createProjectForm">
                <dim-form
                  dense
                  keyName="create-project"
                  :formContent="createProjectContent"
                  :target="createProjectInfo"
                ></dim-form>
              </v-form>
            </v-container>
            <v-card-actions class="justify-center">
              <v-btn rounded color="primary" depressed @click="createProject">确认</v-btn>
              <v-btn rounded text @click="createProjectDialog=false">取消</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ProjectService from "@/service/projectService";
import appBar from "@/components/common/app-bar/AppBar.vue";

import UserService from "@/service/userService";
import { Authorization } from "../../types/user";

const projectModule = namespace("project");
const userModule = namespace("user");

@Component({
  components: {
    "app-bar": appBar
  }
})
export default class ProjectHome extends Vue {
  private createProjectDialog: boolean = false;
  private createProjectContent = [
    {
      title: "名称",
      type: "text-field",
      name: "name"
    }
  ];
  private createProjectInfo = {
    name: ""
  };
  private projectListShow = [];

  @projectModule.Getter("projectList") private projectList: any;
  @projectModule.Mutation("updateCurrentProjectID")
  private updateCurrentProjectID: any;
  @projectModule.Mutation("clearCurrentProjectID")
  private clearCurrentProjectID: any;
  @userModule.Getter("authorization")
  private authorization!: Authorization;

  private goToProject(projectId: number) {
    this.updateCurrentProjectID(projectId);
    this.$router.push({ path: "/project/process" });
  }
  private async createProject() {
    const rsp = await ProjectService.createProject(this.createProjectInfo.name);
    if (rsp.msg === "success") {
      await UserService.getUserInfo(this.authorization.userID);
      this.getProjectList();
    }
    this.createProjectDialog = false;
  }

  private async getProjectList() {
    await ProjectService.getProjectList();
  }

  private mounted() {
    this.clearCurrentProjectID();
    this.getProjectList();
  }
}
</script>

<style scoped>
</style>
