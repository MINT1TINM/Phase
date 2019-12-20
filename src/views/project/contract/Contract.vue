<template>
  <div>
    <v-toolbar dense flat>
      <v-toolbar-title class="caption mr-3">合同编号</v-toolbar-title>

      <v-text-field
        style="max-width:200px"
        single-line
        hide-details
        dense
        outlined
      ></v-text-field>

      <v-toolbar-title class="caption ml-5 mr-3">时间范围</v-toolbar-title>

      <v-text-field
        style="max-width:200px"
        single-line
        hide-details
        dense
        outlined
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-btn outlined color="primary"
        ><v-icon size="20" class="mr-1">mdi-magnify</v-icon>搜索</v-btn
      >
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProjectContract extends Vue {
  private search = {};
}
</script>

<style scoped></style>
