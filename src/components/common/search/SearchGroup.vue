<template>
  <div>
    <v-text-field
      dense
      class="body-2"
      flat
      hide-no-data
      hide-details
      label="选择部门"
      outlined
      @click="searchGroupDialog = true"
    >
    </v-text-field>

    <v-dialog v-model="searchGroupDialog" width="300">
      <v-card>
        <v-container fluid>
          <v-treeview
            class="body-2"
            dense
            open-all
            activatable
            :items="groupList"
            item-text="name"
            item-children="children"
            item-key="id"
            :active.sync="active"
            return-object
          >
          </v-treeview>
          <v-container fluid>
            <v-row class="mt-10" justify="center">
              <v-btn
                rounded
                color="primary darken-1"
                depressed
                @click="searchGroupDialog = false"
                >确认</v-btn
              >
            </v-row>
          </v-container>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Supplier, Group } from '@/types/company';
import CompanyService from '@/service/companyService';
import { State, namespace } from 'vuex-class';

const systemModule = namespace('system');

@Component
export default class SearchGroup extends Vue {
  @Prop(String) id!: string;
  @Prop() name!: string | undefined;

  @systemModule.State('groupList') groupList!: Group[];
  @systemModule.Mutation('updateGroupList') updateGroupList!: (
    g: Group[]
  ) => {};

  active: Group[] = [];
  searchGroupDialog = false;

  @Watch('active')
  onIdShowChanged() {
    console.log(this.active[0]?.id);
    this.$emit('update:id', this.active[0]?.id);
    this.$emit('update:name', this.active[0]?.name);
  }

  async mounted() {
    if (this.groupList.length == 0) {
      this.updateGroupList(await CompanyService.getGroup());
    }
  }
}
</script>
