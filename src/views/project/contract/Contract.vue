<template>
  <div>
    <v-toolbar dense class="navbar">
      <!-- TODO: filter -->

      <!--
        
      <v-toolbar-title class="caption mr-3">合同编号</v-toolbar-title>

     <v-text-field
        style="max-width:250px"
        single-line
        class="body-2"
        hide-details
        dense
        v-model="search.id"
        outlined
      ></v-text-field>

      <v-toolbar-title class="caption ml-5 mr-3">时间范围</v-toolbar-title>

      <v-menu
        ref="datePickerMenu"
        v-model="datePickerMenu"
        :close-on-content-click="false"
        :return-value.sync="search.timeRange"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            style="max-width:250px"
            v-model="dateRangeText"
            label="Picker in menu"
            single-line
            hide-details
            class="body-2"
            outlined
            dense
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker range v-model="search.timeRange" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="datePickerMenu = false"
            >Cancel</v-btn
          >
          <v-btn
            text
            color="primary"
            @click="$refs.datePickerMenu.save(search.timeRange)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>


  

      <v-btn outlined @click="searchContract"
        ><v-icon size="20" class="mr-1">mdi-check</v-icon>确认筛选</v-btn
      >
      -->

      <v-spacer></v-spacer>

      <v-divider vertical class="mx-2"></v-divider>

      <v-btn outlined color="primary" @click="createContract"
        ><v-icon size="20" class="mr-1">mdi-plus</v-icon>创建</v-btn
      >
    </v-toolbar>

    <v-data-table
      height="calc(100vh - 156px)"
      style="overflow:auto"
      fixed-header
      disable-sort
      disable-filtering
      :headers="headers"
      :items="contractList"
      :items-per-page="20"
      class="transparent"
      :footer-props="{
        itemsPerPageOptions: [20, 50],
        showCurrentPage: true
      }"
    >
      <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt | format('yyyy-MM-dd hh:mm:ss') }}
      </template>
      <template v-slot:item.signedAt="{ item }">
        {{ item.signedAt | format('yyyy-MM-dd hh:mm:ss') }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contract } from '@/types/project';
import ContractService from '@/service/contractService';

class SearchContract {
  constructor(timeRange: string[]) {
    this.timeRange = timeRange;
  }
  id?: string;
  timeRange!: string[];
}

@Component
export default class ProjectContract extends Vue {
  public $refs!: {
    datePickerMenu: HTMLBaseElement;
  };

  private search = new SearchContract([
    new Date(new Date().getTime() - 7 * 1000 * 60 * 60 * 24)
      .toISOString()
      .substr(0, 10),
    new Date().toISOString().slice(0, 10)
  ]);
  private datePickerMenu = false;

  private headers = [
    {
      text: '编号',
      align: 'left',
      value: 'code'
    },
    { text: '名称', value: 'name' },
    { text: '创建时间', value: 'createdAt' },
    { text: '签约时间', value: 'signedAt' },
    { text: '乙方', value: 'contractorName' },
    { text: '金额', value: 'amount' }
  ];
  private contractList: Contract[] = [];

  private async searchContract() {}

  private async createContract() {}

  private async getContractList() {
    this.contractList = await ContractService.getContractList();
  }

  private get dateRangeText() {
    return this.search.timeRange.join(' ~ ');
  }

  private mounted() {
    this.getContractList();
  }
}
</script>

<style scoped></style>
