<template>
  <div>
    <app-bar></app-bar>
    <v-content>
      <v-toolbar dark color="primary darken-1">
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <v-text-field
              label="搜索项目"
              flat
              solo-inverted
              single-line
              hide-details
              :append-outer-icon="'mdi-magnify'"
              @click:append-outer="search"
              @keyup.enter="search"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-data-table
        class="transparent"
        :headers="headers"
        :items="projectList"
        :items-per-page="50"
        hide-default-footer
      ></v-data-table>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Certifcate extends Vue {
  private headers = [
    {
      text: "项目代码",
      sortable: false,
      value: "name"
    },
    { text: "项目名称", value: "calories", sortable: false },
    { text: "负责人", value: "fat", sortable: false },
    { text: "负责人工号", value: "carbs", sortable: false }
  ];
  private projectList = [];

  private search() {}
}
</script>

<style scoped>
</style>
