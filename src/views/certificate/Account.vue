<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-toolbar dark color="primary darken-1">
        <v-btn icon>
          <v-icon size="20">mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table
        class="transparent"
        :headers="headers"
        :items="accountList"
        :items-per-page="50"
        hide-default-footer
      ></v-data-table>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CertificateAccount extends Vue {
  private headers = [
    {
      text: "日期",
      sortable: false,
      value: "name"
    },
    { text: "凭证账号", value: "calories", sortable: false },
    { text: "摘要", value: "fat", sortable: false },
    { text: "借方发生数", value: "carbs", sortable: false },
    { text: "贷方发生数", value: "carbs", sortable: false },
    { text: "负责人", value: "carbs", sortable: false },
    { text: "工号", value: "carbs", sortable: false }
  ];
  private accountList = [];
}
</script>

<style scoped>
</style>
