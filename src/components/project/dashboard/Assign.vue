<template>
  <div>
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="body-2 font-weight-black"
        >投资审计单位</v-toolbar-title
      >
    </v-toolbar>

    <v-list dense>
      <div v-for="(item, i) in list" :key="`l-${i}`">
        <v-subheader class="ml-2 mt-2" v-if="item.subheader">
          {{ item.subheader }}
        </v-subheader>
        <v-list-item v-else>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
        </v-list-item>
      </div>
    </v-list>
    <v-container fluid>
      <v-btn block text
        >单位信息<v-icon class="ml-2" size="20">mdi-arrow-right</v-icon></v-btn
      >
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/types/project';

@Component
export default class ProjectDashboardAssign extends Vue {
  @Prop() projectInfo!: Project;

  assignTypeList = [
    {
      text: '综合分配',
      value: 0
    },
    {
      text: '二次议标',
      value: 1
    },
    {
      text: '公开招投标',
      value: 2
    }
  ];

  get list() {
    return [
      {
        name: '类型',
        value: this.assignTypeList[
          this.projectInfo.extraInfo.assignAuditCompanyType
        ]?.text
      },
      {
        name: '名称',
        value: this.projectInfo.extraInfo.investAuditCompany.name
      },
      {
        name: '审计价格',
        value: `¥ ${this.projectInfo.extraInfo.assignPrice || 0}`
      }
    ];
  }
}
</script>

<style scoped></style>
