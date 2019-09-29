<template>
  <div style="height:calc(100vh - 48px);overflow-y:auto">
    <v-layout fill-height>
      <v-flex xs3>
        <v-toolbar flat class="transparent" dense>
          <v-btn text rounded @click="createDepartment" v-if="active.length>=1">
            <v-icon size="20">mdi-plus</v-icon>&nbsp;部门
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-treeview dense activatable return-object :items="departmentTree" :active.sync="active"></v-treeview>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

const systemModule = namespace("system");

@Component
export default class AdminDepartment extends Vue {
  @systemModule.Getter("companyName") private companyName!: string;

  private departmentTree: any = [
    {
      id: 0,
      name: "华东理工大学",
      children: []
    }
  ];
  private active = [];

  private createDepartment() {}

  @Watch("active")
  private onActiveChanged() {
    console.log(this.active);
  }

  private mounted() {}
}
</script>

<style scoped>
</style>
