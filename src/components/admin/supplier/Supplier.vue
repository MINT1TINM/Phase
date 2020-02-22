<template>
  <div>
    <v-data-table
      style="overflow-y:auto"
      height="calc(100vh - 107px)"
      :headers="headers"
      :items="supplierList"
      disable-sort
      fixed-header
      class="elevation-1 transparent"
    >
      <template v-slot:item.action="{ item }">
        <v-btn icon :to="`/supplier/${item.id}`"
          ><v-icon size="20">mdi-information-outline</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Supplier } from '@/types/company';
import CompanyService from '@/service/companyService';

@Component
export default class AdminSupplier extends Vue {
  supplierList: Supplier[] = [];

  get headers() {
    return [
      {
        text: '名称',
        value: 'name'
      },
      {
        text: '电话',
        value: 'phone'
      },
      {
        text: '地址',
        value: 'address'
      },
      {
        text: '操作',
        value: 'action'
      }
    ];
  }

  async mounted() {
    this.supplierList = await CompanyService.getSupplierList(1, 20);
  }
}
</script>

<style scoped></style>
