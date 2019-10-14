<template>
  <div>
    <v-card outlined width="100%">
      <v-card-title class="font-weight-black subtitle-1">
        相关文件
        <v-spacer></v-spacer>
        <v-btn class="mt-3" rounded text @click="fileDialog=true">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;链接文件
        </v-btn>
      </v-card-title>
      <v-container fluid>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-center">名称</th>
              <th class="text-center">创建时间</th>
              <th class="text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr class="my-2" v-for="(item,i) in fileList" :key="`f-${i}`">
              <td class="pl-3 pr-2 text-center">{{item.name}}</td>
              <td class="pl-3 pr-2 text-center">{{item.createdAt | format("yyyy-MM-dd hh:mm")}}</td>
              <td class="pl-3 pr-2 text-center">
                <v-btn icon @click="downloadFile(item)">
                  <v-icon size="20">mdi-download-outline</v-icon>
                </v-btn>
                <v-btn icon @click="removeFile(item)" color="error">
                  <v-icon size="20">mdi-close</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
    </v-card>

    <v-bottom-sheet v-model="fileDialog" persistent>
      <v-sheet class="text-center" height="750" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black">项目文件</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="fileDialog=false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <document :window="true" @linkFile="linkFile"></document>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import document from "@/views/project/document/Document.vue";

@Component({
  components: {
    document
  }
})
export default class RelatedFile extends Vue {
  @Prop() private fileList: any;

  private fileDialog: boolean = false;
  private fileListShow: any[] = [];

  private linkFile(v: any) {
    if (!this.fileListShow) {
      (this.fileListShow as any) = [];
    }
    (this.fileListShow as any).push(v);
    // remove duplicated
    (this.fileListShow as any) = Array.from(new Set(this.fileListShow));
    console.log(this.fileListShow);
    this.fileDialog = false;
  }

  private async downloadFile(item: any) {
    window.open("/api/file/download?sName=" + item.sName, "_blank");
    // await FileService.downloadFile(item.sName);
  }

  // private showFile(item: any) {}

  private removeFile(item: any) {
    const index = (this.fileListShow as any).indexOf(item);
    (this.fileListShow as any).splice(index, 1);
  }

  @Watch("fileList")
  private onFileChanged() {
    this.fileListShow = this.fileList;
  }
}
</script>

<style scoped>
</style>
