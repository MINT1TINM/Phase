<template>
  <v-app>
    <app-bar></app-bar>
    <v-app-bar dense app fixed dark color="primary darken-1" style="margin-top:48px">
      <v-layout row wrap justify-center>
        <v-flex xs6>
          <v-layout>
            <v-text-field
              dense
              solo-inverted
              flat
              single-line
              label="凭证账号"
              hide-details
              v-model="certificateName"
            ></v-text-field>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ComponentName extends Vue {
  private certificateName: string = "";

  private async searchCertificate() {}
}
</script>

<style scoped>
</style>
