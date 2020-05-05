<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-text-field
        single-line
        outlined
        dense
        hide-details
        label="标题"
        v-model="sheetInfo.name"
        class="subtitle-1 font-weight-black"
      ></v-text-field>
      <v-spacer></v-spacer>
      <span class="caption mr-5">
        上次更新 {{ sheetInfo.updatedAt | format('yyyy-MM-dd hh:mm') }}
      </span>
      <v-btn @click="saveSheet" text
        ><v-icon size="20" class="mr-2">mdi-content-save-outline</v-icon
        >保存</v-btn
      >
    </v-toolbar>

    <!-- key -->
    <v-container class="pt-0" fluid v-if="templateInfo.type === `key`">
      <dim-form
        :formContent="formContent"
        :target="sheetInfo.content"
        :disabled="!editable"
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
                :readonly="!editable"
                v-model="item[field.name]"
                dense
              ></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-simple-table>

      <v-layout justify-center class="mt-3">
        <v-flex xs6>
          <v-btn
            block
            @click="insertListElement"
            depressed
            outlined
            rounded
            color="primary"
          >
            <v-icon size="20">mdi-plus</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
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
  @Prop() editable!: boolean;

  target = {};
  templateInfo: Template = new Template();
  sheetInfo: Sheet = new Sheet();
  formContent: Field[] = [];

  async saveSheet() {
    await SheetService.updateSheet(
      this.sheetInfo.id,
      this.sheetInfo.name,
      this.sheetInfo.target,
      this.sheetInfo.content
    );
  }

  insertListElement() {
    if (!this.sheetInfo.content) {
      this.sheetInfo.content = [];
    }
    this.sheetInfo.content.push({});
  }

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
