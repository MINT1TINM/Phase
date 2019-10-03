<template>
  <div>
    <v-toolbar flat justify-center>
      <v-text-field
        v-model="searchCertificateContent"
        @keyup.enter="searchCertificate"
        outlined
        label="搜索凭证"
        dense
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-divider></v-divider>

    <v-layout>
      <v-flex xs12 style="max-height:610px;overflow-y:auto">
        <v-card
          class="py-1 ma-1"
          outlined
          v-for="(item,i) in certificateList"
          :key="`cert-${i}`"
          @click
        >
          <v-list-item-title>{{item.uni_no}}</v-list-item-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CertificateService from "@/service/certificateService";

@Component
export default class Certificate extends Vue {
  private searchCertificateContent: string = "";
  private searching: boolean = false;
  private certificateList = [];

  private async searchCertificate() {
    const rsp = await CertificateService.searchCertificate(
      this.searchCertificateContent,
      20,
      1
    );
    this.certificateList = rsp.certificate;
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
