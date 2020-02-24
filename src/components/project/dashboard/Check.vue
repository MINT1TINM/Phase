<template>
  <div>
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="body-2 font-weight-black"
        >审价结果</v-toolbar-title
      >
    </v-toolbar>

    <v-list dense>
      <div v-for="(item, i) in checkContent" :key="`l-${i}`">
        <v-subheader class="ml-2 mt-2" v-if="item.subheader">
          {{ item.subheader }}
        </v-subheader>
        <v-list-item v-else>
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <v-list-item-subtitle>{{
            extraInfo.check[item.name]
          }}</v-list-item-subtitle>

          <v-list-item-action v-if="item.type === 'file-input'">
            <v-btn icon @click="item.downFunc()"
              ><v-icon size="20">mdi-download-outline</v-icon></v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProjectExtraInfo } from '@/types/project';
import FileService from '@/service/fileService';

@Component
export default class ProjectCheck extends Vue {
  @Prop() extraInfo!: ProjectExtraInfo;

  get checkContent() {
    return [
      {
        type: 'text-field',
        title: '审价金额',
        name: 'price'
      },
      {
        type: 'date-picker',
        title: '审价日期',
        name: 'date'
      },
      {
        type: 'text-field',
        title: '投资审计审价编号',
        name: 'code'
      },
      {
        type: 'text-field',
        title: '乙方审计费',
        name: 'auditPrice'
      },
      {
        type: 'file-input',
        title: '审计报告扫描版',
        name: 'report',

        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.check.report);
        }
      },
      {
        type: 'file-input',
        title: '审计结算软件版',
        name: 'cal',

        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.check.cal);
        }
      },
      {
        type: 'file-input',
        title: '审计费发票',
        name: 'invoice',

        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.check.invoice);
        }
      }
    ];
  }
}
</script>

<style scoped></style>
