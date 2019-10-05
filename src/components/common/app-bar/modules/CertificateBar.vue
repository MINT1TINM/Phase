<template>
  <div style="display:flex;height:100%;width:100%">
    <v-layout justify-center fill-height align-center>
      <v-tabs center-active>
        <v-tab :to="`/certificate/project`">项目收支</v-tab>
        <v-tab :to="`/certificate/subject`">科目统计</v-tab>
      </v-tabs>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CertificateBar extends Vue {}
</script>

<style scoped>
</style>
