<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap fill-height justify-center>
      <v-flex xs10>
        <v-text-field
          append-outer-icon="mdi-magnify"
          @click:append-outer="searchCertificate"
          @keyup.enter="searchCertificate"
          outlined
          flat
          dense
          v-model="searchContent"
          hide-details
          single-line
          label="凭证号码"
        ></v-text-field>
        <v-card outlined class="mt-4">
          <v-simple-table>
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
                  <th class="text-left">负责人姓名</th>
                  <th class="text-left">负责人工号</th>
                  <th class="text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in certificateList" :key="`cert-${i}`">
                  <td class="caption text-left">{{ item.uniNo }}.{{item.ord}}</td>
                  <td class="caption text-left">{{ item.date}}</td>
                  <td class="caption text-left">{{ item.sabstract }}</td>
                  <td class="caption text-left">¥ {{ item.jAmount.toFixed(2) }}</td>
                  <td class="caption text-left">¥ {{ item.dAmount.toFixed(2) }}</td>
                  <td class="caption text-left">{{ item.subjName }}</td>
                  <td class="caption text-left">{{ item.subj }}</td>
                  <td class="caption text-left">{{ item.chargeName }}</td>
                  <td class="caption text-left">{{ item.chargeSno }}</td>
                  <td class="text-left">
                    <v-btn
                      :disabled="item.addable===false"
                      icon
                      @click="insertCertificate(item.uniNo,item.ord,i)"
                    >
                      <v-icon size="20">mdi-plus</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FinanceService from '@/service/financeService';
import { Certificate } from '@/types/finance';

@Component
export default class CertificateSearch extends Vue {
  private searchContent: string = '';

  private certificateList: Certificate[] = [];

  private async searchCertificate() {
    const rsp = await FinanceService.searchCertificate(this.searchContent);
    this.certificateList = rsp.certificate;
  }

  private insertCertificate(uniNo: string, ord: string, i: number) {
    this.$emit('insertCertificate', { uniNo, ord });
  }
}
</script>

<style scoped>
</style>
