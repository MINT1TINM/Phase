<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-app-bar dense app fixed dark color="primary darken-1" style="margin-top:48px">
        <v-layout row wrap>
          <v-flex xs6>
            <v-layout>
              <v-text-field
                dense
                solo-inverted
                flat
                single-line
                label="凭证账号"
                hide-details
                v-model="certificateNo"
                @keyup.enter="searchCertificate"
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchCertificate"
              ></v-text-field>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-btn outlined rounded small>
          <v-icon size="15">mdi-export-variant</v-icon>&nbsp;导出结果
        </v-btn>
      </v-app-bar>
      <transition appear appear-active-class="fade-left-enter">
        <v-simple-table height="calc(100vh - 96px)" fixed-header class="transparent">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" v-for="(item,i) in headers" :key="`head-${i}`">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in certificateList" :key="`cert-${i}`">
                <td class="caption">{{ item.uniNo }}.{{item.ord}}</td>
                <td class="caption">{{ item.date}}</td>
                <td class="caption">{{ item.sabstract }}</td>
                <td class="caption">¥ {{ item.jAmount.toFixed(2) }}</td>
                <td class="caption">¥ {{ item.dAmount.toFixed(2) }}</td>
                <td class="caption">{{ item.subjName }}</td>
                <td class="caption">{{ item.subj }}</td>
                <td class="caption">{{ item.chargeName }}</td>
                <td class="caption">{{ item.chargeSno }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FinanceService from "@/service/financeService";
import { Certificate } from "@/types/finance";

@Component
export default class SearchCertificate extends Vue {
  private certificateNo: string = "";
  private certificateList: Certificate[] = [];

  private headers = [
    "凭证账号",
    "日期",
    "摘要",
    "借方发生数",
    "贷方发生数",
    "科目名称",
    "科目代码",
    "负责人姓名",
    "负责人工号"
  ];

  private async searchCertificate() {
    const rsp = await FinanceService.searchCertificate(this.certificateNo);
    this.certificateList = rsp.certificate;
  }
}
</script>

<style scoped>
</style>
