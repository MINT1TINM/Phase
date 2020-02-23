<template>
  <v-container fluid class="pa-2">
    <v-row no-gutters>
      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card class="ma-2">
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
          <v-col cols="12">
            <v-card class="ma-2">
              <ProjectInfo :projectInfo="currentProject"></ProjectInfo>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="3">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card class="ma-2">
              <Assign :projectInfo="currentProject"></Assign>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Progress from '@/components/project/dashboard/Progress.vue';
import Assign from '@/components/project/dashboard/Assign.vue';
import ProjectInfo from '@/components/project/widget/Info.vue';
import { namespace } from 'vuex-class';
import { Project } from '@/types/project';

const projectModule = namespace('project');

@Component({
  components: {
    Progress,
    ProjectInfo,
    Assign
  }
})
export default class ProjectDashboard extends Vue {
  @projectModule.Getter('currentProject') currentProject!: Project;
}
</script>

<style scoped></style>
