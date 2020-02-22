<template>
  <div>
    <v-toolbar dense>
      <v-btn icon @click="$router.go(-1)">
        <v-icon size="20">mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- TODO: company info -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Supplier } from '@/types/company';
import CompanyService from '@/service/companyService';

@Component
export default class AdminSupplierInfo extends Vue {
  supplier: Supplier = new Supplier();

  get supplierID() {
    return this.$route.params.supplierID;
  }

  async mounted() {
    this.supplier = await CompanyService.getSupplier(this.supplierID);
  }
}
</script>

<style scoped></style>
