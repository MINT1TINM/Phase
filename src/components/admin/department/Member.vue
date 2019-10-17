<template>
  <div style="height:calc(100vh - 48px); overflow:auto">
    <v-toolbar color="transparent" dense>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$route.params.departmentID!==`root`">
        <v-btn text @click="insertMemberDialog=true">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;成员
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-simple-table class="transparent">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">昵称</th>
            <th class="text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in departmentMemberList" :key="`member-${i}`">
            <td class="caption text-left">{{ item.userID }}</td>
            <td class="caption text-left">{{ item.nickName }}</td>
            <td class="text-left">
              <v-btn icon color="error" @click="removeDepartmentMember(item.userID)">
                <v-icon size="20">mdi-close</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog persistent width="500" v-model="insertMemberDialog">
      <v-card>
        <v-toolbar flat dense class="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">新增成员</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="insertMemberDialog=false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-autocomplete
            :loading="loading"
            :items="userListShow"
            :search-input.sync="search"
            flat
            hide-no-data
            dense
            hide-details
            label="+ 群组成员"
            outlined
            item-text="nickName"
            item-value="id"
          >
            <template v-slot:item="{ item }">
              <v-list-item-avatar>
                <v-img v-if="item.headImgURL" :src="item.headImgURL"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.nickName"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="insertDepartmentMember(item.id)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-autocomplete>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AdminService from "@/service/adminService";
import { DepartmentMember } from "@/types/company";
import UserService from "@/service/userService";
import { UserInfo } from "@/types/user";

@Component
export default class DepartmentMemberManage extends Vue {
  private departmentMemberList: DepartmentMember[] = [];
  private insertMemberDialog: boolean = false;

  private loading = false;
  private userList = [];
  private search: string = "";
  private select = null;

  private async getDepartment() {
    const rsp = await AdminService.getDepartment(this.currentDepartmentID);
    this.departmentMemberList = rsp.department.member.data;
  }

  private async insertDepartmentMember(userID: string) {
    await AdminService.insertDepartmentMember(this.currentDepartmentID, userID);
    this.getDepartment();
  }

  private async removeDepartmentMember(userID: string) {
    await AdminService.removeDepartmentMember(this.currentDepartmentID, userID);
    this.getDepartment();
  }

  private async querySelections(v: string) {
    this.loading = true;
    // Simulated ajax query
    const rsp = await UserService.searchUser(v);
    this.userList = rsp.user.filter((e: UserInfo) => {
      return (
        (e.nickName || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
      );
    });
    console.log(this.userList);
    this.loading = false;
  }

  private get currentDepartmentID() {
    return this.$route.params.departmentID;
  }

  private get selectedNickNameList() {
    const userNickNameList: string[] = [];
    for (const item of this.departmentMemberList) {
      userNickNameList.push((item as DepartmentMember).nickName.toLowerCase());
    }
    return userNickNameList;
  }

  private get userListShow() {
    console.log(this.userList);
    return this.userList.filter((e: DepartmentMember) => {
      return this.selectedNickNameList.indexOf(e.nickName.toLowerCase()) === -1;
    });
  }

  @Watch("currentDepartmentID")
  private async onChanged() {
    if (this.currentDepartmentID !== "root") {
      this.getDepartment();
      console.log(this.departmentMemberList);
    }
  }

  @Watch("search")
  private async onSearchContentChanged(val: string) {
    val && val !== this.select && this.querySelections(val);
  }

  private mounted() {
    this.getDepartment();
  }
}
</script>

<style scoped>
</style>
