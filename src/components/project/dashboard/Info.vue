<template>
  <div>
    <v-card>
      <v-toolbar dense flat color="transparent">
        <v-toolbar-title class="subtitle-1 font-weight-black"
          >项目信息</v-toolbar-title
        >
      </v-toolbar>
      <v-list dense>
        <v-list-item>
          <v-list-item-title>名称</v-list-item-title>
          <v-list-item-subtitle>{{ currentProject.name }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>行业</v-list-item-title>
          <v-list-item-subtitle>{{ extraInfo.industry }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>工程地点</v-list-item-title>
          <v-list-item-subtitle>{{ extraInfo.address }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>投资估算</v-list-item-title>
          <v-list-item-subtitle>
            ¥ {{ extraInfo.investment.toFixed(2) }}</v-list-item-subtitle
          >
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Project } from '@/types/project';

const projectModule = namespace('project');

@Component
export default class ProjectDashboardInfo extends Vue {
  @projectModule.Getter('currentProject') private currentProject!: Project;

  private get extraInfo() {
    return this.currentProject.extraInfo;
  }

  private mounted() {
    console.log(this.extraInfo);
  }
}
</script>

<style scoped></style>
