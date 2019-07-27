<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-container fill-height>
        <v-layout row wrap>
          <v-flex xs8>
            <v-card-title class="subtitle-1 font-weight-black">
              项目
              <v-spacer></v-spacer>
              <v-btn rounded text @click="createProjectDialog=true">
                <v-icon>mdi-plus</v-icon>&nbsp;新建项目
              </v-btn>
            </v-card-title>
            <v-card v-for="(item,i) in projectList" :key="`project-${i}`">
              <v-card-title class="subtitle-1 font-weight-black">
                {{item.name}}
                <span class="grey--text ml-2">{{item.createTime}}</span>
                <v-spacer></v-spacer>
                <v-btn icon small @click="goToProject(item.id)">
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-title>
              <v-container fluid>
                <v-layout row wrap>
                  <v-card-text>{{item.description}}</v-card-text>
                </v-layout>
              </v-container>
            </v-card>
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
import appBar from "@/components/common/AppBar";
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
      updateCurrentProject: "system/updateCurrentProject"
    }),
    goToProject(projectId) {
      this.updateCurrentProject(projectId);
      this.$router.push({ path: "/dashboard/timeline" });
    },
    async createProject() {
      const rsp = await projectService.createProject(
        this.createProjectInfo.name
      );
      if (rsp.msg == "success") {
        this.$snackbar.show("新建成功");
      }
      this.createProjectDialog = false;
    },
    async getProjectList() {}
  }
};
</script>

<style>
</style>
