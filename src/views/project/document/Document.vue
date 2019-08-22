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
        <v-btn text>
          <v-icon size="20">mdi-folder-outline</v-icon>&nbsp;新建文件夹
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid style="height:calc(100vh - 96px);padding:0">
      <v-layout fill-height>
        <!-- file grid -->
        <v-flex xs9>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs15 v-for="(item,i) in fileList" :key="`file-${i}`" style="user-select:none">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="mx-auto"
                    flat
                    :color="hover?`grey lighten-3`:`transparent`"
                    @click="showInfo(item)"
                  >
                    <v-layout justify-center class="pt-2">
                      <v-icon size="90" color="blue lighten-1" v-if="item.type==`doc`">mdi-file-word</v-icon>
                      <v-icon
                        size="90"
                        color="red lighten-1"
                        v-else-if="item.type==`ppt`"
                      >mdi-file-powerpoint</v-icon>
                      <v-icon
                        size="90"
                        color="green lighten-1"
                        v-else-if="item.type==`xls`"
                      >mdi-file-excel</v-icon>
                      <v-icon
                        size="90"
                        color="red darken-2"
                        v-else-if="item.type==`pdf`"
                      >mdi-file-pdf</v-icon>
                      <v-icon size="90" color="grey lighten-1" v-else>mdi-file</v-icon>
                    </v-layout>
                    <v-card-text class="text-center black--text pb-0 pt-1 subtitle-1">{{item.name}}</v-card-text>
                    <v-card-text class="text-center pt-0 caption">{{item.createdAt}}</v-card-text>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <!-- file info -->
        <v-flex xs3 class="inner-sidebar-withoutpadding">
          <doc-info :docID="docID"></doc-info>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import documentInfo from "@/components/project/document/DocumentInfo.vue";

@Component({
  components: {
    "doc-info": documentInfo
  }
})
export default class Document extends Vue {
  private fileList = [];
  private docID: string = "";
  private searchDocumentContent: string = "";

  private async getFileList() {}

  private showInfo(item: any) {
    this.docID = item.id;
  }

  private mounted() {
    this.getFileList();
  }
}
</script>

<style scoped>
</style>
