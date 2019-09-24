<template>
  <div style="height:100%">
    <v-toolbar dense class="navbar" style="z-index:2">
      <v-toolbar-items>
        <v-btn v-if="path.length>1" text @click="goBack">
          <v-icon size="20">mdi-arrow-left</v-icon>&nbsp;返回上一级
        </v-btn>
        <v-divider v-if="path.length>1" vertical></v-divider>
        <v-breadcrumbs :items="pathCrumbs"></v-breadcrumbs>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          @click="linkFile"
          v-if="window&&currentObject.type&&currentObject.type!=`catalog`"
        >
          <v-icon size="20">mdi-link</v-icon>&nbsp;链接
        </v-btn>
        <v-btn text @click="uploadDialog=true">
          <v-icon size="20">mdi-cloud-upload-outline</v-icon>&nbsp;上传
        </v-btn>
        <v-btn text @click="createCatalogDialog=true;currentName=``">
          <v-icon size="20">mdi-folder-outline</v-icon>&nbsp;新建文件夹
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <transition appear appear-active-class="fade-up-enter">
      <v-container fluid pa-0 style="height:calc(100vh - 98px)">
        <v-layout fill-height>
          <!-- file grid -->
          <v-flex xs9 style="height:100%" v-on:click="clickBlank">
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
          <v-flex xs3 class="inner-sidebar-withoutpadding" style="height:100%">
            <doc-info
              @clearDocumentInfo="clearDocumentInfo"
              v-if="currentObject&&currentUUID"
              :item="currentObject"
              :uuid="currentUUID"
            ></doc-info>
            <catalog-info v-else :item="fileListShow" :uuid="currentUUID"></catalog-info>
          </v-flex>
        </v-layout>
      </v-container>
    </transition>
    <v-dialog persistent v-model="createCatalogDialog" width="300">
      <v-card>
        <v-toolbar flat class="transparent">
          <v-toolbar-title class="font-weight-black subtitle-1">新建文件夹</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="createCatalogDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-form ref="createCatalogForm">
            <v-text-field
              hide-details
              single-line
              outlined
              class="text-field-semidense"
              label="输入希望创建的文件夹名称"
              :rules="[v => !!v || '']"
              v-model="currentName"
            ></v-text-field>
          </v-form>
          <v-layout class="pt-5" justify-center>
            <v-btn rounded color="primary" depressed @click="createCatalog">创建</v-btn>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="uploadDialog" width="300">
      <v-card>
        <v-toolbar flat class="transparent">
          <v-toolbar-title class="font-weight-black subtitle-1">上传文件</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="uploadDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-file-input
            class="text-field-semidense"
            single-line
            hide-details
            outlined
            label="选择文件"
            v-model="file"
          ></v-file-input>
          <v-progress-linear
            height="20"
            class="mt-5"
            color="primary"
            rounded
            v-if="uploadPercent"
            indeterminate
          >
            <template v-slot="{ value }">
              <small class="white--text font-weight-black">{{ Math.ceil(value) }}%</small>
            </template>
          </v-progress-linear>
          <v-layout class="pt-5" justify-center>
            <v-btn rounded color="primary" depressed @click="uploadFile">上传</v-btn>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
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
export default class Document extends Vue {
  public $refs!: {
    createCatalogForm: HTMLFormElement;
  };

  @Prop(Boolean) private window!: boolean;

  @projectModule.Getter("currentProjectID") private currentProjectID: any;
  @fileModule.Getter("fileList") private fileList: any;
  @fileModule.Getter("path") private path!: string[];
  @fileModule.Getter("pathPrettier") private pathPrettier!: string[];
  @fileModule.Mutation("updatePath") private updatePath!: any;
  @fileModule.Mutation("updatePathPrettier") private updatePathPrettier!: any;
  @fileModule.Mutation("restorePath") private restorePath!: any;
  @fileModule.Mutation("restorePathPrettier") private restorePathPrettier!: any;
  @systemModule.Getter("uploadPercent") private uploadPercent!: number;
  @systemModule.Mutation("updateUploadPercent")
  private updateUploadPercent: any;

  private currentObject = {};
  private currentName: string = "";
  private currentUUID: string = "";
  private fileListShow = {};
  private createCatalogDialog: boolean = false;
  private uploadDialog: boolean = false;
  private searchDocumentContent: string = "";
  private file: any = null;

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

  private async createCatalog() {
    if (this.$refs.createCatalogForm.validate()) {
      await FileService.createCatalog(
        this.currentProjectID,
        this.path,
        this.currentName
      );
      this.getFileList();
      this.createCatalogDialog = false;
    }
  }

  private async uploadFile() {
    await FileService.uploadFile(this.file, this.path, this.currentProjectID);
    this.uploadDialog = false;
    this.file = null;
    this.getFileList();
  }

  private linkFile() {
    console.log(this.currentObject);
    (this.currentObject as any).path = this.path;
    this.$emit("linkFile", this.currentObject);
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
  }

  get pathCrumbs() {
    const pathCrumbs = [];
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
    this.updateUploadPercent(0);
    // this.restorePath();
    // this.restorePathPrettier();
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: block;
}
</style>
