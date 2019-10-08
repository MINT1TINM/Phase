<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-app-bar dense app fixed dark color="primary darken-1" style="margin-top:48px">
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <v-layout>
              <v-select
                solo-inverted
                flat
                dense
                class="body-2"
                single-line
                hide-details
                :items="keyList"
                v-model="currentKey"
                item-text="text"
                item-value="value"
              ></v-select>
              <v-autocomplete
                v-model="select"
                dense
                :loading="loading"
                :items="result"
                :search-input.sync="search"
                cache-items
                class="mx-1 body-2"
                flat
                hide-no-data
                single-line
                hide-details
                label="搜索项目"
                solo-inverted
                item-text="name"
                item-value="name"
                @keyup.enter="searchProject(search)"
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchProject(search)"
                @click:row="showDetail"
              ></v-autocomplete>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-app-bar>
      <transition appear appear-active-class="fade-left-enter">
        <v-simple-table height="calc(100vh - 96px)" fixed-header class="transparent">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">项目代码</th>
                <th class="text-left">名称</th>
                <th class="text-left">负责人</th>
                <th class="text-left">负责人工号</th>
                <th class="text-left">项目余额</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item,i) in searchProjectResult"
                :key="`project-${i}`"
                @click="$router.push({path:`/finance/project/${item.code}/${item.chargeSno}`});updateCurrentProject(item)"
              >
                <td>{{ item.code }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.chargeName }}</td>
                <td>{{ item.chargeSno }}</td>
                <td>¥ {{ item.balance.toFixed(2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import FinanceService from "@/service/financeService";
import { namespace } from "vuex-class";
import { AuditProject } from "@/types/finance";

const financeModule = namespace("finance");

@Component
export default class Certifcate extends Vue {
  @financeModule.Getter("searchProjectResult")
  private searchProjectResult!: AuditProject[];
  @financeModule.Mutation("updateCurrentProject")
  private updateCurrentProject!: (project: AuditProject) => void;

  private keyList = [
    { text: "项目名称", value: "NAME" },
    { text: "项目代码", value: "CODE" },
    { text: "负责人工号", value: "CHARGE_SNO" }
  ];
  private currentKey = "NAME";

  private search: string = "";
  private loading: boolean = false;
  private select = null;
  private result = [];

  private headers = [
    {
      text: "项目代码",
      sortable: false,
      value: "code"
    },
    { text: "项目名称", value: "name", sortable: false },
    { text: "负责人", value: "fat", sortable: false },
    { text: "负责人工号", value: "chargeSno", sortable: false }
  ];

  private async querySelections(v: string) {
    this.loading = true;
    // Simulated ajax query
    const rsp = await FinanceService.searchFinanceProject(
      this.currentKey,
      this.search,
      undefined,
      undefined,
      true
    );
    this.result = rsp.project;
    this.loading = false;
  }

  private async searchProject(v: string) {
    await FinanceService.searchFinanceProject(this.currentKey, v, 50, 1);
  }

  private showDetail(v: any) {
    console.log(v);
  }

  @Watch("search")
  private async onSearchChanged(val: string) {
    val && val !== this.select && (await this.querySelections(val));
  }
}
</script>

<style scoped>
</style>
