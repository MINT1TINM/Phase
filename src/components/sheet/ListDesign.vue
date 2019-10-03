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
                    hide-details
                    v-model="sheetTemplate.name"
                    outlined
                    dense
                    required
                    :rules="[v => !!v || 'Item is required']"
                    single-line
                    label="模版名称"
                  ></v-text-field>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-title class="subtitle-1 font-weight-black">列表字段</v-card-title>
                <v-container fluid>
                  <v-layout>
                    <v-flex xs12>
                      <v-card
                        outlined
                        class="mb-3"
                        v-for="(item,i) in sheetTemplate.field.data"
                        :key="`field-${i}`"
                      >
                        <v-container>
                          <v-layout row wrap align-center>
                            <v-flex xs6>
                              <v-text-field
                                dense
                                label="名称"
                                v-model="item.title"
                                outlined
                                required
                                :rules="[v => !!v || 'Item is required']"
                                hide-details
                                single-line
                              ></v-text-field>
                            </v-flex>
                            <v-flex style="-webkit-box-flex:1">
                              <v-select
                                dense
                                :items="typeList"
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

                            <v-menu bottom left>
                              <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                              </template>

                              <v-list dense>
                                <v-list-item
                                  v-if="i!==sheetTemplate.field.data.length-1"
                                  @click="moveDown(i)"
                                >
                                  <v-list-item-icon>
                                    <v-icon>mdi-arrow-down</v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-title>下移</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="i!==0" @click="moveUp(i)">
                                  <v-list-item-icon>
                                    <v-icon>mdi-arrow-up</v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-title>上移</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="deleteField(i)">
                                  <v-list-item-icon>
                                    <v-icon>mdi-close</v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-title>删除</v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>

                            <v-flex
                              xs12
                              v-if="item.type==='select' || item.type === `multi-select`"
                            >
                              <v-combobox
                                dense
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
import { namespace } from "vuex-class";
import SheetService from "@/service/sheetService";

const sheetModule = namespace("sheet");

@Component
export default class ListSheetDesign extends Vue {
  public $refs!: {
    sheetDesign: HTMLFormElement;
  };

  @sheetModule.Getter("sheetTemplate") private sheetTemplate: any;
  @sheetModule.Getter("currentTemplateID") private currentTemplateID: any;
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
    { label: "选择", value: "select" },
    { label: "多项选择", value: "multi-select" },
    { label: "日期", value: "date-picker" }
  ];

  private insertField() {
    if (this.$refs.sheetDesign.validate()) {
      this.insertNewEmptyField();
    }
  }

  private deleteField(i: number) {
    this.sheetTemplate.field.data.splice(i, 1);
  }

  private moveDown(i: number) {
    this.sheetTemplate.field.data[i] = this.sheetTemplate.field.data.splice(
      i + 1,
      1,
      this.sheetTemplate.field.data[i]
    )[0];
  }

  private moveUp(i: number) {
    this.sheetTemplate.field.data[i] = this.sheetTemplate.field.data.splice(
      i - 1,
      1,
      this.sheetTemplate.field.data[i]
    )[0];
  }

  private async saveTemplate() {
    if (this.$refs.sheetDesign.validate()) {
      this.updateSheetTemplate(this.sheetTemplate);
      console.log(this.sheetTemplate);
      this.sheetTemplate.type = "list";

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
