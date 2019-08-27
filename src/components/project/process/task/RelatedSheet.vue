<template>
  <div>
    <v-card outlined>
      <v-card-title class="font-weight-black subtitle-1">
        取证单
        <v-spacer></v-spacer>
        <v-btn text rounded @click="createSheetDialog=true">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;新建
        </v-btn>
      </v-card-title>
      <v-data-table class="mt-4" :headers="headers" :items="sheetList" hide-default-footer>
        <template v-slot:item.userID="{item}">
          <v-chip pill small>
            <v-avatar size="10" left>
              <v-img :src="projectMemberCache(item.userID).headImgURL"></v-img>
            </v-avatar>
            <span class="font-weight-black">{{ projectMemberCache(item.userID).nickName }}</span>
          </v-chip>
        </template>
        <template v-slot:item.actions="{item}">
          <v-btn icon small color="primary" @click="editSubTaskDialog=true;currentSubTask = item">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn icon small color="error" @click="deleteSubTask(item.id)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-bottom-sheet v-model="createSheetDialog" inset>
      <v-sheet class="text-center" height="800px" style="overflow:auto">
        <v-container fluid>
          <create-sheet :taskID="$route.params.taskID"></create-sheet>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import createSheet from "@/components/project/sheet/CreateSheet.vue";
import SheetService from "@/service/sheetService";
import { Sheet } from "@/types/sheet";
import { namespace } from "vuex-class";

const projectModule = namespace("project");

@Component({
  components: {
    "create-sheet": createSheet
  }
})
export default class RelatedDocument extends Vue {
  @Prop({ default: [] }) private sheetIDList!: [];

  @projectModule.Getter("projectMemberCache") private projectMemberCache: any;

  private createSheetDialog: boolean = false;
  private sheetList: Sheet[] = [];
  private headers = [
    { text: "名称", value: "name", align: "center", sortable: false },
    { text: "创建者", value: "userID", align: "center", sortable: false },
    { text: "操作", value: "actions", align: "center", sortable: false }
  ];

  @Watch("sheetIDList")
  private async onSheetIDListChanged(v: string[]) {
    const rsp = await SheetService.getSheetInfoList(v);
    this.sheetList = rsp.sheet;
  }

  private async mounted() {
    const rsp = await SheetService.getSheetInfoList(this.sheetIDList);
    this.sheetList = rsp.sheet;
  }
}
</script>

<style scoped>
</style>
