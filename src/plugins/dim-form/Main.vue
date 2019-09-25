<template>
  <div>
    <v-container fluid>
      <v-layout row v-for="(content,i) in formContent" :key="`${keyName}-${i}`">
        <v-layout wrap v-if="content.subheader" class="mt-2">
          <v-flex xs12>
            <v-subheader class="pl-1 body-2 font-weight-black">{{content.subheader}}</v-subheader>
          </v-flex>
        </v-layout>
        <v-layout wrap v-if="content.divider">
          <v-flex xs12>
            <v-divider class="mb-2"></v-divider>
          </v-flex>
        </v-layout>
        <v-layout class="my-2" v-else>
          <v-flex xs3 v-if="!dense">
            <v-subheader class="body-2 px-1" style="height:36px">{{content.title}}</v-subheader>
          </v-flex>
          <v-flex :class="dense?`xs12`:`xs9`">
            <!-- text-field -->
            <v-text-field
              v-if="content.type==='text-field'"
              class="text-field-dense"
              v-model="target[content.name]"
              :disabled="content.disabled || disabled"
              :label="dense?`${content.title}`:``"
              :single-line="dense?false:true"
              :type="content.password?`password`:``"
              :rules="content.rules"
              outlined
              hide-details
            ></v-text-field>
            <!-- text-area -->
            <v-textarea
              v-else-if="content.type==='text-area'"
              class="text-field-dense"
              v-model="target[content.name]"
              :disabled="content.disabled || disabled"
              :label="dense?`${content.title}`:``"
              outlined
              hide-details
            ></v-textarea>
            <!-- select -->
            <v-select
              v-else-if="content.type==='select'"
              class="text-field-dense"
              :items="content.list"
              v-model="target[content.name]"
              :label="dense?`${content.title}`:``"
              outlined
              :chips="content.chips"
              :disabled="content.disabled || disabled"
              dense
              hide-details
              style="line-height:14px"
              :item-text="content.text"
              :item-value="content.value"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="item.headImgURL" pill small>
                  <v-avatar left>
                    <v-img :src="item.headImgURL"></v-img>
                  </v-avatar>
                  <span class="font-weight-black">{{ item.nickName }}</span>
                </v-chip>
                <v-chip v-else>
                  <span class="font-weight-black">{{ item[content.text]?item[content.text]:item }}</span>
                </v-chip>
              </template>
            </v-select>
            <!-- multi-select -->
            <v-select
              v-else-if="content.type==='multi-select'"
              class="text-field-dense"
              :items="content.list"
              v-model="target[content.name].data"
              :label="dense?`${content.title}`:``"
              :chips="content.chips"
              multiple
              outlined
              :disabled="content.disabled || disabled"
              dense
              hide-details
              style="line-height:14px"
              :item-text="content.text"
              :item-value="content.value"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="item.headImgURL" pill small>
                  <v-avatar left>
                    <v-img :src="item.headImgURL"></v-img>
                  </v-avatar>
                  <span class="font-weight-black">{{ item.nickName }}</span>
                </v-chip>
                <v-chip v-else>
                  <span class="font-weight-black">{{ item[content.text]?item[content.text]:item }}</span>
                </v-chip>
              </template>
            </v-select>
            <!-- date-range -->
            <v-layout justify-center v-else-if="content.type==='date-range'">
              <v-flex xs6>
                <date-picker
                  :disabled="content.disabled || disabled"
                  :dense="dense"
                  :max="content.max"
                  :min="content.min"
                  :date.sync="target[content.nameStart]"
                ></date-picker>
              </v-flex>
              <v-flex class="ml-2" xs6>
                <date-picker
                  :disabled="content.disabled || disabled"
                  :dense="dense"
                  :max="content.max"
                  :min="content.min"
                  :date.sync="target[content.nameEnd]"
                ></date-picker>
              </v-flex>
            </v-layout>
            <!-- switch -->
            <v-switch
              v-else-if="content.type === `switch`"
              class="mt-0"
              color="primary"
              hide-details
              v-model="target[content.name]"
              :disabled="content.disabled || disabled"
            ></v-switch>
            <!-- date-select -->
            <date-picker
              :label="dense?`${content.title}`:``"
              :dense="dense"
              :max="content.max"
              :min="content.min"
              :disabled="content.disabled || disabled"
              v-else-if="content.type==='date-picker'"
              :date.sync="target[content.name]"
            ></date-picker>
            <!-- tags -->
            <v-combobox
              v-else-if="content.type==='tags'"
              class="text-field-dense"
              :label="dense?`${content.title}`:``"
              outlined
              :disabled="content.disabled || disabled"
              v-model="target[content.name].data"
              multiple
              chips
              hide-details
            ></v-combobox>
            <!-- file-input-->
            <v-file-input
              v-else-if="content.type==='file-input'"
              :disabled="content.disabled || disabled"
              v-model="target.formContent[j][content.name]"
              color="deep-purple accent-4"
              counter
              label="File input"
              multiple
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
              outlined
              :display-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>
                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >+{{ target[item.name].length - 2 }} File(s)</span>
              </template>
            </v-file-input>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import datePicker from "../date-picker/Main";
export default {
  components: {
    "date-picker": datePicker
  },
  name: "dim-form",
  props: {
    dense: Boolean,
    keyName: String,
    formContent: Array,
    target: Object,
    disabled: Boolean
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>
</style>
