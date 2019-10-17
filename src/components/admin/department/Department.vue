<template>
  <div style="height:calc(100vh - 48px);overflow-y:auto">
    <v-layout fill-height>
      <v-flex xs3 class="inner-sidebar-withoutpadding">
        <v-sheet tile height="100%">
          <v-toolbar flat class="transparent" dense>
            <v-toolbar-title class="subtitle-1 font-weight-black">部门树</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn text rounded @click="createDepartmentDialog=true" v-if="active[0]">
                <v-icon size="20">mdi-plus</v-icon>&nbsp;部门
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container fluid>
            <v-treeview
              class="body-2 font-weight-bold"
              rounded
              dense
              open-on
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

    <v-dialog v-model="createDepartmentDialog" width="300">
      <v-card>
        <v-toolbar flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">创建部门</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-text-field
            single-line
            hide-details
            outlined
            dense
            label="部门名称"
            v-model="departmentName"
          ></v-text-field>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn rounded color="primary darken-2" depressed @click="createDepartment">确认</v-btn>
          <v-btn rounded text @click="createDepartmentDialog=false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { insertNodeToTree } from "@/utils/SearchNode";
import AdminService from "../../../service/adminService";
const uuidv1 = require("uuid/v1");

const systemModule = namespace("system");

@Component
export default class AdminDepartment extends Vue {
  @systemModule.Getter("companyName") private companyName!: string;

  private departmentTree: any = [];
  private active: any[] = [];
  private createDepartmentDialog: boolean = false;
  private departmentName: string = "";

  private createDepartment() {
    const result = insertNodeToTree(this.active, this.active[0]!.id, {
      id: uuidv1(),
      name: this.departmentName,
      children: []
    });
    this.departmentName = "";
    this.createDepartmentDialog = false;
    AdminService.updateDepartment(result);
  }

  @Watch("active")
  private onActiveChanged() {
    console.log(this.active);
    if (this.active[0] && this.active[0]!.id) {
      this.$router.push({ path: `/admin/department/${this.active[0]!.id}` });
    }
  }

  private async mounted() {
    const rsp = await AdminService.getDepartment();
    this.departmentTree = rsp.department.data;
  }
}
</script>

<style scoped>
</style>
