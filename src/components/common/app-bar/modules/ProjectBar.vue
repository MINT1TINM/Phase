<template>
  <div style="display:flex;height:100%">
    <!-- back to all projects -->
    <v-toolbar-items text class="ml-4">
      <template>
        <v-btn style="padding:0 5px" text @click="goToAllProject">所有项目</v-btn>
      </template>
    </v-toolbar-items>

    <v-toolbar-items v-if="currentProject">
      <v-icon small>mdi-chevron-right</v-icon>
    </v-toolbar-items>

    <!-- project switcher -->
    <v-toolbar-items v-if="currentProject">
      <v-menu :close-on-content-click="false" offset-y :nudge-width="200">
        <template v-slot:activator="{on}">
          <v-btn style="padding:0 5px" text v-on="on" class="text-none">
            {{currentProject.name}}
            <v-icon small>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-card tile>
          <v-container fluid>
            <v-text-field
              outlined
              single-line
              hide-details
              class="text-field-dense"
              label="搜索项目"
              v-model="searchProjectContent"
            ></v-text-field>
          </v-container>
          <v-divider></v-divider>
          <v-subheader class="font-weight-black">切换项目</v-subheader>
          <v-list dense>
            <v-list-item
              v-for="(item, i) in projectListShow"
              :key="`project-${i}`"
              @click="alterProject(item.id)"
            >
              <v-list-item-avatar>
                <v-icon size="25">{{item.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      projectListShow: [],
      searchProjectContent: ""
    };
  },
  computed: {
    ...mapGetters({
      currentProject: "project/currentProject",
      projectList: "project/projectList"
    })
  },
  methods: {
    ...mapMutations({
      updateLastPage: "system/updateLastPage",
      updateCurrentProjectID: "project/updateCurrentProjectID",
      toggleFullScreenLoading: "system/toggleFullScreenLoading"
    }),
    alterProject(projectID) {
      this.toggleFullScreenLoading(true);

      // some loading content
      this.updateCurrentProjectID(projectID);
      setTimeout(() => {
        this.toggleFullScreenLoading(false);
      }, 500);
    },
    goToAllProject() {
      this.$router.push({ path: "/project" });
    }
  },
  mounted() {
    this.projectListShow = this.projectList;
  }
};
</script>

<style>
</style>
