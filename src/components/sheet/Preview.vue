<template>
  <div style="height:calc(100vh - 48px);overflow-y:auto">
    <v-toolbar dense flat class="navbar" style="z-index:2">
      <v-toolbar-title class="subtitle-1 font-weight-black">表单预览</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon class="ml-1" @click="goHome">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-card>
        <v-container fluid>
          <h3 class="text-center py-4">{{template.name}}</h3>
          <v-layout justify-center>
            <v-flex xs8>
              <dim-form :formContent="template.field.data" :target="target"></dim-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Template } from "@/types/sheet";
import SheetService from "@/service/sheetService";
import dimForm from "@/plugins/dim-form/Main.vue";

@Component({
  components: {
    "dim-form": dimForm
  }
})
export default class SheetPreview extends Vue {
  private template: Template = {
    name: "",
    field: {
      data: []
    },
    type: ""
  };
  private target = {};

  private goHome() {
    this.$router.push({ path: "/sheet" });
  }

  private async getTemplate() {
    const rsp = await SheetService.getSheetTemplate(
      this.$route.params.templateID
    );
    this.template = rsp.template;
  }

  private async mounted() {
    await this.getTemplate();
  }
}
</script>

<style scoped>
</style>
