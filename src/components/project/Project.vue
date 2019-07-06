<template>
  <v-container fluid grid-list-xl fill-height>
    <v-layout row>
      <v-sheet width="100%" height="100%" color="transparent">
        <v-slide-group center-active show-arrows style="height:100%">
          <v-slide-item>
            <v-card class="ma-2" width="100" @click="createProject()">
              <v-container fill-height>
                <v-layout align-center justify-center>
                  <v-icon size="30">mdi-plus</v-icon>
                </v-layout>
              </v-container>
            </v-card>
          </v-slide-item>
          <v-slide-item v-for="(item,i) in projectList" :key="i">
            <v-card class="ma-2" width="400">
              <project-column-detail :projectId="item.projectId"></project-column-detail>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-layout>
  </v-container>
</template>

<script>
import projectColumnDetail from "./ProjectColumnDetail";
export default {
  components: {
    projectColumnDetail: projectColumnDetail
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
