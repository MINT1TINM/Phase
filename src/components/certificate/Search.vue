<template>
  <v-container>
    <v-layout justify-center>
      <v-text-field
        v-model="searchCertificateContent"
        @keyup.enter="searchCertificate"
        outlined
        label="搜索凭证"
        class="text-field-dense"
        single-line
        hide-details
      ></v-text-field>
    </v-layout>
    <v-layout>
      <v-flex xs3>
        <v-list dense>
          <v-list-item v-for="(item,i) in certificateList" :key="`cert-${i}`"></v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Model,
  Emit
} from "vue-property-decorator";

@Component
export default class Certificate extends Vue {
  private searchCertificateContent: string = "";
  private searching: boolean = false;
  private certificateList = [];

  private async searchCertificate() {
    this.certificateList = [];
  }

  @Watch("searchCertificateContent")
  private onSearchUserContentChanged() {
    if (this.searching) {
      return;
    }
    if (this.searchCertificateContent.length < 1) {
      return;
    }
    this.searchCertificate();
  }
}
</script>

<style scoped>
</style>
