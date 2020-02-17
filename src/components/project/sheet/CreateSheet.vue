<template>
  <v-container fluid>
    <v-toolbar flat class="transparent">
      <v-layout justify-center>
        <h3>请选择模版</h3>
      </v-layout>
    </v-toolbar>
    <v-layout row wrap justify-center>
      <v-flex xs8>
        <v-text-field
          v-model="searchTemplateContent"
          single-line
          outlined
          dense
          class="mt-3"
          label="搜索模版"
        ></v-text-field>
        <v-simple-table
          v-if="templateList.length >= 1"
          height="400"
          style="overflow-y:auto"
        >
          <thead>
            <tr>
              <th class="text-center">名称</th>
              <th class="text-center">创建时间</th>
              <th class="text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in templateList"
              :key="`template-${i}`"
              :style="item.alreadyMember ? `color:grey` : ''"
            >
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">
                {{ item.createdAt | format('yyyy-MM-dd') }}
              </td>
              <td class="text-center">
                <v-btn
                  @click="createSheet(item.id, item.type)"
                  icon
                  rounded
                  color="primary"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Template } from '@/types/sheet';
import SheetService from '@/service/sheetService';
import TaskService from '@/service/taskService';

const projectModule = namespace('project');

@Component
export default class CreateSheet extends Vue {
  @Prop({ default: '' }) taskID?: string;

  // check draft or sheet
  @Prop({ default: '' }) target?: string;

  @projectModule.Getter('currentProjectID') currentProjectID: any;

  searchTemplateContent: string = '';

  templateList: Template[] = [];

  searching: boolean = false;

  async searchTemplate() {
    // search user via api
    this.searching = true;
    const rsp = await SheetService.getSheetTemplateList(
      this.searchTemplateContent,
      ''
    );
    this.templateList = rsp.template;
    this.searching = false;
  }

  async createSheet(templateID: string, type: string) {
    console.log(this.target);
    const rsp = await SheetService.createSheet(
      this.currentProjectID,
      templateID,
      type,
      this.taskID || '',
      this.target || ''
    );
    await SheetService.getSheetList(this.currentProjectID);
    this.$emit('closeDialog');
    if ((this.taskID || '').length > 5) {
      await TaskService.getTaskInfo(this.taskID!);
    }
  }

  @Watch('searchTemplateContent')
  onSearchUserContentChanged() {
    if (this.searching) {
      return;
    }
    if (this.searchTemplateContent.length < 1) {
      return;
    }
    this.searchTemplate();
  }
}
</script>

<style scoped></style>
