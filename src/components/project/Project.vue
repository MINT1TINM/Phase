<template>
  <v-content style="overflow:scroll">
    <v-container fluid fill-height grid-list-xl style="padding:0 10px">
      <div class="project-column" v-for="(item,i) in projectList" :key="i">
        <v-hover v-slot:default="{ hover }">
          <v-card min-width="400px" height="100%" :elevation="hover ? 12 : 2">
            <project-column :projectId="item.projectId"></project-column>
          </v-card>
        </v-hover>
      </div>

      <div class="project-column">
        <v-hover v-slot:default="{ hover }">
          <v-card min-width="400px" height="100%" :elevation="hover ? 12 : 2" ripple>
            <v-container fill-height>
              <v-layout justify-center>
                <v-icon size="50">mdi-plus</v-icon>
              </v-layout>
            </v-container>
          </v-card>
        </v-hover>
      </div>
    </v-container>
  </v-content>
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
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>
