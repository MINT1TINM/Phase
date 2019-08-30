<template>
  <div>
    <v-toolbar dense flat class="navbar" style="z-index:2">
      <v-toolbar-items>
        <v-btn v-if="path.length>1" text @click="goBack">
          <v-icon size="20">mdi-arrow-left</v-icon>&nbsp;返回上一级
        </v-btn>
        <v-divider v-if="path.length>1" vertical></v-divider>
        <v-breadcrumbs :items="pathCrumbs"></v-breadcrumbs>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <!-- can only link file -->
      <v-toolbar-items @click="linkFile" v-if="currentObject.type&&currentObject.type!=`catalog`">
        <v-btn text>
          <v-icon size="20">mdi-link</v-icon>&nbsp;链接
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid style="height:calc(100vh - 96px);padding:0">
      <v-layout fill-height>
        <!-- file grid -->
        <v-flex xs12 style="height:100%" v-on:click="clickBlank">
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex
                sm6
                md2
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
                    @dblclick="openCatalog(item,i)"
                    id="file-grid"
                  >
                    <div style="pointer-events:none">
                      <v-layout justify-center class="pt-2">
                        <doc-icon :item="item"></doc-icon>
                      </v-layout>
                      <v-card-text
                        class="text-center black--text pb-0 pt-1 body-2"
                      >{{item.name | cut}}</v-card-text>
                      <v-card-text
                        class="text-center pt-0 caption grey--text"
                      >{{item.createdAt | format("yyyy-MM-dd")}}</v-card-text>
                    </div>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <!-- file info -->
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import documentInfo from "@/components/project/document/DocumentInfo.vue";
import catalogInfo from "@/components/project/document/CatalogInfo.vue";
import FileService from "@/service/fileService";
import { namespace } from "vuex-class";
import docIcon from "@/components/project/document/DocIcon.vue";

const projectModule = namespace("project");
const fileModule = namespace("file");
const systemModule = namespace("system");

@Component({
  components: {
    "doc-info": documentInfo,
    "doc-icon": docIcon,
    "catalog-info": catalogInfo
  }
})
export default class Explorer extends Vue {
  @projectModule.Getter("currentProjectID") private currentProjectID: any;
  @fileModule.Getter("fileList") private fileList: any;
  @fileModule.Getter("path") private path!: string[];
  @fileModule.Getter("pathPrettier") private pathPrettier!: string[];
  @fileModule.Mutation("updatePath") private updatePath!: any;
  @fileModule.Mutation("updatePathPrettier") private updatePathPrettier!: any;
  @fileModule.Mutation("restorePath") private restorePath!: any;
  @fileModule.Mutation("restorePathPrettier") private restorePathPrettier!: any;

  private currentObject: object = {};
  private currentName: string = "";
  private currentUUID: string = "";
  private fileListShow = {};
  private searchDocumentContent: string = "";
  private file: any = null;

  $refs!: {
    createCatalogForm: HTMLFormElement;
  };

  private async getFileList() {
    const rsp = await FileService.getFile(this.currentProjectID, this.path);
    this.fileListShow = rsp.fileList;
  }

  private showInfo(item: any, uuid: any) {
    this.currentObject = item;
    this.currentName = item.name;
    this.currentUUID = uuid;
  }

  private openCatalog(item: any, i: any) {
    // open catalog
    if (item.data) {
      this.updatePath([...this.path, i, "data"]);
      this.updatePathPrettier([...this.pathPrettier, item.name]);
      this.currentObject = {};
      this.currentName = "";
      this.currentUUID = "";
    }
  }

  private goBack() {
    if (this.path.length > 1) {
      this.updatePath(this.path.slice(0, this.path.length - 2));
      this.updatePathPrettier(
        this.pathPrettier.slice(0, this.pathPrettier.length - 1)
      );
      this.currentObject = {};
      this.currentName = "";
      this.currentUUID = "";
    }
  }

  private clickBlank(v: any) {
    // check if user has clicked in blank area
    if (v.target.id !== "file-grid") {
      console.log("blank");
      this.clearDocumentInfo();
    }
  }

  private clearDocumentInfo() {
    this.currentObject = {};
    this.currentName = "";
    this.currentUUID = "";
    console.log(this.currentObject);
  }

  private linkFile() {
    console.log(this.currentObject);
    (this.currentObject as any).path = this.path;
    this.$emit("linkFile", this.currentObject);
  }

  get pathCrumbs() {
    let pathCrumbs = [];
    for (const item of this.pathPrettier) {
      pathCrumbs.push({
        text: item,
        disabled: false
      });
    }
    return pathCrumbs;
  }

  @Watch("path")
  private async onPathChanged() {
    await this.getFileList();
  }

  @Watch("fileList", {
    deep: true
  })
  private onFileListChanged() {
    this.fileListShow = this.fileList;
  }

  private async mounted() {
    this.getFileList();
  }
}
</script>

<style scoped>
</style>
