<template>
  <v-container fluid grid-list-md fill-height style="padding:0">
    <v-layout row wrap>
      <v-flex style="padding: 0" xs2>
        <v-navigation-drawer permanent class="inner-sidebar">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            single-line
            outlined
            hide-details
            class="text-field-dense mt-1"
            label="搜索项目"
          ></v-text-field>
          <v-toolbar dense class="transparent mt-3" flat>
            <h5 style="margin-left:-20px">项目分组</h5>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list nav dense color="transparent" style="padding:8px 0px">
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>工作</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon small>
                    <v-icon size="17">mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-btn block color="primary" dark>
                <v-icon size="17">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs10 style="padding:0">
        <v-sheet width="100%" height="100%" color="transparent">
          <v-slide-group center-active show-arrows style="height:100%">
            <transition appear appear-active-class="fade-up-enter">
              <v-slide-item>
                <v-card class="ml-3 mr-2 my-3" width="100" @click="createProjectDialog=true">
                  <v-container fill-height>
                    <v-layout align-center justify-center>
                      <v-icon size="30">mdi-plus</v-icon>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-slide-item>
            </transition>
            <transition-group appear appear-active-class="fade-up-enter">
              <v-slide-item v-for="(item,i) in projectList" :key="`project-${i}`">
                <div class="mx-2 my-3" style="width:300px">
                  <project-column :projectId="item.projectId"></project-column>
                </div>
              </v-slide-item>
            </transition-group>
          </v-slide-group>
        </v-sheet>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createProjectDialog" width="300" persistent>
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black">新建项目</v-card-title>
        <v-container>
          <v-text-field outlined class="text-field-dense" label="项目名称"></v-text-field>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn rounded color="primary" depressed>确认</v-btn>
          <v-btn rounded text @click="createProjectDialog==false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import projectColumn from "@/components/project/ProjectColumn";
export default {
  components: {
    projectColumn: projectColumn
  },
  data() {
    return {
      projectList: [
        {
          projectId: 999
        }
      ],
      createProjectDialog: false
    };
  },
  methods: {
    async createProject() {
      this.createProjectDialog = true;
    }
  }
};
</script>

<style>
</style>
