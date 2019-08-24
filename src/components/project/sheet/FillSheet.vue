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
      <v-btn rounded text @click="saveSheet">
        <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
      </v-btn>
    </v-toolbar>
    <dim-form
      v-if="templateInfo.type === `key`"
      :formContent="templateInfo.field.data"
      :target="sheetInfoShow.content"
    ></dim-form>
    <!-- list -->
    <div v-else>
      <v-simple-table>
        <thead>
          <tr>
            <th v-for="(item,i) in templateInfo.field.data" :key="`field-title-${i}`">{{item.title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in sheetInfoShow.content" :key="`c-${i}`">
            <td v-for="(field,i) in templateInfo.field.data" :key="`field-${i}`">
              <v-text-field
                outlined
                single-line
                hide-details
                v-model="item[field.name]"
                class="text-field-dense"
              ></v-text-field>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import dimForm from "@/plugins/dim-form/Main.vue";
import SheetService from "@/service/sheetService";
import { Sheet, Field, Template } from "@/types/sheet";
import { namespace } from "vuex-class";

const projectModule = namespace("project");

@Component({
  components: {
    "dim-form": dimForm
  }
})
export default class FillSheet extends Vue {
  @projectModule.Getter("currentProjectID") private currentProjectID: any;

  @Prop({ default: {} }) private templateInfo!: Template;
  @Prop({ default: {} }) private sheetInfo!: Sheet;

  private target = {};
  private sheetInfoShow: Sheet = {
    id: "",
    name: "",
    content: []
  };

  private async saveSheet() {
    const rsp = await SheetService.updateSheet(
      this.sheetInfoShow.id,
      this.sheetInfoShow.name,
      this.sheetInfoShow.content
    );
    await SheetService.getSheetList(this.currentProjectID);
  }

  private insertListElement() {
    this.sheetInfoShow.content.push({});
    console.log(this.sheetInfoShow);
  }

  private mounted() {
    console.log(this.templateInfo);
    console.log(this.sheetInfo);
    this.sheetInfoShow = this.sheetInfo;
  }
}
</script>

<style scoped>
</style>
