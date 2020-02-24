<template>
  <div>
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="body-2 font-weight-black"
        >送审信息</v-toolbar-title
      >
    </v-toolbar>

    <v-list dense>
      <div v-for="(item, i) in finishInfoContent" :key="`l-${i}`">
        <v-subheader class="ml-2 mt-2" v-if="item.subheader">
          {{ item.subheader }}
        </v-subheader>
        <v-list-item v-else>
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <v-list-item-subtitle>{{
            extraInfo.finishInfo[item.name]
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
export default class FinishInfo extends Vue {
  @Prop() extraInfo!: ProjectExtraInfo;

  get finishInfoContent() {
    return [
      {
        type: 'date-picker',
        title: '开工日期',
        name: 'startDate'
      },
      {
        type: 'date-picker',
        title: '竣工日期',
        name: 'startDate'
      },
      {
        type: 'text-field',
        title: '送审金额',
        name: 'auditPrice'
      },
      {
        type: 'date-picker',
        title: '送审日期',
        name: 'auditDate'
      },
      {
        type: 'file-input',
        title: '结算书',
        name: 'calFile',

        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.finishInfo.cadFile);
        }
      },
      {
        type: 'file-input',
        title: '合同书',
        name: 'contractFile',

        downFunc: () => {
          FileService.downloadFileFromFs(
            this.extraInfo.finishInfo.contractFile
          );
        }
      },
      {
        type: 'file-input',
        title: '开竣工',
        name: 'projectFile',

        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.finishInfo.projectFile);
        }
      },
      {
        type: 'file-input',
        title: '竣工蓝图',
        name: 'cadFile',

        downFunc: () => {
          FileService.downloadFileFromFs(this.extraInfo.finishInfo.cadFile);
        }
      },
      {
        type: 'file-input',
        title: '施工图预算',
        name: 'cadPriceFile',

        downloadFunc: () => {
          FileService.downloadFileFromFs(
            this.extraInfo.finishInfo.cadPriceFile
          );
        }
      }
    ];
  }
}
</script>

<style scoped></style>
