<template>
  <div>
    <app-bar></app-bar>
    <v-content>
      <v-toolbar dark color="primary darken-1">
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="items"
              :search-input.sync="search"
              cache-items
              class="mx-4"
              flat
              hide-no-data
              single-line
              hide-details
              label="搜索项目"
              solo-inverted
              item-text="name"
              item-value="name"
              @change="searchProject"
              @keyup.enter="searchProject(search)"
              append-outer-icon="mdi-magnify"
              @click:append-outer="searchProject(search)"
            ></v-autocomplete>
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CertificateService from "@/service/certificateService";

@Component
export default class Certifcate extends Vue {
  private search: string = "";
  private loading: boolean = false;
  private select = null;
  private items = [];

  private headers = [
    {
      text: "项目代码",
      sortable: false,
      value: "code"
    },
    { text: "项目名称", value: "name", sortable: false },
    { text: "负责人", value: "fat", sortable: false },
    { text: "负责人工号", value: "chargeSno", sortable: false }
  ];
  private projectList = [];

  private async querySelections(v: string) {
    if (this.loading !== true) {
      this.loading = true;
      // Simulated ajax query
      const rsp = await CertificateService.searchCertificateProject(
        "pname_prefix",
        this.search
      );
      this.items = rsp.project;
      this.loading = false;
    }
  }

  private async searchProject(v: string) {
    const rsp = await CertificateService.searchCertificateProject("pname", v);
    this.projectList = rsp.project;
  }

  @Watch("search")
  private async onSearchChanged(val: string) {
    val && val !== this.select && (await this.querySelections(val));
  }
}
</script>

<style scoped>
</style>
