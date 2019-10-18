<template>
  <div>
    <v-toolbar flat>
      <v-text-field
        single-line
        hide-details
        v-model="sheetInfoShow.name"
        class="subtitle-1 font-weight-black"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn rounded text @click="closeDialog">
        <v-icon size="20">mdi-close</v-icon>&nbsp;取消
      </v-btn>
      <v-btn rounded text @click="saveSheet">
        <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
      </v-btn>
    </v-toolbar>
    <v-container fluid class="py-0">
      <v-layout>
        <v-flex xs3>
          <v-subheader class="body-2 px-1" style="height:36px">类型</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            dense
            :disabled="sheetInfoShow.target === `取证单`|| sheetInfoShow.target ===  `审计底稿`?true:false "
            single-line
            hide-details
            outlined
            v-model="sheetInfoShow.target"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider class="mt-4"></v-divider>
    <v-container class="pt-0" fluid v-if="templateInfo.type === `key`">
      <dim-form :formContent="templateInfo.field.data" :target="sheetInfoShow.content"></dim-form>
    </v-container>
    <!-- list -->
    <v-container fluid v-else-if="templateInfo.type === `list`">
      <v-simple-table>
        <thead>
          <tr>
            <th v-for="(item,i) in templateInfo.field.data" :key="`field-title-${i}`">{{item.title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in sheetInfoShow.content" :key="`c-${i}`">
            <td v-for="(field,i) in templateInfo.field.data" :key="`field-${i}`">
              <v-text-field outlined single-line hide-details v-model="item[field.name]" dense></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-layout justify-center class="mt-3">
        <v-flex xs6>
          <v-btn block @click="insertListElement" depressed rounded color="primary">
            <v-icon size="20">mdi-plus</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from 'vuex-class';
import SheetService from '@/service/sheetService';
import { Sheet, Field, Template } from '@/types/sheet';

const projectModule = namespace('project');

@Component({
  components: {},
})
export default class FillSheet extends Vue {
  @projectModule.Getter('currentProjectID') private currentProjectID: any;

  @Prop({ default: {} }) private templateInfo!: Template;

  @Prop({ default: {} }) private sheetInfo!: Sheet;

  private target = {};

  private async saveSheet() {
    const rsp = await SheetService.updateSheet(
      this.sheetInfoShow.id,
      this.sheetInfoShow.name,
      this.sheetInfoShow.target,
      this.sheetInfoShow.content,
    );
    await SheetService.getSheetList(this.currentProjectID);
    this.closeDialog();
  }

  private insertListElement() {
    this.sheetInfoShow.content.push({});
    console.log(this.sheetInfoShow);
  }

  private closeDialog() {
    this.$emit('closeDialog');
  }

  private get sheetInfoShow() {
    for (let i = 0; i < this.templateInfo.field.data.length; i++) {
      const e = this.templateInfo.field.data[i];
      if (e.type === 'multi-select') {
        if (this.sheetInfo.content[e.name] === undefined) {
          console.log('new');
          this.sheetInfo.content[e.name] = {
            data: [],
          };
        }
        console.log(this.sheetInfo.content);
      }
    }
    return this.sheetInfo;
  }

  private mounted() {}
}
</script>

<style scoped>
</style>
