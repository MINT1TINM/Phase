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
                  <img v-if="item.headImgURL" :src="item.headImgURL | httpsfy" />
                  <span v-else class="white--text">{{item.name | avatar}}</span>
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
          <v-btn icon v-on="on" @click="saveToTemplateDialog=true">
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
          <v-btn icon v-on="on" @click="commonSearchDialog=true">
            <v-icon size="20">mdi-magnify</v-icon>
          </v-btn>
        </template>
        <span class="caption">搜索</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-dialog persistent v-model="saveToTemplateDialog" width="300">
      <v-card>
        <v-toolbar flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">导出为模版</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-text-field v-model="templateName" dense outlined label="名称" single-line hide-details></v-text-field>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn rounded color="primary darken-1" depressed @click="saveToTemplate">确认</v-btn>
          <v-btn rounded text @click="saveToTemplateDialog=false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog :transition="false" v-model="commonSearchDialog" width="700">
      <common-search @closeDialog="commonSearchDialog=false"></common-search>
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

const projectModule = namespace('project');
const systemModule = namespace('system');

@Component({
  components: {
    'common-search': commonSearch,
  },
})
export default class ProjectBar extends Vue {
  private searchProjectContent: string = '';

  private projectListShow = [];

  private projectSwitcher: boolean = false;

  private saveToTemplateDialog: boolean = false;

  private commonSearchDialog: boolean = false;

  private templateName: string = '';

  @projectModule.Getter('projectList') private projectList: any;

  @projectModule.Getter('currentProject') private currentProject: any;

  @projectModule.Getter('currentProjectID') private currentProjectID!: string;

  @projectModule.Mutation('updateCurrentProjectID')
  private updateCurrentProjectID: any;

  @systemModule.Mutation('toggleFullScreenLoading')
  private toggleFullScreenLoading: any;

  private goToAllProject() {
    this.$router.push({ path: '/project' });
  }

  private alterProject(projectID: number) {
    this.toggleFullScreenLoading(true);
    this.projectSwitcher = false;

    // some loading content
    this.updateCurrentProjectID(projectID);
    this.$router.push({ path: '/project/process' });
    setTimeout(() => {
      this.toggleFullScreenLoading(false);
    }, 500);
  }

  private async saveToTemplate() {
    await ProjectService.saveToTemplate(
      this.currentProjectID,
      this.templateName,
    );
    this.templateName = '';
    this.saveToTemplateDialog = false;
  }

  private mounted() {
    this.projectListShow = this.projectList;
    console.log(this.currentProject);
  }
}
</script>
