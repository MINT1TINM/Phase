<template>
  <v-container fluid>
    <v-layout justify-center>
      <doc-icon class="py-10" :item="item"></doc-icon>
    </v-layout>
    <v-btn v-if="!item.data" block outlined color="green darken-1" @click="downloadFile(item)">
      <v-icon size="20">mdi-download-outline</v-icon>&nbsp;下载
    </v-btn>
    <v-btn
      v-if="projectPermission(authorization.userID).indexOf(`u`)!=-1"
      class="mt-2"
      block
      outlined
      color="primary"
      @click="renameDialog=true;currentName=item.name"
    >
      <v-icon size="20">mdi-pencil-outline</v-icon>&nbsp;重命名
    </v-btn>
    <v-btn
      v-if="projectPermission(authorization.userID).indexOf(`d`)!=-1"
      class="mt-2"
      block
      outlined
      color="error"
      @click="deleteFile()"
    >
      <v-icon size="20">mdi-delete-outline</v-icon>&nbsp;删除
    </v-btn>
    <h4 class="pt-5">文件信息</h4>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">名称</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{item.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">创建时间</v-list-item-subtitle>
        <v-list-item-title class="body-2">{{item.createdAt | format("yyyy-MM-dd hh:mm:ss")}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-subtitle class="caption">创建者</v-list-item-subtitle>
        <v-list-item-title class="body-2" height="40px">
          <user-chip class="my-2" :userID="item.userUUID"></user-chip>
        </v-list-item-title>
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
import { namespace } from "vuex-class";
import FileService from "@/service/fileService";
import { Authorization } from "@/types/user";

const projectModule = namespace("project");
const fileModule = namespace("file");
const userModule = namespace("user");

@Component({
  components: {
    "doc-icon": docIcon
  }
})
export default class DocumentInfo extends Vue {
  @Prop({ default: "" }) public uuid!: string;
  @Prop({ default: {} }) public item!: any;

  @userModule.Getter("authorization") private authorization!: Authorization;
  @projectModule.Getter("currentProjectID") private currentProjectID!: string;
  @fileModule.Getter("path") private path!: string[];
  @projectModule.Getter("projectMemberCache") private projectMemberCache: any;
  @projectModule.Getter("projectPermission")
  private projectPermission: any;

  private currentName: string = "";
  private currentItem = {};
  private renameDialog: boolean = false;

  @Watch("item")
  private onItemChanged() {
    this.currentItem = this.currentItem;
  }

  private async renameFile() {
    if (this.currentName !== this.item.name) {
      const rsp = await FileService.renameCatalog(
        this.currentProjectID,
        [...this.path, this.uuid],
        this.currentName
      );
      if (rsp.msg === "success") {
        await FileService.getFile(this.currentProjectID, this.path);
        this.renameDialog = false;
      }
    }
  }

  private async deleteFile() {
    const res = await this.$confirm("此操作无法恢复", {
      title: "确认删除?",
      buttonTrueColor: "primary"
    });
    if (res) {
      await FileService.deleteFile(
        [...this.path, this.uuid],
        this.currentProjectID
      );
      this.$emit("clearDocumentInfo");
      await FileService.getFile(this.currentProjectID, this.path);
    }
  }

  private async downloadFile(item: any) {
    window.open("/api/file/download?sName=" + item.sName, "_blank");
    // await FileService.downloadFile(item.sName);
  }

  private mounted() {}
}
</script>

