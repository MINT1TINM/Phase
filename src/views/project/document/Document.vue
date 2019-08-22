<template>
  <div>
    <v-toolbar flat class="navbar" dense style="z-index:2">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        hide-details
        outlined
        single-line
        class="text-field-dense"
        label="搜索文件"
        v-model="searchDocumentContent"
      ></v-text-field>
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
              <v-flex xs15 v-for="(item,i) in fileList" :key="`file-${i}`" style="user-select:none">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="mx-auto"
                    flat
                    :color="hover?`grey lighten-3`:`transparent`"
                    @click="showInfo(item,i)"
                    @dblclick="showChildren(item)"
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

@Component({
  components: {
    "doc-info": documentInfo,
    "doc-icon": docIcon
  }
})
export default class Document extends Vue {
  @projectModule.Getter("currentProjectID") private currentProjectID: any;

  private fileList = [];
  private currentObject = {};
  private currentName: string = "";

  private searchDocumentContent: string = "";

  private async getFileList() {
    const rsp = await ProjectService.getProjectFile(this.currentProjectID);
    this.fileList = rsp.projectFile.fs.data;
  }

  private showInfo(item: any, name: any) {
    this.currentObject = item;
    this.currentName = name;
  }

  private showChildren(item: any) {
    console.log("dbclick");
  }

  private async createCatalog() {
    await ProjectService.createCatalog(this.currentProjectID, ["data"]);
    this.getFileList();
  }

  private mounted() {
    this.getFileList();
  }
}
</script>

<style scoped>
</style>
