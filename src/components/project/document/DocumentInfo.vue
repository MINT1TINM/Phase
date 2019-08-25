<template>
  <v-container fluid>
    <v-layout justify-center>
      <doc-icon class="py-10" :item="item"></doc-icon>
    </v-layout>
    <v-btn block outlined color="primary" @click="renameDialog=true">
      <v-icon size="20">mdi-pencil-outline</v-icon>&nbsp;重命名
    </v-btn>
    <h4 class="pt-5">文件信息</h4>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">名称</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">创建时间</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{item.createdAt | format("yyyy-MM-dd h:m")}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">创建者</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{item.userUUID}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">修改记录</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-dialog persistent v-model="renameDialog" width="300">
      <v-card>
        <v-toolbar flat class="transparent">
          <v-toolbar-title class="font-weight-black subtitle-1">重命名</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="renameDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-text-field
            hide-details
            single-line
            outlined
            class="text-field-semidense"
            label="输入新名称"
            v-model="currentName"
          ></v-text-field>
          <v-layout class="pt-5" justify-center>
            <v-btn rounded color="primary" depressed @click="renameFile">保存</v-btn>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import docIcon from "@/components/project/document/DocIcon.vue";
import ProjectService from "@/service/projectService";
import { namespace } from "vuex-class";

const projectModule = namespace("project");

@Component({
  components: {
    "doc-icon": docIcon
  }
})
export default class DocumentInfo extends Vue {
  @projectModule.Getter("currentProjectID") currentProjectID!: string;

  @Prop({ default: "" }) public name!: string;
  @Prop({ default: {} }) public item!: {};

  private currentName: string = "";
  private currentItem = {};
  private renameDialog: boolean = false;

  @Watch("name")
  private onNameChanged() {
    this.currentName = this.name;
  }

  @Watch("item")
  private onItemChanged() {
    this.currentItem = this.currentItem;
  }

  private async renameFile() {
    const rsp = await ProjectService.renameCatalog(
      this.currentProjectID,
      ["data", this.name],
      this.currentName
    );
    if (rsp.msg === "success") {
      await ProjectService.getProjectFile(this.currentProjectID);
      this.renameDialog = false;
    }
  }
}
</script>

