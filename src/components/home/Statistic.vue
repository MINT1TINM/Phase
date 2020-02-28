<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card class="mx-auto" color="blue lighten-1" outlined max-width="600">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 white--text"
                >项目</v-list-item-subtitle
              >
              <v-list-item-title
                class="display-1 font-weight-black white--text"
                >{{ 76 }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-sheet color="rgba(0, 0, 0, .12)">
            <v-sparkline
              :value="value"
              color="rgba(255, 255, 255, .7)"
              height="100"
              padding="24"
              stroke-linecap="round"
              smooth
            >
              <template v-slot:label="item"> {{ item.value }} </template>
            </v-sparkline>
          </v-sheet>

          <v-divider></v-divider>

          <v-card-actions
            class="white--text body-2 font-weight-black py-3 px-4"
          >
            近6个月
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="mx-auto" color="blue" outlined max-width="600">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 white--text"
                >送审金额</v-list-item-subtitle
              >
              <v-list-item-title class="display-1 font-weight-black white--text"
                >¥ {{ 950000 }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-sheet color="rgba(0, 0, 0, .12)">
            <v-sparkline
              :value="value2"
              color="rgba(255, 255, 255, .7)"
              height="100"
              padding="24"
              stroke-linecap="round"
              smooth
            >
              <template v-slot:label="item"> {{ item.value }} </template>
            </v-sparkline>
          </v-sheet>

          <v-divider></v-divider>

          <v-card-actions
            class="white--text body-2 font-weight-black py-3 px-4"
          >
            近6个月
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="mx-auto" color="blue darken-1" outlined max-width="600">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 white--text"
                >审定金额</v-list-item-subtitle
              >
              <v-list-item-title class="display-1 font-weight-black white--text"
                >¥ {{ 920000 }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-sheet color="rgba(0, 0, 0, .12)">
            <v-sparkline
              :value="value3"
              color="rgba(255, 255, 255, .7)"
              height="100"
              padding="24"
              stroke-linecap="round"
              smooth
            >
              <template v-slot:label="item"> {{ item.value }} </template>
            </v-sparkline>
          </v-sheet>

          <v-divider></v-divider>

          <v-card-actions
            class="white--text body-2 font-weight-black py-3 px-4"
          >
            近6个月
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="mx-auto" outlined max-width="600">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 "
                >跟踪日志</v-list-item-subtitle
              >
              <v-list-item-title class="display-1 font-weight-black">{{
                24
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="mx-auto" outlined max-width="600">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 "
                >参会数量</v-list-item-subtitle
              >
              <v-list-item-title class="display-1 font-weight-black">{{
                11
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="mx-auto" outlined max-width="600">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 "
                >签证变更</v-list-item-subtitle
              >
              <v-list-item-title class="display-1 font-weight-black">{{
                6
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="mx-auto" outlined max-width="600">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 "
                >支付次数</v-list-item-subtitle
              >
              <v-list-item-title class="display-1 font-weight-black">{{
                18
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card flat outlined>
          <v-toolbar dense flat color="transparent">
            <v-toolbar-title class="subtitle-1 font-weight-black">
              合同支付比例
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="grey--text font-weight-black">近6个月</span>
          </v-toolbar>
          <PaidRatio></PaidRatio>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import PaidRatio from '@/components/statistic/PaidRatio.vue';

@Component({
  components: {
    PaidRatio
  }
})
export default class HomeStatistic extends Vue {
  value = [42, 46, 67, 51, 59, 61];
  value2 = [10, 8, 6, 9, 12, 7];
  value3 = [6, 7, 4, 5, 8, 8];
}
</script>

<style scoped></style>
