<template>
  <div>
    <v-card outlined>
      <v-card-title class="font-weight-black subtitle-1">
        表单
        <v-spacer></v-spacer>
        <v-btn text rounded @click="createSheetDialog=true">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;新建
        </v-btn>
      </v-card-title>
      <v-data-table class="mt-4" :headers="headers" :items="sheetList">
        <template v-slot:item.userID="{item}">
          <user-chip :userID="item.userID"></user-chip>
        </template>
        <template v-slot:item.actions="{item}">
          <v-btn
            icon
            small
            color="primary"
            @click="editSheetDialog=true;currentSheet=item;getTemplateInfo(item.templateID)"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn icon small color="error" @click="deleteTaskSheet(item.id)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-bottom-sheet v-model="createSheetDialog" inset>
      <v-sheet class="text-center" height="800px" style="overflow:auto">
        <v-container fluid>
          <create-sheet
            :target="`取证单`"
            @closeDialog="createSheetDialog=false"
            :taskID="$route.params.taskID"
          ></create-sheet>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="editSheetDialog" inset persistent>
      <v-sheet class="text-center" height="800px" style="overflow:auto">
        <v-container fluid>
          <fill-sheet
            @closeDialog="editSheetDialog=false"
            :templateInfo="templateInfo"
            :sheetInfo="currentSheet"
          ></fill-sheet>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import createSheet from "@/components/project/sheet/CreateSheet.vue";
import SheetService from "@/service/sheetService";
import { Sheet, Template } from "@/types/sheet";
import { namespace } from "vuex-class";
import fillSheet from "@/components/project/sheet/FillSheet.vue";
import TaskService from "@/service/taskService";

const projectModule = namespace("project");

@Component({
  components: {
    "create-sheet": createSheet,
    "fill-sheet": fillSheet
  }
})
export default class RelatedDocument extends Vue {
  @Prop({ default: [] }) private sheetIDList!: [];

  @projectModule.Getter("projectMemberCache") private projectMemberCache: any;

  private createSheetDialog: boolean = false;
  private editSheetDialog: boolean = false;
  private sheetList: Sheet[] = [];
  private currentSheet: Sheet = {
    id: "",
    name: "",
    content: {},
    target: ""
  };
  private templateInfo: Template = {
    name: "",
    field: {
      data: []
    },
    type: "",
    locked: false
  };
  private headers = [
    { text: "名称", value: "name", align: "center", sortable: false },
    { text: "创建者", value: "userID", align: "center", sortable: false },
    { text: "操作", value: "actions", align: "center", sortable: false }
  ];

  @Watch("sheetIDList")
  private async onSheetIDListChanged() {
    console.log(this.sheetIDList);
    if (this.sheetIDList && this.sheetIDList.length > 0) {
      const rsp = await SheetService.getSheetInfoList(this.sheetIDList);
      this.sheetList = rsp.sheet;
    } else {
      this.sheetList = [];
    }
  }

  private async getTemplateInfo(templateID: string) {
    this.templateInfo = {
      name: "",
      field: {
        data: []
      },
      type: "",
      locked: false
    };
    const rsp = await SheetService.getSheetTemplate(templateID);
    this.templateInfo = rsp.template;
  }

  private async deleteTaskSheet(sheetID: string) {
    const res = await this.$confirm("此操作无法恢复", {
      title: "确认删除?",
      buttonTrueColor: "primary",
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await SheetService.deleteSheet(
        sheetID,
        this.$route.params.taskID,
        "sheet"
      );
      await TaskService.getTaskInfo(this.$route.params.taskID);
    }
  }

  private async mounted() {
    if (this.sheetIDList && this.sheetIDList.length > 0) {
      const rsp = await SheetService.getSheetInfoList(this.sheetIDList);
      this.sheetList = rsp.sheet;
    } else {
      this.sheetList = [];
    }
  }
}
</script>

<style scoped>
</style>
