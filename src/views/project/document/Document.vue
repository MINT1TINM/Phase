<template>
  <div>
    <v-toolbar flat class="navbar" dense style="z-index:2">
      <v-breadcrumbs :items="pathCrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="props">
          <v-breadcrumbs-item
            :href="props.item.href"
            :class="[props.item.disabled && 'disabled']"
          >{{ props.item.text}}</v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>
          <v-icon size="20">mdi-cloud-upload-outline</v-icon>&nbsp;上传
        </v-btn>
        <v-btn text @click="createCatalog">
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
                    <v-card-text class="text-center black--text pb-0 pt-1 subtitle-2">{{i}}</v-card-text>
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
        <v-flex v-if="currentObject&&currentName" xs3 class="inner-sidebar-withoutpadding">
          <doc-info :item="currentObject" :name="currentName"></doc-info>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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
  private fileListShow = {};

  private searchDocumentContent: string = "";

  private async getFileList() {
    await ProjectService.getProjectFile(this.currentProjectID);
  }

  private showInfo(item: any, name: any) {
    this.currentObject = item;
    this.currentName = name;
  }

  private openCatalog(i: any) {
    console.log(i);
    this.updatePath([...this.path, i]);
    console.log(this.path);
  }

  private async createCatalog() {
    await ProjectService.createCatalog(this.currentProjectID, ["data"]);
    this.getFileList();
  }

  get pathCrumbs() {
    let pathCrumbs = [];
    for (const item of this.path) {
      pathCrumbs.push({
        text: item,
        disabled: false
      });
    }
    return pathCrumbs;
  }

  private async mounted() {
    this.getFileList();
    this.fileListShow = this.fileList;
    this.updatePath(["data"]);
    await ProjectService.getFile(this.currentProjectID, this.path);
  }
}
</script>

<style scoped>
</style>
