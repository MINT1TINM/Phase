<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-container fill-height grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="subtitle-1 font-weight-black">
              正在进行的项目
              <v-spacer></v-spacer>
              <v-btn rounded text @click="createProjectDialog=true">
                <v-icon>mdi-plus</v-icon>&nbsp;新建项目
              </v-btn>
            </v-card-title>
            <v-container>
              <v-layout row wrap>
                <v-flex xs3 v-for="(item,i) in projectList" :key="`project-${i}`">
                  <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 8 : 2" @click="goToProject(item.id)">
                      <v-card-title class="body-2 font-weight-black">
                        {{item.name}}
                        <span
                          class="grey--text ml-2 font-weight-regular"
                        >{{item.createdAt| format("yyyy-MM-dd")}}</span>
                        <v-spacer></v-spacer>
                      </v-card-title>
                      <v-container fluid>
                        <v-layout row wrap>
                          <v-card-text>{{item.description}}</v-card-text>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
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

<script>
import appBar from "@/components/common/app-bar/AppBar";
import projectService from "@/service/ProjectService";
import { mapMutations } from "vuex";
export default {
  components: {
    appBar: appBar
  },
  data() {
    return {
      createProjectDialog: false,
      createProjectContent: [
        {
          title: "名称",
          type: "text-field",
          content: "name"
        }
      ],
      createProjectInfo: {},
      projectList: []
    };
  },
  methods: {
    ...mapMutations({
      updateCurrentProjectID: "project/updateCurrentProjectID",
      clearCurrentProjectID: "project/clearCurrentProjectID"
    }),
    goToProject(projectId) {
      this.updateCurrentProjectID(projectId);
      this.$router.push({ path: "/project/process" });
    },
    async createProject() {
      const rsp = await projectService.createProject(
        this.createProjectInfo.name
      );
      if (rsp.msg == "success") {
        this.$snackbar.show("新建成功");
        this.getProjectList();
      }
      this.createProjectDialog = false;
    },
    async getProjectList() {
      const rsp = await projectService.getProjectList();
      this.projectList = rsp.projectList;
    }
  },
  async mounted() {
    this.getProjectList();
    this.clearCurrentProjectID();
  }
};
</script>

<style>
</style>
