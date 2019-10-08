<template>
  <v-container fluid>
    <v-layout row wrap fill-height justify-center>
      <v-flex xs8>
        <v-text-field solo-inverted flat dense hide-details single-line label="凭证号码"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CertificateSearch extends Vue {}
</script>

<style scoped>
</style>
