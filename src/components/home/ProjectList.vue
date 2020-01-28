<template>
  <div>
    <v-card>
      <v-card-title class="body-2 font-weight-black">
        相关项目
      </v-card-title>

      <v-list two-line width="100%" class="transparent">
        <template v-for="(item, i) in projectList">
          <div :key="`project-${i}`">
            <v-list-item @click="goToProject(item.id)">
              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{
                  item.name
                }}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{
                  item.createdAt | format('yyyy-MM-dd')
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar min-width="100">
                <v-avatar size="32">
                  <v-img :src="item.headImgURL"></v-img>
                </v-avatar>
                <span class="ml-3 font-weight-black caption text-right">{{
                  item.nickName
                }}</span>
              </v-list-item-avatar>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectService from '@/service/projectService';
import { namespace } from 'vuex-class';
import { Project } from '@/types/project';

const projectModule = namespace('project');

@Component
export default class HomeProjectList extends Vue {
  @projectModule.Getter('projectList') private projectList!: Project[];
  @projectModule.Mutation('updateCurrentProjectID')
  private updateCurrentProjectID!: (v: string) => void;

  private goToProject(projectId: string) {
    this.updateCurrentProjectID(projectId);
    window.location.href = `/project#/process`;
  }

  private mounted() {
    ProjectService.getProjectList();
  }
}
</script>

<style scoped></style>
