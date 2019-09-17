<template>
  <div style="height:calc(100vh - 48px);overflow-y:auto">
    <v-toolbar dense flat class="navbar" style="z-index:2">
      <v-toolbar-title class="subtitle-1 font-weight-black">表单设计器</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn rounded text @click="saveTemplate">
        <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn icon class="ml-1" @click="goHome">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container grid-list-md>
      <v-layout row wrap justify-center>
        <v-flex xs10>
          <transition appear appear-active-class="fade-up-enter">
            <v-card>
              <v-form ref="sheetDesign">
                <v-toolbar flat class="transparent">
                  <v-text-field
                    class="text-field-semidense"
                    hide-details
                    v-model="sheetTemplate.name"
                    outlined
                    required
                    :rules="[v => !!v || 'Item is required']"
                    single-line
                    label="模版名称"
                  ></v-text-field>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-title class="subtitle-1 font-weight-black">表单内容</v-card-title>
                <v-container fluid>
                  <v-layout>
                    <v-flex xs12>
                      <v-card
                        outlined
                        draggable="true"
                        class="mb-3"
                        v-for="(item,i) in sheetTemplate.field.data"
                        :key="`field-${i}`"
                      >
                        <v-container>
                          <v-layout row wrap>
                            <v-flex xs6>
                              <v-text-field
                                class="text-field-semidense"
                                label="名称"
                                v-model="item.title"
                                outlined
                                required
                                :rules="[v => !!v || 'Item is required']"
                                hide-details
                                single-line
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                              <v-select
                                dense
                                :items="typeList"
                                class="text-field-semidense"
                                required
                                v-model="item.type"
                                :rules="[v => !!v || 'Item is required']"
                                hide-details
                                single-line
                                label="类型"
                                item-text="label"
                                item-value="value"
                                outlined
                              ></v-select>
                            </v-flex>
                            <v-flex
                              xs12
                              v-if="item.type==='select' || item.type === `multi-select`"
                            >
                              <v-combobox
                                class="text-field-dense"
                                outlined
                                single-line
                                label="可用的选项 (回车键分隔)"
                                :disabled="item.disabled"
                                v-model="item.list"
                                multiple
                                chips
                                hide-details
                              ></v-combobox>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout justify-center class="mt-4">
                    <v-flex xs6>
                      <v-btn rounded depressed block color="primary" @click="insertField">
                        <v-icon size="20">mdi-plus</v-icon>&nbsp;增加字段
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </transition>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Field } from "@/types/sheet";
import { namespace } from "vuex-class";
import SheetService from "@/service/sheetService";
import { encodeUnicode } from "@/utils/ConvertType";

const sheetModule = namespace("sheet");

@Component
export default class SheetDesign extends Vue {
  public $refs!: {
    sheetDesign: HTMLFormElement;
  };

  @sheetModule.Getter("sheetTemplate") private sheetTemplate: any;
  @sheetModule.Getter("currentTemplateID") private currentTemplateID!: string;
  @sheetModule.Mutation("insertNewEmptyField") private insertNewEmptyField: any;
  @sheetModule.Mutation("updateCurrentTemplateID")
  private updateCurrentTemplateID: any;
  @sheetModule.Mutation("updateSheetTemplate")
  private updateSheetTemplate: any;
  @sheetModule.Mutation("restoreSheetTemplate")
  private restoreSheetTemplate: any;

  private typeList = [
    { label: "文本", value: "text-field" },
    { label: "文本框", value: "text-area" },
    { label: "选择", value: "select" },
    { label: "多项选择", value: "multi-select" },
    { label: "日期", value: "date-picker" }
  ];

  private insertField() {
    if (this.$refs.sheetDesign.validate()) {
      this.insertNewEmptyField();
    }
  }

  private async saveTemplate() {
    if (this.$refs.sheetDesign.validate()) {
      this.updateSheetTemplate(this.sheetTemplate);
      console.log(this.sheetTemplate);
      this.sheetTemplate.type = "key";

      // create new template if no templateID
      if (!this.currentTemplateID) {
        const rsp = await SheetService.createSheetTemplate(this.sheetTemplate);
        if (rsp.msg === "success") {
          this.updateCurrentTemplateID(rsp.template.id);
        }
      } else {
        // save changes
        const rsp = await SheetService.updateSheetTemplate(
          this.sheetTemplate,
          this.currentTemplateID
        );
      }
    }
  }

  private goHome() {
    // clear cache
    this.restoreSheetTemplate();
    this.updateCurrentTemplateID("");
    this.$router.push({ path: "/sheet" });
  }

  @Watch("currentTemplateID")
  private async onCurrentTemplateIDChanged() {
    const rsp = await SheetService.getSheetTemplate(this.currentTemplateID);
    this.updateSheetTemplate(rsp.template);
  }

  private async mounted() {
    if (this.currentTemplateID) {
      const rsp = await SheetService.getSheetTemplate(this.currentTemplateID);
      this.updateSheetTemplate(rsp.template);
    }
  }
}
</script>

<style scoped>
</style>
