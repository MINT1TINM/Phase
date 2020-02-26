<template>
  <div>
    <v-toolbar dense class="navbar">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >签证变更</v-toolbar-title
      >

      <v-select
        class="ml-4 body-2"
        :items="appTypeList"
        v-model="options.appType"
        dense
        label="类型"
        outlined
        style="max-width:250px"
        single-line
        hide-details
      ></v-select>

      <v-select
        class="ml-4 body-2"
        :items="statusList"
        v-model="options.status"
        dense
        label="状态"
        outlined
        style="max-width:250px"
        single-line
        hide-details
      ></v-select>

      <v-btn
        icon
        @click="
          options.appType = '';
          options.status = '';
        "
        ><v-icon size="20">mdi-close</v-icon></v-btn
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

      <template v-slot:item.amount="{ item }">
        ¥ {{ item.amount.toFixed(2) }}
      </template>

      <template v-slot:item.checkAmount="{ item }">
        ¥ {{ item.checkAmount.toFixed(2) }}
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date | format('yyyy-MM-dd') }}
      </template>

      <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt | format('yyyy-MM-dd hh:mm:ss') }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
  options: {
    page: number;
    itemsPerPage: number;
    appType: string;
    status: string;
  } = {
    page: 1,
    itemsPerPage: 20,
    appType: '',
    status: ''
  };
  loading = false;
  appTypeList = ['签证', '变更', '批价', '招标文件'];
  statusList = [
    '待提交',
    '待审计组受理',
    '待投资审计审核',
    '待审计组审核',
    '已审核'
  ];

  async getVisaList() {
    const v = new Visa();
    v.projectUUID = this.currentProject.id;
    v.appType = this.options.appType;
    v.status = this.options.status;
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
    v.status = '待提交';
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

  @Watch('options', { deep: true })
  onChanged() {
    this.getVisaList();
  }

  mounted() {
    this.getVisaList();
  }
}
</script>

<style scoped></style>
