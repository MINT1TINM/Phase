<template>
  <div>
    <v-toolbar flat class="navbar" dense style="z-index:2">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        hide-details
        outlined
        single-line
        class="text-field-dense"
        label="搜索表单"
        v-model="searchSheetContent"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="createSheetDialog=true">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;新建表单
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid style="height:calc(100vh - 96px);padding:0;overflow-y:auto">
      <v-layout fill-height>
        <!-- sheet list -->
        <v-flex :class="currentProjectID&&currentSheetID?`xs9`:`xs12`">
          <v-simple-table class="transparent">
            <thead>
              <tr>
                <th class="text-left">标题</th>
                <th class="text-left">创建时间</th>
                <th class="text-left">更新时间</th>
                <th class="text-left">创建者</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item,i) in sheetList"
                :key="`sheet-${i}`"
                @click="currentSheetID = item.id;currentTemplateID = item.templateID"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.createdAt | format("yyyy-MM-dd h:m") }}</td>
                <td>{{ item.updatedAt | format("yyyy-MM-dd h:m")}}</td>
                <td>{{ item.userID }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-flex>
        <v-flex v-if="currentSheetID && currentTemplateID" xs3 class="inner-sidebar-withoutpadding">
          <sheet-info ref="sheetInfo" :sheetID="currentSheetID" :templateID="currentTemplateID"></sheet-info>
        </v-flex>
      </v-layout>
      <v-bottom-sheet v-model="createSheetDialog" inset>
        <v-sheet class="text-center" height="900px" style="overflow:auto">
          <create-sheet></create-sheet>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import dimForm from "@/plugins/dim-form/Main.vue";
import { Template, Sheet } from "@/types/sheet";
import createSheet from "@/components/project/sheet/CreateSheet.vue";
import sheetInfo from "@/components/project/sheet/SheetInfo.vue";
import SheetService from "@/service/sheetService";
import { namespace } from "vuex-class";

const projectModule = namespace("project");
const sheetModule = namespace("sheet");

@Component({
  components: {
    "dim-form": dimForm,
    "create-sheet": createSheet,
    "sheet-info": sheetInfo
  }
})
export default class ProjectSheet extends Vue {
  @projectModule.Getter("currentProjectID") private currentProjectID: any;
  @sheetModule.Getter("sheetList") private sheetList: any;

  private createSheetDialog: boolean = false;
  private editSheetDialog: boolean = false;
  private searchSheetContent: string = "";

  private currentSheetID: string = "";
  private currentTemplateID: string = "";

  private async getSheetList() {
    this.createSheetDialog = false;
    await SheetService.getSheetList(this.currentProjectID);
  }

  private mounted() {
    this.getSheetList();
  }
}
</script>

<style scoped>
</style>
