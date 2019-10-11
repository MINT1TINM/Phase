<template>
  <v-app>
    <v-navigation-drawer
      height="calc(100vh - 48px)"
      style="overflow:auto"
      width="300"
      class="acrylic"
      permanent
      fixed
      app
      clipped
    >
      <v-container fluid grid-list-lg class="pa-5">
        <v-form ref="searchSubjectForm" style="width:100%">
          <v-layout row wrap>
            <v-flex xs12>
              <v-menu
                ref="datePickerMenu"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
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
            </v-flex>

            <v-flex xs12 v-for="(item,i) in projectCode" :key="`code-${i}`">
              <v-text-field
                dense
                solo-inverted
                flat
                class="body-2"
                v-model="projectCode[i]"
                :rules="[v => !!v || 'Item is required']"
                single-line
                hide-details
                label="项目代码 ( 回车以新增 )"
                @keyup.enter="insertProjectCode"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-btn block rounded depressed @click="searchSubject">搜索</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-navigation-drawer>

    <app-bar></app-bar>

    <v-content>
      <v-toolbar dense>
        <v-toolbar-title class="subtitle-1 font-weight-black">借方发生数 ¥ {{sumJAmount.toFixed(2)}}</v-toolbar-title>
        <v-divider vertical inset class="mx-3"></v-divider>
        <v-toolbar-title class="subtitle-1 font-weight-black">
          贷方发生数
          ¥ {{sumDAmount.toFixed(2)}}
        </v-toolbar-title>
      </v-toolbar>
      <transition appear appear-active-class="fade-left-enter">
        <v-container fluid>
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="(item,i) in subjectGroupList" :key="`group-${i}`">
              <v-expansion-panel-header>{{i}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table class="transparent">
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
                      <tr
                        v-for="(subject,j) in item"
                        :key="`cert-${j}`"
                        @click="showDetail(subject)"
                      >
                        <td class="caption">{{ subject.subjName }}</td>
                        <td class="caption">{{ subject.subj }}</td>
                        <td class="caption">¥ {{ subject.jAmount.toFixed(2) }}</td>
                        <td class="caption">¥ {{ subject.dAmount.toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
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
  public $refs!: {
    searchSubjectForm: HTMLFormElement;
  };

  private datePickerMenu: boolean = false;
  private dateRange = [];
  private projectCode: string[] = [""];
  private subjectGroupList: any = {};
  private certificateList: any[] | undefined = [];
  private detailNav: boolean = false;

  private sumDAmount: number = 0;
  private sumJAmount: number = 0;

  private async searchSubject() {
    if (this.$refs.searchSubjectForm.validate()) {
      const rsp = await FinanceService.searchSubject(
        this.projectCode,
        this.dateRange[0],
        this.dateRange[1]
      );
      this.subjectGroupList = rsp.subject;
    }
  }

  private async showDetail(item: Certificate) {
    this.detailNav = true;
    this.certificateList = item.pzds;
  }

  private insertProjectCode() {
    if (this.$refs.searchSubjectForm.validate()) {
      this.projectCode.push("");
    }
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

  @Watch("subjectGroupList")
  private onSubjectGroupListChanged() {
    if (Object.keys(this.subjectGroupList).length > 0) {
      for (const group in this.subjectGroupList) {
        console.log(group);
        for (const subject of this.subjectGroupList[group]) {
          this.sumDAmount += subject.dAmount;
          this.sumJAmount += subject.jAmount;
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
