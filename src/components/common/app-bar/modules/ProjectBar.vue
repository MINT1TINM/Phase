<template>
  <div style="display:flex;height:100%">
    <v-toolbar-items v-if="currentProject">
      <v-icon small>mdi-chevron-right</v-icon>
    </v-toolbar-items>

    <!-- project switcher -->
    <v-toolbar-items v-if="currentProject">
      <v-menu
        :close-on-content-click="false"
        v-model="projectSwitcher"
        offset-y
        :nudge-width="200"
      >
        <template v-slot:activator="{ on }">
          <v-btn style="padding:0 15px" text v-on="on" class="text-none">
            {{ currentProject.name }}
            <v-icon small>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-card tile>
          <v-container fluid>
            <v-text-field
              outlined
              single-line
              hide-details
              dense
              label="搜索项目"
              v-model="searchProjectContent"
            ></v-text-field>
          </v-container>
          <v-divider></v-divider>
          <v-subheader class="font-weight-black">切换项目</v-subheader>
          <v-list dense>
            <v-list-item
              v-for="item in projectListShow"
              :key="`project-${item.id}`"
              @click="alterProject(item.id)"
            >
              <v-list-item-avatar>
                <v-avatar color="primary" size="32">
                  <img v-if="item.folderURL" :src="item.folderURL | httpsfy" />
                  <span v-else class="white--text">{{
                    item.name | avatar
                  }}</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>

    <v-toolbar-items v-if="$route.params.processID">
      <v-icon small>mdi-chevron-right</v-icon>
    </v-toolbar-items>

    <!-- process switcher -->
    <v-toolbar-items v-if="$route.params.processID">
      <v-menu
        :close-on-content-click="false"
        v-model="processSwitcher"
        offset-y
        :nudge-width="200"
      >
        <template v-slot:activator="{ on }">
          <v-btn style="padding:0 15px" text v-on="on" class="text-none">
            {{ currentProcess($route.params.processID).name }}
            <v-icon small>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-card tile>
          <v-subheader class="font-weight-black">切换过程</v-subheader>
          <v-list dense>
            <v-list-item
              v-for="item in currentProcessList"
              :key="`project-${item.id}`"
              @click="alterProcess(item.id)"
            >
              <v-list-item-avatar>
                <v-avatar color="primary" size="32">
                  <img
                    v-if="item.headImgURL"
                    :src="item.headImgURL | httpsfy"
                  />
                  <span v-else class="white--text">{{
                    item.name | avatar
                  }}</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>

    <v-divider v-if="currentProjectID" vertical inset></v-divider>

    <!-- exporter -->
    <v-toolbar-items v-if="currentProjectID">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="saveToTemplateDialog = true">
            <v-icon size="20">mdi-export-variant</v-icon>
          </v-btn>
        </template>
        <span class="caption">导出为模版</span>
      </v-tooltip>
    </v-toolbar-items>

    <!-- search -->
    <v-toolbar-items v-if="currentProjectID">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="commonSearchDialog = true">
            <v-icon size="20">mdi-magnify</v-icon>
          </v-btn>
        </template>
        <span class="caption">搜索</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-dialog persistent v-model="saveToTemplateDialog" width="300">
      <v-card>
        <v-toolbar flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >导出为模版</v-toolbar-title
          >
        </v-toolbar>
        <v-container fluid>
          <v-text-field
            v-model="templateName"
            dense
            outlined
            label="名称"
            single-line
            hide-details
          ></v-text-field>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn
            rounded
            color="primary darken-1"
            depressed
            @click="saveToTemplate"
            >确认</v-btn
          >
          <v-btn rounded text @click="saveToTemplateDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="commonSearchDialog" width="700">
      <common-search @closeDialog="commonSearchDialog = false"></common-search>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { Prop } from 'vue-property-decorator';
import ProjectService from '@/service/projectService';
import commonSearch from '@/components/common/search/Search.vue';
import { Task } from '@/types/task';
import { Process } from '../../../../types/process';

const projectModule = namespace('project');
const processModule = namespace('process');
const systemModule = namespace('system');

@Component({
  components: {
    'common-search': commonSearch
  }
})
export default class ProjectBar extends Vue {
  searchProjectContent: string = '';

  projectSwitcher: boolean = false;

  processSwitcher: boolean = false;

  saveToTemplateDialog: boolean = false;

  commonSearchDialog: boolean = false;

  templateName: string = '';

  @projectModule.Getter('projectList') projectList: any;

  @projectModule.Getter('currentProject') currentProject: any;

  @projectModule.Getter('currentProjectID') currentProjectID!: string;

  @processModule.Getter('currentProcess') currentProcess!: (
    v: string
  ) => Process;

  @processModule.Getter('currentProcessList')
  currentProcessList!: Process[];

  @projectModule.Mutation('updateCurrentProjectID')
  updateCurrentProjectID: any;

  @systemModule.Mutation('toggleFullScreenLoading')
  toggleFullScreenLoading: any;

  goToAllProject() {
    this.$router.push({ path: '/project' });
  }

  alterProject(projectID: number) {
    this.toggleFullScreenLoading(true);
    this.projectSwitcher = false;

    // some loading content
    this.updateCurrentProjectID(projectID);
    this.$router.push({ path: '/process' });
    setTimeout(() => {
      this.toggleFullScreenLoading(false);
    }, 500);
  }

  alterProcess(processID: number) {
    this.toggleFullScreenLoading(true);
    this.processSwitcher = false;

    setTimeout(() => {
      // some loading content
      this.$router.push({ path: `/process/${processID}/task` });
      this.toggleFullScreenLoading(false);
    }, 500);
  }

  async saveToTemplate() {
    await ProjectService.saveToTemplate(
      this.currentProjectID,
      this.templateName
    );
    this.templateName = '';
    this.saveToTemplateDialog = false;
  }

  get projectListShow() {
    return this.projectList;
  }

  mounted() {}
}
</script>
