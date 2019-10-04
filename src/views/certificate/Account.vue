<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-app-bar app fixed dark color="primary darken-1" style="margin-top:48px">
        <v-btn icon @click="$router.push({path:`/certificate`})">
          <v-icon size="20">mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar>
      <v-simple-table class="transparent">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">凭证账号</th>
              <th class="text-left">摘要</th>
              <th class="text-left">借方发生数</th>
              <th class="text-left">贷方发生数</th>
              <th class="text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in certificateList" :key="`cert-${i}`">
              <td>{{ item.uniNo }}</td>
              <td>{{ item.sabstract }}</td>
              <td>¥ {{ item.jAmount }}</td>
              <td>¥ {{ item.dAmount }}</td>
              <td>
                <v-btn icon @click="detailNav=true;currentCertificate=item">
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-content>

    <v-dialog v-model="detailNav" fullscreen>
      <v-card height="100%">
        <v-toolbar flat class="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">详情</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="detailNav=false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-simple-table class="transparent">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">凭证账号</th>
                <th class="text-left">日期</th>
                <th class="text-left">摘要</th>
                <th class="text-left">借方发生数</th>
                <th class="text-left">贷方发生数</th>
                <th class="text-left">科目名称</th>
                <th class="text-left">科目代码</th>
                <th class="text-left">项目名称</th>
                <th class="text-left">项目代码</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in currentCertificate.pzds" :key="`cert-${i}`">
                <td class="caption">{{ item.uniNo }}.{{item.ord}}</td>
                <td class="caption">{{ item.sYear}}-{{item.sMonth}}-{{item.sDay }}</td>
                <td class="caption">{{ item.sabstract }}</td>
                <td class="caption">¥ {{ item.jAmount }}</td>
                <td class="caption">¥ {{ item.dAmount }}</td>
                <td class="caption">{{ item.subjName }}</td>
                <td class="caption">{{ item.subj }}</td>
                <td class="caption">{{ item.uniPrjName }}</td>
                <td class="caption">{{ item.uniPrjOrder }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CertificateService from "@/service/certificateService";

@Component
export default class CertificateAccount extends Vue {
  private headers = [
    {
      text: "日期",
      sortable: false,
      value: "name"
    },
    { text: "凭证账号", value: "uniNo", sortable: false },
    { text: "摘要", value: "sabstract", sortable: false },
    { text: "借方发生数", value: "jAmount", sortable: false },
    { text: "贷方发生数", value: "dAmount", sortable: false },
    { text: "负责人", value: "carsbs", sortable: false },
    { text: "工号", value: "carbs", sortable: false }
  ];
  private certificateList = [];
  private detailNav: boolean = false;
  private currentCertificate = {};

  private async getCertificateList() {
    const rsp = await CertificateService.searchCertificate(
      this.$route.params.projectCode,
      this.$route.params.staffNo
    );
    this.certificateList = rsp.certificate;
  }

  private mounted() {
    this.getCertificateList();
  }
}
</script>

<style scoped>
</style>
