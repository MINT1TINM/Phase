<template>
  <div>
    <v-img
      v-if="projectInfo.folderURL"
      class="mx-3"
      height="150"
      :src="`/api/file/download?sName=${item.folderURL}`"
    ></v-img>
    <v-img
      v-else
      class="white--text mx-3"
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    ></v-img>
    <v-list dense>
      <div v-for="(item, i) in list" :key="`l-${i}`">
        <v-subheader class="ml-2 mt-2" v-if="item.subheader">
          {{ item.subheader }}
        </v-subheader>
        <v-list-item v-else>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/types/project';

@Component
export default class ProjectWidgetInfo extends Vue {
  @Prop() projectInfo!: Project;

  type(v: number) {
    if (v == 0) {
      return '竣工结算审计';
    } else if (v == 1) {
      return '全过程投资审计基建工程';
    } else if (v == 2) {
      return '全过程投资审计修缮工程';
    } else {
      return '未知';
    }
  }

  get list() {
    return [
      {
        subheader: '基本信息'
      },
      {
        name: '名称',
        value: this.projectInfo.name
      },
      {
        name: '简介',
        value: this.projectInfo.description
      },
      {
        name: '审计期间',
        value: `${this.projectInfo.startDate} ~ ${this.projectInfo.endDate}`
      },
      {
        name: '实施时间',
        value: `${this.projectInfo.actionDate}`
      },
      {
        subheader: '附加信息'
      },
      {
        name: '类型',
        value: this.type(this.projectInfo.extraInfo.type)
      },
      {
        name: '编号',
        value: this.projectInfo.extraInfo.code
      },
      {
        name: '工程地点',
        value: this.projectInfo.extraInfo.address
      },
      {
        name: '财务处立项编号',
        value: this.projectInfo.extraInfo.financeCode
      },
      {
        name: '投资总额',
        value: this.projectInfo.extraInfo.investment
      },
      {
        name: '施工总承包合同价',
        value: this.projectInfo.extraInfo.price
      },
      {
        name: '所属行业',
        value: this.projectInfo.extraInfo.industry
      }
    ];
  }
}
</script>

<style scoped></style>
