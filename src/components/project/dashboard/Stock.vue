<template>
  <div>
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="body-2 font-weight-black"
        >采购信息</v-toolbar-title
      >
    </v-toolbar>

    <v-list dense>
      <div v-for="(item, i) in stockContent" :key="`l-${i}`">
        <v-subheader class="ml-2 mt-2" v-if="item.subheader">
          {{ item.subheader }}
        </v-subheader>
        <v-list-item v-else>
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <v-list-item-subtitle v-if="item.chip">
            <v-chip-group>
              <v-chip small v-for="c in item.value" :key="c">{{ c }}</v-chip>
            </v-chip-group>
          </v-list-item-subtitle>

          <v-list-item-subtitle v-if="item.type == 'select'">
            {{ item.list[extraInfo.stock[item.name]] }}
          </v-list-item-subtitle>

          <v-list-item-subtitle v-else>{{
            extraInfo.stock[item.name]
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
import { Project, ProjectExtraInfo } from '@/types/project';
import FileService from '@/service/fileService';

@Component
export default class ProjectStock extends Vue {
  @Prop() extraInfo!: ProjectExtraInfo;

  get stockContent() {
    const start = [
      {
        type: 'select',
        title: '采购方式',
        name: 'type',
        text: 'text',
        value: 'value',
        list: ['非招标', '二级单位备案', '公开招投标']
      }
    ];
    let c: any[] = [];

    switch (this.extraInfo.stock.type) {
      case 0:
        c = start;
        return c;
        break;
      case 1:
        c = [
          ...start,
          ...[
            {
              type: 'text-field',
              title: '备案编号',
              name: 'achieveCode'
            },
            {
              type: 'file-input',
              title: '备案表附件',
              name: 'achieveFile',
              downFunc: () => {
                console.log('download');
                FileService.downloadFileFromFs(
                  this.extraInfo.stock.achieveFile
                );
              }
            }
          ]
        ];
        return c;
        break;
      case 2:
        c = [
          ...start,
          ...[
            {
              type: 'text-field',
              title: '采购编号',
              name: 'code'
            },
            {
              type: 'text-field',
              title: '招标采购名称',
              name: 'name'
            },
            {
              type: 'text-field',
              title: '招标采购单位',
              name: 'agentCompany'
            },
            {
              type: 'date-picker',
              title: '采购日期',
              name: 'date'
            },
            { type: 'text-field', title: '招标控制价', name: 'controlPrice' },
            {
              type: 'text-field',
              title: '中标金额',
              name: 'price'
            },
            {
              type: 'file-input',
              title: '招标蓝图',
              name: 'sketchFile',
              downFunc: () => {
                FileService.downloadFileFromFs(this.extraInfo.stock.sketchFile);
              }
            },
            {
              type: 'file-input',
              title: '招标文件',
              name: 'file',

              downFunc: () => {
                FileService.downloadFileFromFs(this.extraInfo.stock.file);
              }
            },
            {
              type: 'file-input',
              title: '中标通知书',
              name: 'bidNotification',

              downFunc: () => {
                FileService.downloadFileFromFs(
                  this.extraInfo.stock.bidNotification
                );
              }
            },
            {
              type: 'file-input',
              title: '中标商务标软件版',
              name: 'bidFinance',

              downFunc: () => {
                FileService.downloadFileFromFs(this.extraInfo.stock.bidFinance);
              }
            }
          ]
        ];
        return c;

      default:
        break;
    }
  }

  mounted() {
    console.log(this.extraInfo.stock);
  }
}
</script>

<style scoped></style>
