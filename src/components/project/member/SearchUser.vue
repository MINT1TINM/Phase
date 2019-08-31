<template>
  <v-layout fill-height justify-center>
    <v-flex xs8>
      <v-text-field
        outlined
        class="text-field-semidense"
        single-line
        hide-details
        label="搜索用户"
        v-model="searchUserContent"
        @keyup.enter="searchUser"
      ></v-text-field>
      <v-simple-table v-if="userList.length>=1">
        <thead>
          <tr>
            <th class="text-center">昵称</th>
            <th class="text-center">电子邮件</th>
            <th class="text-center">移动电话</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,i) in userList"
            :key="`user-${i}`"
            :style="item.alreadyMember?`color:grey`:''"
          >
            <td class="text-center">{{ item.nickName }}</td>
            <td class="text-center">{{ item.email }}</td>
            <td class="text-center">{{ item.phone }}</td>
            <td class="text-center">
              <v-btn
                @click="submitInvitation(item.id)"
                text
                rounded
                color="primary"
                :disabled="item.alreadyMember"
              >邀请</v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-container v-else>
        <v-layout justify-center align-center>
          <h3>请搜索用户</h3>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import UserService from "@/service/userService";
import { namespace } from "vuex-class";
import { ProjectMemberComplete, Invitation } from "@/types/project";
import ProjectService from "@/service/projectService";

const projectModule = namespace("project");
const userModule = namespace("user");

@Component
export default class ComponentName extends Vue {
  @projectModule.Getter("currentProjectMemberIDList")
  private currentProjectMemberIDList: any;
  @projectModule.Getter("currentProjectID") private currentProjectID: any;
  @userModule.Getter("authorization") private authorization: any;

  private userList: ProjectMemberComplete[] = [];
  private searching: boolean = false;
  private searchUserContent: string = "";

  private async searchUser() {
    // search user via api
    this.searching = true;
    const rsp = await UserService.searchUser(this.searchUserContent);
    this.userList = rsp.user;

    // find member
    for (const e of this.userList) {
      if (this.currentProjectMemberIDList.indexOf(e.id) !== -1) {
        e.alreadyMember = true;
      }
    }
    this.searching = false;
  }

  private async submitInvitation(toUserID: string) {
    const rsp = await ProjectService.submitInvitation(
      this.currentProjectID,
      this.authorization.userID,
      toUserID
    );
  }

  private hasSentInvitation() {}

  @Watch("searchUserContent")
  private onSearchUserContentChanged() {
    if (this.searching) {
      return;
    }
    if (this.searchUserContent.length < 1) {
      return;
    }
    this.searchUser();
  }

  private async mounted() {}
}
</script>

<style scoped>
</style>
