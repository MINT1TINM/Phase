<template>
  <v-row class="px-3">
    <v-col cols="9">
      <v-card>
        <v-row>
          <v-col cols="2">
            <v-row justify="center" class="body-2 mt-2 font-weight-black">
              待处理任务
            </v-row>
            <v-row justify="center" class="display-1 my-3">
              {{ 3 }}
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row justify="center" class="body-2 mt-2 font-weight-black">
              待审批
            </v-row>
            <v-row justify="center" class="display-1 my-3">
              {{ 2 }}
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="3">
      <ProjectInfo :projectInfo="currentProject"></ProjectInfo>
      <Progress class="mt-5"></Progress>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Info from '@/components/project/dashboard/Info.vue';
import Progress from '@/components/project/dashboard/Progress.vue';
import ProjectInfo from '@/components/project/widget/Info.vue';
import { namespace } from 'vuex-class';
import { Project } from '@/types/project';

const projectModule = namespace('project');

@Component({
  components: {
    Info,
    Progress,
    ProjectInfo
  }
})
export default class ProjectDashboard extends Vue {
  @projectModule.Getter('currentProject') currentProject!: Project;
}
</script>

<style scoped></style>
