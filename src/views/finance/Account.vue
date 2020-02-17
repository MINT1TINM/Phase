<template>
  <div>
    <v-app-bar
      dense
      app
      fixed
      dark
      color="primary darken-1"
      style="margin-top:48px"
    >
      <v-btn icon @click="$router.push({ path: `/project` })">
        <v-icon size="20">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="subtitle-2"
        >{{ currentProject.code }} - {{ currentProject.name }}</v-toolbar-title
      >
      <v-divider class="mx-5" vertical inset></v-divider>
      <v-toolbar-title class="subtitle-2">{{
        currentProject.chargeSno
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined rounded small @click="exportCertificateList">
        <v-icon size="15">mdi-export-variant</v-icon>&nbsp;导出结果
      </v-btn>
    </v-app-bar>
    <transition appear appear-active-class="fade-left-enter">
      <v-simple-table fixed-header class="transparent">
        <template v-slot:default>
          <thead>
            <tr>
              <th
                v-for="(item, i) in certificateHeaders"
                :key="`cd-${i}`"
                class="text-left"
              >
                {{ item }}
              </th>
              <th class="text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in certificateList" :key="`cert-${i}`">
              <td>{{ item.uniNo }}</td>
              <td>{{ item.sabstract }}</td>
              <td>¥ {{ item.jAmount.toFixed(2) }}</td>
              <td>¥ {{ item.dAmount.toFixed(2) }}</td>
              <td>
                <v-btn
                  icon
                  @click="
                    detailNav = true;
                    currentCertificate = item;
                  "
                >
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </transition>

    <v-dialog
      scrollable
      transition="slide-x-reverse-transition"
      v-model="detailNav"
    >
      <v-card height="500">
        <v-card-title class="pa-0">
          <v-toolbar flat class="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black"
              >凭证详情</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn outlined rounded small @click="exportCertificateDetailList">
              <v-icon size="15">mdi-export-variant</v-icon>&nbsp;导出结果
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-simple-table fixed-header class="transparent">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="(item, i) in certificateDetailHeaders"
                    :key="`cd-${i}`"
                    class="text-left"
                  >
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in currentCertificate.pzds"
                  :key="`cert-${i}`"
                >
                  <td class="caption">{{ item.uniNo }}.{{ item.ord }}</td>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import FinanceService from '@/service/financeService';
import { AuditProject, Certificate } from '@/types/finance';
import ToolkitService from '@/service/toolkitService';

const financeModule = namespace('finance');

@Component
export default class CertificateAccount extends Vue {
  @financeModule.Getter('currentProject')
  currentProject!: AuditProject;

  certificateList: Certificate[] = [];

  detailNav: boolean = false;

  currentCertificate: any = {};

  certificateHeaders = ['凭证账号', '摘要', '借方发生数', '贷方发生数'];

  certificateDetailHeaders = [
    '凭证账号',
    '日期',
    '摘要',
    '借方发生数',
    '贷方发生数',
    '科目名称',
    '科目代码',
    '负责人姓名',
    '负责人工号'
  ];

  async getCertificateList() {
    const rsp = await FinanceService.searchCertificateGroup(
      this.$route.params.projectCode,
      this.$route.params.staffNo
    );
    this.certificateList = rsp.certificate;
  }

  async exportCertificateList() {
    // adjust head & data field
    const head: string[] = [];
    for (const field of this.certificateHeaders) {
      head.push(field);
    }

    const data: any[] = [];
    for (const item of this.certificateList) {
      data.push([
        item.uniNo,
        item.sabstract,
        `¥ ${item.jAmount.toFixed(2)}`,
        `¥ ${item.dAmount.toFixed(2)}`
      ]);
    }

    const rsp = await ToolkitService.exportListToXlsx(head, data);
    window.open(
      `/api/file/download?sName=${rsp.fileName}&type=export`,
      '_blank'
    );
  }

  async exportCertificateDetailList() {
    // adjust head & data field
    const head: string[] = [];
    for (const field of this.certificateDetailHeaders) {
      head.push(field);
    }

    const data: any[] = [];
    for (const item of this.currentCertificate.pzds) {
      data.push([
        item.uniNo,
        item.date,
        item.sabstract,
        `¥ ${item.jAmount.toFixed(2)}`,
        `¥ ${item.dAmount.toFixed(2)}`,
        item.subjName,
        item.subj,
        '',
        item.chargeSno
      ]);
    }

    const rsp = await ToolkitService.exportListToXlsx(head, data);
    window.open(
      `/api/file/download?sName=${rsp.fileName}&type=export`,
      '_blank'
    );
  }

  mounted() {
    this.getCertificateList();
  }
}
</script>

<style scoped></style>
