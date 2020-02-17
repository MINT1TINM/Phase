<template>
  <v-card>
    <v-toolbar class="mb-2">
      <v-text-field
        dense
        flat
        single-line
        hide-details
        autofocus
        v-model="searchDocumentContent"
        prepend-inner-icon="mdi-magnify"
        label="搜索项目内容"
        solo
      ></v-text-field>
    </v-toolbar>
    <v-layout style="height:500px;overflow:auto">
      <v-flex xs5>
        <small v-if="result.length >= 0" class="caption ml-4">文件</small>
        <v-list nav dense>
          <v-list-item-group v-model="currentFileIndex" color="primary">
            <v-list-item v-for="(item, i) in result" :key="`file-${i}`">
              <v-list-item-title>{{ item.file.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-flex>
      <v-divider vertical inset></v-divider>
      <v-flex xs7>
        <v-container fluid v-if="result[currentFileIndex]">
          <v-layout justify-center>
            <doc-icon
              class="py-10"
              :item="result[currentFileIndex].file"
            ></doc-icon>
          </v-layout>
          <v-layout justify-center>
            <div class="subtitle-1">
              {{ result[currentFileIndex].file.name }}
            </div>
          </v-layout>
          <v-list dense class="justify-center pt-10">
            <v-list-item>
              <v-list-item-subtitle class="caption"
                >创建时间</v-list-item-subtitle
              >
              <v-list-item-title class="body-2">{{
                result[currentFileIndex].file.createdAt
                  | format('yyyy-MM-dd hh:mm:ss')
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle class="caption"
                >创建者</v-list-item-subtitle
              >
              <v-list-item-title class="body-2">{{
                projectMemberCache(result[currentFileIndex].file.userID)
                  .nickName
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle class="caption">路径</v-list-item-subtitle>
              <v-list-item-title class="body-2">
                <div v-for="(item, i) in pathPrettier" :key="`p-${i}`">
                  {{ item }}/
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-layout justify-center class="mt-10">
            <v-btn small rounded outlined @click="toFile">
              前往文件
              <v-icon size="15">mdi-arrow-right</v-icon>
            </v-btn>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { searchNode } from '@/utils/SearchNode';
import FileService from '@/service/fileService';

const projectModule = namespace('project');
const fileModule = namespace('file');

@Component
export default class CommonSearch extends Vue {
  @projectModule.Getter('currentProjectID') currentProjectID: any;

  @fileModule.Getter('fileList') fileList: any;

  @projectModule.Getter('projectMemberCache') projectMemberCache: any;

  @fileModule.Mutation('updatePath') updatePath!: any;

  @fileModule.Mutation('updatePathPrettier') updatePathPrettier!: any;

  searchDocumentContent: string = '';

  fileListShow = {};

  result: any[] = [];

  currentFileIndex = 0;

  async getFileList() {
    const rsp = await FileService.getFile(this.currentProjectID, ['data']);
    this.fileListShow = rsp.fileList;
  }

  searchDocument() {
    if (this.searchDocumentContent !== '') {
      this.result = searchNode(
        this.fileListShow,
        this.searchDocumentContent.toLowerCase()
      );
    }
    console.log(this.result);
  }

  toFile() {
    this.$emit('closeDialog');
    this.updatePath(['data', ...this.result[this.currentFileIndex].path]);
    this.updatePathPrettier([...this.pathPrettier]);
    this.$router.push({ path: '/document' });
  }

  get pathPrettier() {
    if (this.fileList[this.currentFileIndex]) {
      return [
        '根目录',
        ...this.fileList[this.currentFileIndex].path.filter(
          (e: string) => e !== 'data'
        )
      ];
    }
    return ['根目录'];
  }

  @Watch('currentProjectID')
  onProjectIDChanged() {
    this.getFileList();
  }

  @Watch('searchDocumentContent')
  onSearchContentChanged() {
    this.searchDocument();
  }

  mounted() {
    this.getFileList();
  }
}
</script>

<style scoped></style>
