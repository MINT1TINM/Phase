<template>
  <v-layout>
    <v-tabs centered background-color="transparent">
      <v-tab>信息</v-tab>
      <v-tab>费用</v-tab>
      <v-tab>设备</v-tab>
      <v-tab>租户</v-tab>
    </v-tabs>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ApartmentConfig extends Vue {}
</script>

<style scoped></style>
