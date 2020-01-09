<template>
  <v-container>
    <v-row>
      <v-col cols="4" xs="6" class="pt-0">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >概况</v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-container class="pa-5">
            <v-row>
              <v-progress-circular
                class="mx-5"
                :size="100"
                :width="10"
                :value="contract.paidPercentage || 0"
                color="primary"
              >
              </v-progress-circular>

              <v-col class="pl-5 py-0">
                <v-card-title class="subtitle-1 font-weight-black"
                  >支付比例</v-card-title
                >
                <v-card-text class="headline">
                  {{ contract.paidPercentage || 0 }}
                  <span class="body-2">%</span>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >记录</v-toolbar-title
      >
    </v-toolbar>
    <v-card>
      <v-toolbar dense flat color="transparent">
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text>
            <v-icon size="20" class="mr-1">mdi-plus</v-icon>新建
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-data-table></v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contract } from '@/types/project';

@Component
export default class ProjectContractPayment extends Vue {
  @Prop() private contract!: Contract;
}
</script>

<style scoped></style>
