<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title class="subtitle-1 font-weight-black">{{sheetInfo.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn rounded text @click="saveSheet">
        <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
      </v-btn>
    </v-toolbar>
    <dim-form :formContent="templateField" :target="sheetInfo.content"></dim-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import dimForm from "@/plugins/dim-form/Main.vue";
import SheetService from "@/service/sheetService";
import { Sheet } from '@/types/sheet';

@Component({
  components: {
    "dim-form": dimForm
  }
})
export default class FillSheet extends Vue {
  @Prop({ default: {} }) private templateField!: {};

  @Prop({ default: {} }) private sheetInfo!: Sheet;

  private target = {};

  private async saveSheet() {
    const rsp = await SheetService.updateSheet(
      this.sheetInfo.id,
      this.sheetInfo.name,
      this.sheetInfo.content
    );
  }

  private mounted() {
    console.log(this.templateField);
  }
}
</script>

<style scoped>
</style>
