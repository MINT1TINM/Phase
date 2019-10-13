<template>
  <div style="height:calc(100vh - 48px);overflow-y:auto">
    <v-toolbar dense flat class="navbar" style="z-index:2">
      <v-toolbar-title class="subtitle-1 font-weight-black">表单设计器</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          @click="saveTemplate"
          :disabled="sheetTemplate.locked"
          v-if="sheetTemplate.userID === authorization.userID || sheetTemplate.locked==undefined"
        >
          <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
        </v-btn>
        <!-- <v-btn
          text
          @click="deleteTemplate(currentTemplateID)"
          :disabled="sheetTemplate.locked"
          v-if="sheetTemplate.userID === authorization.userID || sheetTemplate.locked==undefined"
        >
          <v-icon size="20">mdi-delete-outline</v-icon>&nbsp;删除
        </v-btn>-->
        <v-btn text @click="exportTemplate">
          <v-icon size="20">mdi-export</v-icon>&nbsp;导出
        </v-btn>
      </v-toolbar-items>

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
                    dense
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
                        class="mb-3"
                        v-for="(item,i) in sheetTemplate.field.data"
                        :key="`field-${i}`"
                      >
                        <v-container>
                          <v-layout row wrap align-center>
                            <v-flex xs6>
                              <v-text-field
                                label="名称"
                                v-model="item.title"
                                outlined
                                dense
                                :disabled="sheetTemplate.locked"
                                required
                                :rules="[v => !!v || 'Item is required']"
                                hide-details
                                single-line
                              ></v-text-field>
                            </v-flex>
                            <v-flex style="-webkit-box-flex:1">
                              <v-select
                                :items="typeList"
                                required
                                dense
                                v-model="item.type"
                                :disabled="sheetTemplate.locked"
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
                                <v-btn :disabled="sheetTemplate.locked" icon v-on="on">
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
                                outlined
                                dense
                                single-line
                                :disabled="sheetTemplate.locked"
                                label="可用的选项 (回车键分隔)"
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
                      <v-btn
                        v-if="!sheetTemplate.locked"
                        rounded
                        depressed
                        block
                        color="primary"
                        @click="insertField"
                      >
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
import { Authorization } from "@/types/user";

const sheetModule = namespace("sheet");
const userModule = namespace("user");

@Component
export default class SheetDesign extends Vue {
  public $refs!: {
    sheetDesign: HTMLFormElement;
  };

  @userModule.Getter("authorization") private authorization!: Authorization;
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
      this.sheetTemplate.type = this.$route.params.type;

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

  private async deleteTemplate(templateID: string) {
    const res = await this.$confirm("此操作无法还原", {
      title: "确认释放?",
      buttonTrueColor: "primary",
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await SheetService.deleteTemplate(templateID);
      this.$router.push({ path: "/sheet" });
    }
  }

  private async exportTemplate() {
    await SheetService.exportTemplate(this.sheetTemplate.id);
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
