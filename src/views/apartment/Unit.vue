<template>
  <v-layout fill-height>
    <v-flex xs4 class="inner-sidebar-withoutpadding">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs6 v-for="(item, i) in unitList" :key="`unit-${i}`">
            <v-card outlined :to="`/${$route.params.estateID}/${item.id}`">
              <v-card-title class="subtitle-2">{{ item.type }}</v-card-title>
              <v-card-text class="caption">
                <p>层高 {{ item.height }}</p>
                <p>{{ item.price }}</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs8>
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ApartmentUnit extends Vue {
  private unitList = [
    {
      id: 1,
      type: '3室 1厅 1卫',
      height: '2.5m',
      price: '¥4000/月',
      config: ''
    },
    {
      id: 2,
      type: '3室 2厅 2卫',
      height: '2.5m',
      price: '¥5000/月',
      config: ''
    },
    {
      id: 3,
      type: '1室 2厅 2卫',
      height: '2.5m',
      price: '¥2000/月',
      config: ''
    }
  ];
}
</script>

<style scoped></style>
