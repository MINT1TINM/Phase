<template>
  <v-container fluid>
    <v-list dense v-if="uniNo !== ``">
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">凭证账号</v-list-item-title>
          {{ certificate.uniNo }}.{{ certificate.ord }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">日期</v-list-item-title>
          {{ certificate.date }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">摘要</v-list-item-title>
          {{ certificate.sabstract }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">借方发生数</v-list-item-title>
          {{ certificate.jAmount }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">贷方发生数</v-list-item-title>
          {{ certificate.dAmount }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">科目名称</v-list-item-title>
          {{ certificate.subjName }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">科目代码</v-list-item-title>
          {{ certificate.subj }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">负责人姓名</v-list-item-title>
          {{ certificate.chargeSno }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="text-left">
        <v-list-item-content>
          <v-list-item-title class="caption">负责人工号</v-list-item-title>
          {{ certificate.chargeSno }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-else>点击左侧以查看详情</div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Watch } from 'vue-property-decorator';
import FinanceService from '@/service/financeService';
import { Certificate } from '@/types/finance';

@Component
export default class CertificatePreview extends Vue {
  @Prop(String) uniNo!: string;

  @Prop(String) ord!: string;

  certificate: Certificate = new Certificate();

  @Watch('uniNo')
  async onUniNoChanged() {
    const rsp = await FinanceService.searchCertificate(this.uniNo);
    this.certificate = rsp.certificate.find(
      (e: Certificate) => e.ord === this.ord
    );
  }
}
</script>

<style scoped></style>
