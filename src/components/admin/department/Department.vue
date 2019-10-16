<template>
  <div style="height:calc(100vh - 48px);overflow-y:auto">
    <v-layout fill-height>
      <v-flex xs3 class="inner-sidebar-withoutpadding">
        <v-sheet tile height="100%">
          <v-toolbar flat class="transparent" dense>
            <v-toolbar-title class="subtitle-1 font-weight-black">部门树</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn text rounded @click="createDepartment()" v-if="active[0]">
                <v-icon size="20">mdi-plus</v-icon>&nbsp;部门
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container fluid>
            <v-treeview
              class="body-2"
              rounded
              dense
              activatable
              return-object
              :items="departmentTree"
              :active.sync="active"
            ></v-treeview>
          </v-container>
        </v-sheet>
      </v-flex>
      <v-flex xs9>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { insertNodeToTree } from "@/utils/SearchNode";
const uuidv1 = require("uuid/v1");

const systemModule = namespace("system");

@Component
export default class AdminDepartment extends Vue {
  @systemModule.Getter("companyName") private companyName!: string;

  private departmentTree: any = [
    {
      id: "xxxxxx",
      name: "INSDIM",
      children: []
    }
  ];
  private active: any[] = [];

  private createDepartment() {
    console.log(this.active[0]);
    insertNodeToTree(this.active, this.active[0]!.id, {
      id: uuidv1(),
      name: "shit",
      children: []
    });
  }

  @Watch("active")
  private onActiveChanged() {
    console.log(this.active);
    if (this.active[0] && this.active[0]!.id) {
      this.$router.push({ path: `/admin/department/${this.active[0]!.id}` });
    }
  }

  private mounted() {}
}
</script>

<style scoped>
</style>
