<template>
  <div style="display:flex;height:100%;width:100%">
    <v-layout justify-center fill-height align-center>
      <v-tabs center-active background-color="transparent">
        <v-tab :to="`/query`">查询</v-tab>
        <v-tab :to="`/chart`">报表</v-tab>
      </v-tabs>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AuditBar extends Vue {}
</script>

<style scoped></style>
