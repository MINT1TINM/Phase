<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="pt-0">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >基本</v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-container fluid>
            <dim-form
              disabled
              :target="contractShow"
              :formContent="contractContent"
            ></dim-form>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6" class="pt-0">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >附件</v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-container fluid> </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contract } from '@/types/project';

@Component
export default class ProjectContractInfo extends Vue {
  @Prop() private contract!: Contract;

  private contractContent = [
    {
      type: 'text-field',
      title: '编号',
      name: 'code'
    },
    {
      type: 'text-field',
      title: '名称',
      name: 'name'
    },
    {
      type: 'text-field',
      title: '乙方',
      name: 'contractorName'
    },
    {
      type: 'tags',
      title: '乙方标签',
      name: 'contractorTags'
    },
    {
      type: 'text-field',
      title: '总金额',
      name: 'amount'
    },
    {
      type: 'text-area',
      title: '约定',
      name: 'promise'
    }
  ];

  private get contractShow() {
    return this.contract;
  }

  private set contractShow(v: Contract) {
    this.contractShow = v;
  }

  private mounted() {
    console.log(this.contract);
  }
}
</script>

<style scoped></style>
