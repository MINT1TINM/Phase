<template>
  <v-layout fill-height justify-center>
    <v-flex xs8>
      <v-text-field
        outlined
        dense
        single-line
        hide-details
        label="搜索用户"
        v-model="searchUserContent"
        @keyup.enter="searchUser"
      ></v-text-field>
      <v-simple-table v-if="userList.length >= 1">
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
            v-for="(item, i) in userList"
            :key="`user-${i}`"
            :style="item.alreadyMember ? `color:grey` : ''"
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
                >邀请</v-btn
              >
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import UserService from '@/service/userService';
import { ProjectMemberComplete, Invitation } from '@/types/project';
import ProjectService from '@/service/projectService';

const projectModule = namespace('project');
const userModule = namespace('user');

@Component
export default class ComponentName extends Vue {
  @projectModule.Getter('currentProjectMemberIDList')
  currentProjectMemberIDList: any;

  @projectModule.Getter('currentProjectID') currentProjectID: any;

  @userModule.Getter('authorization') authorization: any;

  userList: ProjectMemberComplete[] = [];

  searching: boolean = false;

  searchUserContent: string = '';

  async searchUser() {
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

  async submitInvitation(toUserID: string) {
    const rsp = await ProjectService.submitInvitation(
      this.currentProjectID,
      this.authorization.userID,
      toUserID
    );
    const inv = rsp.invitation as Invitation;

    // immediately add user
    await ProjectService.updateInvitationStatus(inv.id, 1);
  }

  hasSentInvitation() {}

  @Watch('searchUserContent')
  onSearchUserContentChanged() {
    if (this.searching) {
      return;
    }
    if (this.searchUserContent.length < 1) {
      return;
    }
    this.searchUser();
  }

  async mounted() {}
}
</script>

<style scoped></style>
