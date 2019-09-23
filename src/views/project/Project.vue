<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="subtitle-1 font-weight-black">创建</v-card-title>
            <v-container>
              <transition appear appear-active-class="fade-up-enter">
                <v-layout row wrap>
                  <v-flex xs3>
                    <v-hover v-slot:default="{ hover }">
                      <v-card :elevation="hover ? 8 : 0" @click="createProjectDialog=true" outlined>
                        <v-img height="150">
                          <v-layout fill-height justify-center align-center>
                            <v-icon size="30">mdi-plus</v-icon>
                          </v-layout>
                        </v-img>
                      </v-card>
                    </v-hover>
                    <v-card-title class="body-2 font-weight-black">
                      <v-layout justify-center>新建空白项目</v-layout>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </transition>
            </v-container>
            <v-card-title class="subtitle-1 font-weight-black">
              正在进行
              <v-spacer></v-spacer>

              <v-btn
                @click="updateViewMode(`grid`)"
                icon
                :color="viewMode===`grid` ? 'primary' : ''"
              >
                <v-icon>mdi-grid-large</v-icon>
              </v-btn>

              <v-btn
                @click="updateViewMode(`list`)"
                icon
                :color="viewMode===`list` ? 'primary' : ''"
              >
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-btn>
            </v-card-title>
            <v-container>
              <transition appear appear-active-class="fade-up-enter">
                <v-layout row wrap v-if="viewMode===`grid`">
                  <v-flex xs3 v-for="(item,i) in projectList" :key="`project-${i}`">
                    <v-hover v-slot:default="{ hover }">
                      <v-card :elevation="hover ? 8 : 0" outlined @click="goToProject(item.id)">
                        <v-img
                          v-if="item.folderURL"
                          height="150"
                          :src="`/api/file/download?sName=${item.folderURL}`"
                        ></v-img>
                        <v-img
                          v-else
                          class="white--text"
                          height="150"
                          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        ></v-img>
                        <v-card-title class="body-2 font-weight-black">
                          {{item.name}}
                          <span
                            class="grey--text ml-2 font-weight-regular"
                          >{{item.createdAt| format("yyyy-MM-dd")}}</span>
                          <v-spacer></v-spacer>
                          <v-avatar size="26">
                            <v-img :src="item.headImgURL"></v-img>
                          </v-avatar>
                          <span class="ml-2 font-weight-black caption">{{item.nickName}}</span>
                        </v-card-title>

                        <v-card-text class="caption"></v-card-text>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
                <v-layout v-else>
                  <v-list two-line width="100%" class="transparent">
                    <template v-for="(item,i) in projectList">
                      <div :key="`project-${i}`">
                        <v-list-item @click="goToProject(item.id)">
                          <v-list-item-content>
                            <v-list-item-title class="font-weight-black">{{item.name}}</v-list-item-title>
                            <v-list-item-subtitle
                              class="caption"
                            >{{item.createdAt| format("yyyy-MM-dd")}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-avatar min-width="100">
                            <v-avatar size="32">
                              <v-img :src="item.headImgURL"></v-img>
                            </v-avatar>
                            <span
                              class="ml-3 font-weight-black caption text-right"
                            >{{item.nickName}}</span>
                          </v-list-item-avatar>
                        </v-list-item>
                        <v-divider></v-divider>
                      </div>
                    </template>
                  </v-list>
                </v-layout>
              </transition>
            </v-container>
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ProjectService from "@/service/projectService";
import appBar from "@/components/common/app-bar/AppBar.vue";

import UserService from "@/service/userService";
import { Authorization } from "@/types/user";

const projectModule = namespace("project");
const userModule = namespace("user");
const systemModule = namespace("system");

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
  @projectModule.Getter("viewMode") private viewMode!: string;
  @projectModule.Mutation("updateViewMode") private updateViewMode!: (
    v: string
  ) => void;
  @userModule.Getter("authorization")
  private authorization!: Authorization;
  @systemModule.Getter("systemName") private systemName!: string;

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
