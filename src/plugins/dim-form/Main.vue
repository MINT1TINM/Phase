<template>
  <div>
    <v-container fluid>
      <v-layout row v-for="(item,i) in formContent" :key="`${keyName}-${i}`">
        <v-layout wrap v-if="item.subheader" class="mt-2">
          <v-flex xs12>
            <v-subheader class="body-2 font-weight-black">{{item.subheader}}</v-subheader>
            <v-divider class="mb-2"></v-divider>
          </v-flex>
        </v-layout>
        <v-layout wrap v-if="item.divider" class="mt-2">
          <v-flex xs12>
            <v-divider class="mb-2"></v-divider>
          </v-flex>
        </v-layout>
        <v-layout class="my-2" v-else>
          <v-flex xs3 v-if="!dense">
            <v-subheader
              v-if="item.type=='date-range'"
              style="margin-top:70px"
              class="mb-4 body-2 px-1"
            >{{item.title}}</v-subheader>
            <v-subheader v-else class="body-2 px-1" style="height:36px">{{item.title}}</v-subheader>
          </v-flex>
          <v-flex :class="dense?`xs12`:`xs9`">
            <!-- text-field -->
            <v-text-field
              v-if="item.type=='text-field'"
              class="text-field-dense"
              v-model="target[item.name]"
              :disabled="item.disabled"
              :label="dense?`${item.title}`:``"
              :single-line="dense?false:true"
              outlined
              hide-details
            ></v-text-field>
            <!-- text-area -->
            <v-textarea
              v-else-if="item.type=='text-area'"
              class="text-field-dense"
              v-model="target[item.name]"
              :disabled="item.disabled"
              :label="dense?`${item.title}`:``"
              outlined
              hide-details
            ></v-textarea>
            <!-- select -->
            <v-select
              v-else-if="item.type=='select'"
              class="text-field-dense"
              :items="item.list"
              v-model="target[item.name]"
              :label="dense?`${item.title}`:``"
              outlined
              dense
              hide-details
              style="line-height:14px"
              item-text="title"
              item-value="value"
            ></v-select>
            <!-- multi-select -->
            <v-select
              v-else-if="item.type=='multi-select'"
              class="text-field-dense"
              :items="item.list"
              v-model="target[item.name].data"
              :label="dense?`${item.title}`:``"
              :chips="item.chips"
              multiple
              outlined
              dense
              hide-details
              style="line-height:14px"
              item-text="title"
              item-value="value"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip small>
                  <span class="font-weight-black">{{ item }}</span>
                </v-chip>
              </template>
            </v-select>
            <!-- date-range -->
            <date-range
              style="margin-top:70px"
              class="mb-4"
              v-else-if="item.type=='date-range'"
              :range="target[item.name]"
            ></date-range>
            <!-- data-select -->
            <date-picker
              :label="dense?`${item.title}`:``"
              :dense="dense"
              v-else-if="item.type=='date-picker'"
              :date.sync="target[item.name]"
            ></date-picker>
            <!-- tags -->
            <v-combobox
              v-else-if="item.type=='tags'"
              class="text-field-dense"
              :label="dense?`${item.title}`:``"
              outlined
              v-model="target[item.name].data"
              multiple
              chips
              hide-details
            ></v-combobox>
            <!-- file-input-->
            <v-file-input
              v-else-if="item.type=='file-input'"
              :disabled="item.disabled"
              v-model="target.formContent[j][item.name]"
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
import dateRange from "../date-range/Main";
import datePicker from "../date-picker/Main";
export default {
  components: {
    "date-range": dateRange,
    "date-picker": datePicker
  },
  name: "dim-form",
  props: {
    dense: Boolean,
    keyName: String,
    formContent: Array,
    target: Object
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
