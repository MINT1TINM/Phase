<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-app-bar dense app fixed dark color="primary darken-1" style="margin-top:48px">
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <v-layout>
              <v-menu
                ref="datePickerMenu"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    dense
                    solo-inverted
                    flat
                    class="body-2"
                    v-model="dateRangeText"
                    single-line
                    hide-details
                    label="时间范围"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker range v-model="dateRange"></v-date-picker>
              </v-menu>
              <v-text-field
                dense
                solo-inverted
                flat
                class="body-2 ml-1"
                v-model="projectCode"
                single-line
                hide-details
                label="项目代码"
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchSubject"
              ></v-text-field>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-app-bar>
      <transition appear appear-active-class="fade-left-enter">
        <v-simple-table height="calc(100vh - 96px)" fixed-header class="transparent">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">科目名称</th>
                <th class="text-left">科目代码</th>
                <th class="text-left">借方发生数</th>
                <th class="text-left">贷方发生数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in subjectList" :key="`cert-${i}`" @click="showDetail(item)">
                <td class="caption">{{ item.subjName }}</td>
                <td class="caption">{{ item.subj }}</td>
                <td class="caption">¥ {{ item.jAmount.toFixed(2) }}</td>
                <td class="caption">¥ {{ item.dAmount.toFixed(2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </transition>

      <v-dialog scrollable transition="slide-x-reverse-transition" v-model="detailNav">
        <v-card height="500">
          <v-card-title class="pa-0">
            <v-toolbar flat class="transparent">
              <v-spacer></v-spacer>
              <v-btn icon @click="detailNav=false">
                <v-icon size="20">mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-simple-table fixed-header class="transparent">
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
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in certificateList" :key="`cert-${i}`">
                    <td class="caption">{{ item.uniNo }}.{{item.ord}}</td>
                    <td class="caption">{{ item.date }}</td>
                    <td class="caption">{{ item.sabstract }}</td>
                    <td class="caption">¥ {{ item.jAmount.toFixed(2) }}</td>
                    <td class="caption">¥ {{ item.dAmount.toFixed(2) }}</td>
                    <td class="caption">{{ item.subjName }}</td>
                    <td class="caption">{{ item.subj }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import FinanceService from "@/service/financeService";
import { Certificate } from "@/types/finance";

@Component
export default class SearchSubject extends Vue {
  private datePickerMenu: boolean = false;
  private dateRange = [];
  private projectCode = "";
  private subjectList = [];
  private certificateList: any[] | undefined = [];
  private detailNav: boolean = false;

  private async searchSubject() {
    const rsp = await FinanceService.searchSubject(
      this.projectCode,
      this.dateRange[0],
      this.dateRange[1]
    );
    this.subjectList = rsp.subject;
  }

  private async showDetail(item: Certificate) {
    this.detailNav = true;
    this.certificateList = item.pzds;
  }

  private get dateRangeText() {
    return this.dateRange.join(" ~ ");
  }

  private get dateRangeNum() {
    return [
      new Date(this.dateRange[0]).getTime() / 1000,
      new Date(this.dateRange[1]).getTime() / 1000
    ];
  }
}
</script>

<style scoped>
</style>
