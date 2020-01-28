<template>
  <div>
    <v-card>
      <v-row class="pa-5">
        <v-col cols="3">
          <v-row justify="center">
            <div class="body-1 font-weight-black">项目</div>
          </v-row>
          <v-row justify="center" class="pa-5">
            <div class="display-1">
              {{ projectList.length }}
            </div>
          </v-row>
        </v-col>

        <v-col cols="3">
          <v-row justify="center">
            <div class="body-1 font-weight-black">待处理任务</div>
          </v-row>
          <v-row justify="center" class="pa-5">
            <div class="display-1">
              {{ projectList.length }}
            </div>
          </v-row>
        </v-col>

        <v-col cols="3">
          <v-row justify="center">
            <div class="body-1 font-weight-black">待处理邀请</div>
          </v-row>
          <v-row justify="center" class="pa-5">
            <div class="display-1">
              {{ projectList.length }}
            </div>
          </v-row>
        </v-col>

        <v-col cols="3">
          <v-row justify="center">
            <div class="body-1 font-weight-black">待审批</div>
          </v-row>
          <v-row justify="center" class="pa-5">
            <div class="display-1">
              {{ projectList.length }}
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const projectModule = namespace('project');

@Component
export default class ProjectWidgetDashboard extends Vue {
  @projectModule.Getter('projectList') private projectList: any;
}
</script>

<style scoped></style>
