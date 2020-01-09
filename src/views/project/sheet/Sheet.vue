<template>
  <div>
    <v-toolbar dense>
      <v-tabs v-model="currentType">
        <v-tab href="#全部">全部</v-tab>
        <v-tab
          :href="`#${item}`"
          v-for="(item, i) in typeList"
          :key="`t-${i}`"
          >{{ item }}</v-tab
        >
      </v-tabs>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="createSheetDialog = true">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;新建表单
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container
      fluid
      style="height:calc(100vh - 98px);padding:0;overflow-y:auto"
    >
      <v-layout fill-height v-if="sheetList.length >= 1">
        <transition appear appear-active-class="fade-up-enter">
          <!-- sheet list -->
          <v-flex :class="currentProjectID && currentSheetID ? `xs9` : `xs12`">
            <v-simple-table class="transparent">
              <thead>
                <tr>
                  <th class="text-center">标题</th>
                  <th class="text-center">创建时间</th>
                  <th class="text-center">更新时间</th>
                  <th class="text-center">创建者</th>
                  <th class="text-center">属性</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in sheetListShow"
                  :key="`sheet-${i}`"
                  @click="
                    currentSheetID = item.id;
                    currentTemplateID = item.templateID;
                  "
                  :style="
                    currentSheetID === item.id
                      ? `background-color:#efefef36`
                      : ``
                  "
                >
                  <td class="text-center">{{ item.name }}</td>
                  <td class="text-center">
                    {{ item.createdAt | format('yyyy-MM-dd hh:mm') }}
                  </td>
                  <td class="text-center">
                    {{ item.updatedAt | format('yyyy-MM-dd hh:mm') }}
                  </td>
                  <td class="text-center">
                    <user-chip :userID="item.userID"></user-chip>
                  </td>
                  <td class="text-center">
                    <v-chip small class="font-weight-black caption">{{
                      item.target
                    }}</v-chip>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-flex>
        </transition>
        <v-flex
          v-if="currentSheetID && currentTemplateID"
          xs3
          class="inner-sidebar-withoutpadding"
        >
          <transition appear appear-active-class="fade-up-enter">
            <sheet-info
              ref="sheetInfo"
              :sheetID="currentSheetID"
              :templateID="currentTemplateID"
            ></sheet-info>
          </transition>
        </v-flex>
      </v-layout>
      <v-layout v-else fill-height justify-center align-center>
        <h3>请创建表单</h3>
      </v-layout>
      <v-bottom-sheet v-model="createSheetDialog" inset>
        <v-sheet class="text-center" height="900px" style="overflow:auto">
          <create-sheet
            :target="`普通`"
            @closeDialog="createSheetDialog = false"
          ></create-sheet>
        </v-sheet>
      </v-bottom-sheet>
      <v-bottom-sheet v-model="editSheetDialog" inset>
        <v-sheet class="text-center" height="900px" style="overflow:auto">
          <v-container fluid>
            <v-layout row justify-center>
              <v-flex xs8></v-flex>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-bottom-sheet>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { namespace } from 'vuex-class';
import { Template, Sheet } from '@/types/sheet';
import createSheet from '@/components/project/sheet/CreateSheet.vue';
import sheetInfo from '@/components/project/sheet/SheetInfo.vue';
import SheetService from '@/service/sheetService';

const projectModule = namespace('project');
const sheetModule = namespace('sheet');

@Component({
  components: {
    'create-sheet': createSheet,
    'sheet-info': sheetInfo
  }
})
export default class ProjectSheet extends Vue {
  @projectModule.Getter('currentProjectID') private currentProjectID: any;

  @projectModule.Getter('projectMemberCache') private projectMemberCache: any;

  @sheetModule.Getter('sheetList') private sheetList: any;

  private createSheetDialog: boolean = false;

  private editSheetDialog: boolean = false;

  private searchSheetContent: string = '';

  private sheetListShow: any[] = [];

  private currentSheetID: string = '';

  private currentTemplateID: string = '';

  private currentType: string = 'all';

  private searchSheet() {
    this.sheetListShow = [];
    for (const item of this.sheetList) {
      if (item.name.indexOf(this.searchSheetContent) !== -1) {
        this.sheetListShow.push(item);
      }
    }
  }

  private async getSheetList() {
    this.createSheetDialog = false;
    await SheetService.getSheetList(this.currentProjectID);
  }

  get typeList() {
    const typeList = [];
    for (const item of this.sheetList) {
      if (typeList.indexOf(item.target) === -1) {
        typeList.push(item.target);
      }
    }
    return typeList;
  }

  @Watch('searchSheetContent')
  private onSearchSheetContentChanged() {
    this.searchSheet();
  }

  @Watch('sheetList')
  private onSheetListChanged() {
    this.currentType = '全部';
    this.sheetListShow = this.sheetList;
  }

  @Watch('currentType')
  private onCurrentTypeChanged() {
    this.sheetListShow = [];
    if (this.currentType === '全部') {
      this.sheetListShow = this.sheetList;
    } else {
      for (const item of this.sheetList) {
        if (item.target === this.currentType) {
          this.sheetListShow.push(item);
        }
      }
    }
  }

  private mounted() {
    this.getSheetList();
  }
}
</script>

<style scoped></style>
