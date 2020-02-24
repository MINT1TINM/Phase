<template>
  <div>
    <v-toolbar dense flat class="transparent">
      <v-toolbar-title class="body-2 font-weight-black">
        单位信息
      </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card outlined>
            <v-card-title class="body-2 font-weight-black">
              工程主管部门
            </v-card-title>

            <v-list dense>
              <div v-for="(item, i) in companyInfoContent" :key="`l-${i}`">
                <v-subheader class="ml-2 mt-2" v-if="item.subheader">
                  {{ item.subheader }}
                </v-subheader>
                <v-list-item v-else>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>

                  <v-list-item-subtitle>{{
                    extraInfo.company.projectDepartment[item.name]
                  }}</v-list-item-subtitle>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card outlined>
            <v-card-title class="body-2 font-weight-black">
              施工总承包单位
            </v-card-title>

            <v-list dense>
              <div v-for="(item, i) in companyInfoContent" :key="`l-${i}`">
                <v-subheader class="ml-2 mt-2" v-if="item.subheader">
                  {{ item.subheader }}
                </v-subheader>
                <v-list-item v-else>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>

                  <v-list-item-subtitle>{{
                    extraInfo.company.contractCompany[item.name]
                  }}</v-list-item-subtitle>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card outlined>
            <v-card-title class="body-2 font-weight-black">
              工程监理单位
            </v-card-title>
            <v-list dense>
              <div v-for="(item, i) in companyInfoContent" :key="`l-${i}`">
                <v-subheader class="ml-2 mt-2" v-if="item.subheader">
                  {{ item.subheader }}
                </v-subheader>
                <v-list-item v-else>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>

                  <v-list-item-subtitle>{{
                    extraInfo.company.projectCompany[item.name]
                  }}</v-list-item-subtitle>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card outlined>
            <v-card-title class="body-2 font-weight-black">
              代建单位
            </v-card-title>

            <v-list dense>
              <div v-for="(item, i) in companyInfoContent" :key="`l-${i}`">
                <v-subheader class="ml-2 mt-2" v-if="item.subheader">
                  {{ item.subheader }}
                </v-subheader>
                <v-list-item v-else>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>

                  <v-list-item-subtitle>{{
                    extraInfo.company.constructCompany[item.name]
                  }}</v-list-item-subtitle>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProjectExtraInfo } from '@/types/project';

@Component
export default class ProjectCompany extends Vue {
  @Prop() extraInfo!: ProjectExtraInfo;

  get companyInfoContent() {
    return [
      {
        type: 'text-field',
        title: '企业名称',
        name: 'name'
      },
      {
        type: 'text-field',
        title: '联系人',
        name: 'contactName'
      },
      {
        type: 'text-field',
        title: '联系人电话',
        name: 'phone'
      }
    ];
  }
}
</script>

<style scoped></style>
