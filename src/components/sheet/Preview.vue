<template>
  <div>
    <transition appear appear-active-class="fade-up-enter">
      <v-card>
        <v-form ref="sheetDesign">
          <v-toolbar flat class="transparent">
            <v-text-field
              dense
              hide-details
              readonly
              v-model="sheetTemplate.name"
              outlined
              required
              :rules="[v => !!v || 'Item is required']"
              single-line
              class="body-2"
              label="模版名称"
            ></v-text-field>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-title class="subtitle-1 font-weight-black"
            >表单内容</v-card-title
          >
          <v-container fluid>
            <v-layout>
              <v-flex xs12>
                <v-card
                  outlined
                  class="mb-3"
                  v-for="(item, i) in sheetTemplate.field.data"
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
                          readonly
                          class="body-2"
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
                          readonly
                          dense
                          class="body-2"
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

                      <v-flex
                        xs12
                        v-if="
                          item.type === 'select' || item.type === `multi-select`
                        "
                      >
                        <v-combobox
                          outlined
                          dense
                          single-line
                          :disabled="sheetTemplate.locked"
                          label="可用的选项 (回车键分隔)"
                          v-model="item.list"
                          class="body-2"
                          multiple
                          readonly
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Field } from '@/types/sheet';
import SheetService from '@/service/sheetService';
import { encodeUnicode } from '@/utils/ConvertType';
import { Authorization } from '@/types/user';

const sheetModule = namespace('sheet');
const userModule = namespace('user');

@Component
export default class SheetPreview extends Vue {
  @Prop() currentTemplateID!: string;

  $refs!: {
    sheetDesign: HTMLFormElement;
  };

  @userModule.Getter('authorization') authorization!: Authorization;
  @sheetModule.Getter('sheetTemplate') sheetTemplate: any;

  @sheetModule.Mutation('insertNewEmptyField') insertNewEmptyField: any;
  @sheetModule.Mutation('updateCurrentTemplateID')
  updateCurrentTemplateID: any;
  @sheetModule.Mutation('updateSheetTemplate')
  updateSheetTemplate: any;
  @sheetModule.Mutation('restoreSheetTemplate')
  restoreSheetTemplate: any;

  typeList = [
    { label: '文本', value: 'text-field' },
    { label: '文本框', value: 'text-area' },
    { label: '选择', value: 'select' },
    { label: '多项选择', value: 'multi-select' },
    { label: '日期', value: 'date-picker' },
    { label: '文件', value: 'file-input' }
  ];

  goHome() {
    // clear cache
    this.restoreSheetTemplate();
    this.updateCurrentTemplateID('');
    this.$router.push({ path: '/' });
  }

  @Watch('currentTemplateID')
  async onCurrentTemplateIDChanged() {
    const rsp = await SheetService.getSheetTemplate(this.currentTemplateID);
    this.updateSheetTemplate(rsp.template);
  }

  async mounted() {
    if (this.currentTemplateID != '') {
      const rsp = await SheetService.getSheetTemplate(this.currentTemplateID);
      this.updateSheetTemplate(rsp.template);
    }
  }
}
</script>

<style scoped></style>
