<template>
  <v-container fluid>
    <div v-if="dense">
      <v-layout v-for="(item,i) in formContent" :key="`${keyName}-${i}`">
        <!-- text-field -->
        <v-text-field
          v-if="item.type=='text-field'"
          class="text-field-semidense"
          v-model="target[item.content]"
          :disabled="item.disabled"
          :label="item.title"
          outlined
          hide-details
        ></v-text-field>
        <!-- select -->
        <v-select
          v-else-if="item.type=='select'"
          class="text-field-semidense"
          :items="item.list"
          v-model="target[item.content]"
          :label="item.title"
          outlined
          dense
          hide-details
          style="line-height:14px"
          item-text="title"
          item-value="value"
        ></v-select>
      </v-layout>
    </div>
    <div v-else>
      <v-layout row v-for="(item,i) in formContent" :key="`${keyName}-${i}`">
        <v-layout wrap v-if="item.subheader" class="mt-2">
          <v-flex xs12>
            <v-subheader class="body-2 font-weight-black">{{item.subheader}}</v-subheader>
            <v-divider class="mb-2"></v-divider>
          </v-flex>
        </v-layout>
        <v-layout class="my-2" v-else>
          <v-flex xs3>
            <v-subheader
              v-if="item.type=='date-range'"
              style="margin-top:70px"
              class="mb-4"
            >{{item.title}}</v-subheader>
            <v-subheader v-else>{{item.title}}</v-subheader>
          </v-flex>
          <v-flex xs9>
            <!-- text-field -->
            <v-text-field
              v-if="item.type=='text-field'"
              class="text-field-semidense"
              v-model="target[item.content]"
              :disabled="item.disabled"
              single-line
              outlined
              hide-details
            ></v-text-field>
            <!-- text-area -->
            <v-textarea
              v-else-if="item.type=='text-area'"
              v-model="target[item.content]"
              :disabled="item.disabled"
              outlined
              hide-details
            ></v-textarea>
            <!-- select -->
            <v-select
              v-else-if="item.type=='select'"
              class="text-field-semidense"
              :items="item.list"
              v-model="target[item.content]"
              outlined
              dense
              hide-details
              style="line-height:14px"
              item-text="title"
              item-value="value"
            ></v-select>
            <!-- date-range -->
            <date-range
              style="margin-top:70px"
              class="mb-4"
              v-else-if="item.type=='date-range'"
              :range="target[item.content]"
            ></date-range>
          </v-flex>
        </v-layout>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
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
