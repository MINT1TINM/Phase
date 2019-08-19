<template>
  <div style="display:flex;height:100%">
    <v-toolbar-items v-if="currentProject">
      <v-icon small>mdi-chevron-right</v-icon>
    </v-toolbar-items>

    <!-- project switcher -->
    <v-toolbar-items v-if="currentProject">
      <v-menu :close-on-content-click="false" v-model="projectSwitcher" offset-y :nudge-width="200">
        <template v-slot:activator="{on}">
          <v-btn style="padding:0 15px" text v-on="on" class="text-none">
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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { Prop } from "vue-property-decorator";

const projectModule = namespace("project");
const systemModule = namespace("system");

@Component
export default class ProjectBar extends Vue {
  private searchProjectContent: string = "";
  private projectListShow = [];
  private projectSwitcher: boolean = false;

  @projectModule.Getter("projectList") private projectList: any;
  @projectModule.Getter("currentProject") private currentProject: any;
  @projectModule.Mutation("updateCurrentProjectID")
  private updateCurrentProjectID: any;
  @systemModule.Mutation("toggleFullScreenLoading")
  private toggleFullScreenLoading: any;

  private goToAllProject() {
    this.$router.push({ path: "/project" });
  }

  private alterProject(projectID: number) {
    this.toggleFullScreenLoading(true);
    this.projectSwitcher = false;

    // some loading content
    this.updateCurrentProjectID(projectID);
    setTimeout(() => {
      this.toggleFullScreenLoading(false);
    }, 500);
  }

  private mounted() {
    this.projectListShow = this.projectList;
    console.log(this.currentProject);
  }
}
</script>


