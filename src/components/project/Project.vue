<template>
  <v-container fluid grid-list-md fill-height style="padding:0">
    <v-layout row wrap>
      <v-flex style="padding: 0" xs2>
        <v-navigation-drawer class="inner-sidebar">
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
            <v-list-item-group v-model="item" color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>工作</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon size="17">mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-btn block flat color="primary" dark>
                <v-icon size="17">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs10 style="padding:0">
        <v-sheet width="100%" height="100%" color="transparent">
          <v-slide-group center-active show-arrows style="height:100%">
            <v-slide-item>
              <v-card class="ml-3 mr-2 my-3" width="100" @click="createProject()">
                <v-container fill-height>
                  <v-layout align-center justify-center>
                    <v-icon size="30">mdi-plus</v-icon>
                  </v-layout>
                </v-container>
              </v-card>
            </v-slide-item>
            <v-slide-item v-for="(item,i) in projectList" :key="i">
              <v-card class="mx-2 my-3" width="400">
                <project-column :projectId="item.projectId"></project-column>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import projectColumn from "./ProjectColumn";
export default {
  components: {
    projectColumn: projectColumn
  },
  data() {
    return {
      projectList: [
        {
          projectId: 1
        },
        {
          projectId: 1
        },
        {
          projectId: 1
        },
        {
          projectId: 1
        },
        {
          projectId: 1
        },
        {
          projectId: 1
        }
      ]
    };
  },
  methods: {
    async createProject() {}
  }
};
</script>

<style>
</style>
