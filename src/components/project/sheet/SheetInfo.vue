<template>
  <v-container fluid>
    <v-btn block outlined color="primary" @click="fillSheetDialog=true">
      <v-icon size="20">mdi-pencil-outline</v-icon>&nbsp;修改
    </v-btn>
    <v-btn block outlined color="error" class="mt-2" @click="deleteSheet">
      <v-icon size="20">mdi-delete-outline</v-icon>&nbsp;删除
    </v-btn>
    <h4 class="pt-5">表单信息</h4>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">标题</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{sheetInfo.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">模版</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{templateInfo.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">类型</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{templateType}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">创建时间</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{sheetInfo.createdAt | format("yyyy-MM-dd h:m")}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">最后修改</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{sheetInfo.updatedAt | format("yyyy-MM-dd h:m")}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">创建者</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{sheetInfo.userID}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">修改记录</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-bottom-sheet v-model="fillSheetDialog" inset>
      <v-sheet class="text-center" height="900px" style="overflow:auto">
        <v-container fluid>
          <v-layout row justify-center>
            <v-flex xs8>
              <fill-sheet :templateInfo="templateInfo" :sheetInfo="sheetInfo"></fill-sheet>
            </v-flex>
          </v-layout>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Sheet, Template } from "@/types/sheet";
import SheetService from "@/service/sheetService";
import fillSheet from "@/components/project/sheet/FillSheet.vue";
import { namespace } from "vuex-class";

const sheetModule = namespace("sheet");
const projectModule = namespace("project");

@Component({
  components: {
    "fill-sheet": fillSheet
  }
})
export default class SheetInfo extends Vue {
  @sheetModule.Getter("type") private type: any;
  @projectModule.Getter("currentProjectID") private currentProjectID: any;

  @Prop({ default: "" }) private templateID!: string;
  @Prop({ default: "" }) private sheetID!: string;

  private sheetInfo: Sheet = {
    id: "",
    name: "",
    content: null
  };
  private templateInfo: Template = {
    name: "",
    field: {
      data: []
    },
    type: ""
  };
  private fillSheetDialog: boolean = false;

  private async getSheetInfo(sheetID: string) {
    this.sheetInfo = {
      id: "",
      name: "",
      content: {}
    };
    const rsp = await SheetService.getSheetInfo(sheetID);
    this.sheetInfo = rsp.sheet;
  }

  private async getTemplateInfo(templateID: string) {
    this.templateInfo = {
      name: "",
      field: {
        data: []
      },
      type: ""
    };
    const rsp = await SheetService.getSheetTemplate(templateID);
    this.templateInfo = rsp.template;
  }

  private async deleteSheet() {
    const res = await this.$confirm("此操作无法复原", {
      title: "确认删除?",
      buttonTrueColor: "primary"
    });
    if (res) {
      const rsp = await SheetService.deleteSheet(this.sheetID);
      await SheetService.getSheetList(this.currentProjectID);
    }
  }

  @Watch("templateID")
  private onTemplateIDChanged() {
    this.getTemplateInfo(this.templateID);
  }

  @Watch("sheetID")
  private onSheetIDChanged() {
    this.getSheetInfo(this.sheetID);
  }

  get templateType() {
    if (this.templateInfo.type) {
      return this.type(this.templateInfo.type).name;
    } else {
      return "";
    }
  }

  private mounted() {
    this.getTemplateInfo(this.templateID);
    this.getSheetInfo(this.sheetID);
  }
}
</script>

<style scoped>
</style>
