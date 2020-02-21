<template>
  <div>
    <v-img
      v-if="projectInfo.folderURL"
      height="150"
      :src="`/api/file/download?sName=${item.folderURL}`"
    ></v-img>
    <v-img
      v-else
      class="white--text"
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    ></v-img>
    <v-list dense>
      <v-subheader class="ml-2">基本信息</v-subheader>
      <v-list-item>
        <v-list-item-title>名称</v-list-item-title>
        <v-list-item-subtitle>{{ projectInfo.name }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>简介</v-list-item-title>
        <v-list-item-subtitle>{{
          projectInfo.description
        }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>审计期间</v-list-item-title>
        <v-list-item-subtitle
          >{{ projectInfo.startDate }} -
          {{ projectInfo.endDate }}</v-list-item-subtitle
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-title>实施时间</v-list-item-title>
        <v-list-item-subtitle>{{
          projectInfo.actionDate
        }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/types/project';

@Component
export default class ProjectWidgetInfo extends Vue {
  @Prop() projectInfo!: Project;

  get list() {
    return [
      {
        subheader: '基本信息'
      },
      {
        name: '名称',
        value: this.projectInfo.name
      },
      {
        name: '简介',
        value: this.projectInfo.description
      },
      {
        name: '审计期间',
        value: `${this.projectInfo.startDate} - ${this.projectInfo.endDate}`
      },
      {
        name: '实施时间',
        value: `${this.projectInfo.actionDate}`
      }
    ];
  }
}
</script>

<style scoped></style>
