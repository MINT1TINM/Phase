<template>
  <div>
    <v-layout class="my-4" row v-for="(item,i) in formContent" :key="`${keyName}-${i}`">
      <v-flex xs4>
        <v-subheader>{{item.title}}</v-subheader>
      </v-flex>
      <v-flex xs8>
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
        <!-- date -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "dim-form",
  props: {
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
