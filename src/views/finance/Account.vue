<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-app-bar dense app fixed dark color="primary darken-1" style="margin-top:48px">
        <v-btn icon @click="$router.push({path:`/finance/project`})">
          <v-icon size="20">mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="subtitle-2">{{currentProject.code}} - {{currentProject.name}}</v-toolbar-title>
        <v-divider class="mx-5" vertical inset></v-divider>
        <v-toolbar-title class="subtitle-2">{{currentProject.chargeSno}}</v-toolbar-title>
      </v-app-bar>
      <transition appear appear-active-class="fade-left-enter">
        <v-simple-table fixed-header class="transparent">
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
                <td>¥ {{ item.jAmount.toFixed(2) }}</td>
                <td>¥ {{ item.dAmount.toFixed(2) }}</td>
                <td>
                  <v-btn icon @click="detailNav=true;currentCertificate=item">
                    <v-icon>mdi-information-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </transition>
    </v-content>

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
                <tr v-for="(item,i) in currentCertificate.pzds" :key="`cert-${i}`">
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
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FinanceService from '@/service/financeService';
import { AuditProject, Certificate } from '@/types/finance';

const financeModule = namespace('finance');

@Component
export default class CertificateAccount extends Vue {
  @financeModule.Getter('currentProject')
  private currentProject!: AuditProject;

  private headers = [
    {
      text: '日期',
      sortable: false,
      value: 'name',
    },
    { text: '凭证账号', value: 'uniNo', sortable: false },
    { text: '摘要', value: 'sabstract', sortable: false },
    { text: '借方发生数', value: 'jAmount', sortable: false },
    { text: '贷方发生数', value: 'dAmount', sortable: false },
    { text: '负责人', value: 'carsbs', sortable: false },
    { text: '工号', value: 'carbs', sortable: false },
  ];

  private certificateList: Certificate[] = [];

  private detailNav: boolean = false;

  private currentCertificate = {};

  private async getCertificateList() {
    const rsp = await FinanceService.searchCertificateGroup(
      this.$route.params.projectCode,
      this.$route.params.staffNo,
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
