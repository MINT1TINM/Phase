<template>
  <v-layout fill-height>
    <v-flex xs2 class="inner-sidebar-withoutpadding">
      <v-container flat color="transparent">
        <v-text-field
          single-line
          hide-details
          dense
          outlined
          label="搜索区域"
        ></v-text-field>
        <v-btn class="mt-4" block outlined>
          <v-icon size="20">mdi-plus</v-icon>&nbsp;新增区域
        </v-btn>
      </v-container>

      <v-list dense nav color="transparent">
        <v-list-item
          v-for="(item, i) in estateList"
          :key="`estate-${i}`"
          :to="`/${item.id}`"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-flex>
    <v-flex xs10>
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ApartmentEstate extends Vue {
  private estateList = [
    {
      id: 1,
      name: '光明小区'
    }
  ];
}
</script>

<style scoped></style>
