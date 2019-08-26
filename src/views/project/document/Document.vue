<template>
  <div>
    <v-toolbar dense flat class="navbar" style="z-index:2">
      <v-toolbar-items>
        <v-btn v-if="path.length>1" text @click="goBack">
          <v-icon size="20">mdi-arrow-left</v-icon>&nbsp;返回上一级
        </v-btn>
      </v-toolbar-items>
      <v-text-field
        class="text-field-dense"
        disabled
        hide-details
        single-line
        rounded
        filled
        label="路径"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>
          <v-icon size="20">mdi-cloud-upload-outline</v-icon>&nbsp;上传
        </v-btn>
        <v-btn text @click="createCatalogDialog=true">
          <v-icon size="20">mdi-folder-outline</v-icon>&nbsp;新建文件夹
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid style="height:calc(100vh - 96px);padding:0">
      <v-layout fill-height>
        <!-- file grid -->
        <v-flex :class="currentObject&&currentName?`xs9`:`xs12`">
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex
                xs15
                v-for="(item,i) in fileListShow"
                :key="`file-${i}`"
                style="user-select:none"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="mx-auto"
                    flat
                    :color="hover?`grey lighten-3`:`transparent`"
                    @click="showInfo(item,i)"
                    @dblclick="openCatalog(i)"
                  >
                    <v-layout justify-center class="pt-2">
                      <doc-icon :item="item"></doc-icon>
                    </v-layout>
                    <v-card-text class="text-center black--text pb-0 pt-1 subtitle-2">{{item.name}}</v-card-text>
                    <v-card-text
                      class="text-center pt-0 caption"
                    >{{item.createdAt | format("yyyy-MM-dd")}}</v-card-text>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <!-- file info -->
        <v-flex v-if="currentObject&&currentUUID" xs3 class="inner-sidebar-withoutpadding">
          <doc-info :item="currentObject" :uuid="currentUUID"></doc-info>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog persistent v-model="createCatalogDialog" width="300">
      <v-card>
        <v-toolbar flat class="transparent">
          <v-toolbar-title class="font-weight-black subtitle-1">重命名</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="createCatalogDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-text-field
            hide-details
            single-line
            outlined
            class="text-field-semidense"
            label="输入希望创建的文件夹名称"
            v-model="currentName"
          ></v-text-field>
          <v-layout class="pt-5" justify-center>
            <v-btn rounded color="primary" depressed @click="createCatalog">保存</v-btn>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import documentInfo from "@/components/project/document/DocumentInfo.vue";
import ProjectService from "@/service/projectService";
import { namespace } from "vuex-class";
import docIcon from "@/components/project/document/DocIcon.vue";

const projectModule = namespace("project");
const fileModule = namespace("file");

@Component({
  components: {
    "doc-info": documentInfo,
    "doc-icon": docIcon
  }
})
export default class Document extends Vue {
  @projectModule.Getter("currentProjectID") private currentProjectID: any;
  @fileModule.Getter("fileList") private fileList: any;
  @fileModule.Getter("path") private path!: string[];
  @fileModule.Mutation("updatePath") private updatePath!: any;

  private currentObject = {};
  private currentName: string = "";
  private currentUUID: string = "";
  private fileListShow = {};
  private createCatalogDialog: boolean = false;

  private searchDocumentContent: string = "";

  private async getFileList() {
    const rsp = await ProjectService.getFile(this.currentProjectID, this.path);
    this.fileListShow = rsp.fileList;
  }

  private showInfo(item: any, uuid: any) {
    this.currentObject = item;
    this.currentName = item.name;
    this.currentUUID = uuid;
  }

  private openCatalog(i: any) {
    console.log(i);
    this.updatePath([...this.path, i, "data"]);
    console.log(this.path);
  }

  private async createCatalog() {
    await ProjectService.createCatalog(
      this.currentProjectID,
      this.path,
      this.currentName
    );
    this.getFileList();
  }

  private goBack() {
    if (this.path.length > 1) {
      this.updatePath(this.path.slice(0, this.path.length - 2));
    }
  }

  get pathCrumbs() {
    let pathCrumbs = [];
    for (const item of this.path) {
      if (item !== "data") {
        pathCrumbs.push({
          text: item,
          disabled: false
        });
      }
    }
    return pathCrumbs;
  }

  @Watch("path")
  private async onPathChanged() {
    this.getFileList();
  }

  @Watch("fileList", {
    deep: true
  })
  private onFileListChanged() {
    this.fileListShow = this.fileList;
  }

  private async mounted() {
    this.updatePath(["data"]);
  }
}
</script>

<style scoped>
</style>
