<template>
  <div>
    <v-toolbar dense class="navbar">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >签证变更</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-divider vertical class="mx-2"></v-divider>

      <v-btn outlined color="primary" @click="createVisa"
        ><v-icon size="20" class="mr-1">mdi-plus</v-icon>创建</v-btn
      >
    </v-toolbar>

    <v-data-table
      height="calc(100vh - 156px)"
      style="overflow:auto"
      fixed-header
      disable-sort
      disable-filtering
      :options.sync="options"
      :headers="headers"
      :items="visaList"
      :items-per-page="1"
      class="transparent"
      :footer-props="{
        itemsPerPageOptions: [20, 50],
        showCurrentPage: true
      }"
      @click:row="showInfo"
    >
      <template v-slot:item.userUUID="{ item }">
        <v-chip small class="caption font-weight-black">{{
          item.userCache.nickName
        }}</v-chip>
      </template>

      <template v-slot:item.file="{ item }">
        {{ item.file }}
        <v-btn icon small v-if="item.file"
          ><v-icon size="20">mdi-download-outline</v-icon></v-btn
        >
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date | format('yyyy-MM-dd') }}
      </template>

      <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt | format('yyyy-MM-dd hh:mm:ss') }}
      </template>

      <template v-slot:item.status="{ item }">
        <div v-if="item.extraInfo.checked">已审核</div>
        <div
          v-else-if="
            !item.extraInfo.checked && item.extraInfo.checkFlowID != ''
          "
        >
          待审核
        </div>
        <div v-else>待提交</div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Visa, Project } from '@/types/project';
import VisaService from '@/service/visaService';
import { namespace } from 'vuex-class';

const projectModule = namespace('project');

@Component
export default class ProjectVisa extends Vue {
  @projectModule.Getter('currentProject') currentProject!: Project;

  headers = [
    { text: '申请编号', value: 'appCode' },
    { text: '类型', value: 'appType' },
    { text: '送审金额', value: 'amount' },
    { text: '审核金额', value: 'checkAmount' },
    { text: '状态', value: 'status' },
    { text: '创建时间', value: 'createdAt' }
  ];

  visaList: Visa[] = [];
  options: { page: number; itemsPerPage: number } = {
    page: 1,
    itemsPerPage: 20
  };
  loading = false;

  async getVisaList() {
    const v = new Visa();
    v.projectUUID = this.currentProject.id;
    this.visaList = await VisaService.getVisaList(
      this.options.page,
      this.options.itemsPerPage,
      v
    );
  }

  async createVisa() {
    const v = new Visa();
    v.name = '未命名';
    v.appCode = '待填写';
    v.projectUUID = this.currentProject.id;
    try {
      await VisaService.createVisa(v);
      this.$snack('创建成功');
    } catch (_) {
      this.$snack('创建失败');
    }

    this.getVisaList();
  }

  showInfo(v: Visa) {
    this.$router.push({ path: `/visa/${v.id}` });
  }

  mounted() {
    this.getVisaList();
  }
}
</script>

<style scoped></style>
