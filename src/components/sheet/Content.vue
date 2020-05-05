<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-text-field
        single-line
        hide-details
        label="标题"
        v-model="sheetInfo.name"
        class="subtitle-1 font-weight-black"
      ></v-text-field>
      <v-spacer></v-spacer>
      <span class="caption">
        {{ sheetInfo.createdAt | format('yyyy-MM-dd hh:mm') }}</span
      >
    </v-toolbar>

    <!-- key -->
    <v-container class="pt-0" fluid v-if="templateInfo.type === `key`">
      <dim-form
        :formContent="formContent"
        :target="sheetInfo.content"
      ></dim-form>
    </v-container>

    <!-- list -->
    <v-container fluid v-else-if="templateInfo.type === `list`">
      <v-simple-table>
        <thead>
          <tr>
            <th v-for="(item, i) in formContent" :key="`field-title-${i}`">
              {{ item.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in sheetInfo.content" :key="`c-${i}`">
            <td v-for="(field, i) in formContent" :key="`field-${i}`">
              <v-text-field
                outlined
                single-line
                hide-details
                v-model="item[field.name]"
                dense
              ></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { namespace } from 'vuex-class';
import SheetService from '@/service/sheetService';
import { Sheet, Field, Template } from '@/types/sheet';
import FileService from '@/service/fileService';

const projectModule = namespace('project');

@Component({
  components: {}
})
export default class FillSheet extends Vue {
  @Prop({ default: {} }) sheetID!: string;
  @Prop() sheetTemplateID!: string;

  target = {};
  templateInfo: Template = new Template();
  sheetInfo: Sheet = new Sheet();
  formContent: Field[] = [];

  @Watch('sheetID')
  async onSheetIDChanged() {
    this.sheetInfo = await SheetService.getSheetInfo(this.sheetID);
    this.templateInfo = (
      await SheetService.getSheetTemplate(this.sheetTemplateID)
    ).template;

    this.templateInfo.field.data.forEach(e => {
      if (e.type == 'multi-select') {
        if (this.sheetInfo.content[e.name] === undefined) {
          this.sheetInfo.content[e.name] = {
            data: []
          };
        }
      }
    });

    this.formContent = this.templateInfo.field.data.map(e => {
      if (e.type == 'file-input') {
        e.changeFunc = async (v: any) => {
          if (v) {
            const rsp = await FileService.uploadFile(v, '', '');
            this.sheetInfo.content[e.name] = rsp.path;
          }
        };
        e.downFunc = () => {
          FileService.downloadFileFromFs(this.sheetInfo.content[e.name]);
        };
      }
      return e;
    });
  }

  mounted() {}
}
</script>

<style scoped></style>
