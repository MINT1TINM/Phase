<template>
  <div>
    <v-autocomplete
      v-model="idShow"
      :loading="loading"
      :items="supplierList"
      :search-input.sync="search"
      cache-items
      dense
      class="body-2"
      flat
      hide-no-data
      hide-details
      label="搜索供应商"
      item-text="name"
      item-value="id"
      outlined
    >
    </v-autocomplete>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Supplier } from '@/types/company';
import CompanyService from '@/service/companyService';

@Component
export default class SearchSupplierPlugin extends Vue {
  @Prop(String) id!: string;
  @Prop() name!: string | undefined;

  idShow: string = '';
  search: string = '';
  supplierList: Supplier[] = [];
  loading = false;

  @Watch('search')
  onDateChanged(val: string) {
    val && !this.loading && this.querySelections(val);
  }

  @Watch('idShow')
  onIdShowChanged() {
    this.$emit('update:id', this.idShow);
    this.$emit(
      'update:name',
      this.supplierList.find(e => {
        return e.id === this.idShow;
      })?.name
    );
  }

  async querySelections(v: string) {
    this.loading = true;
    this.supplierList = await CompanyService.searchSupplier(v);
    this.loading = false;
  }

  mounted() {}
}
</script>
