<template>
  <div>
    <v-card
      outlined
      class="pa-3 mt-2"
      v-for="(item, i) in invitationList"
      :key="`invitation-${i}`"
    >
      <v-list-item-title class="body-2 font-weight-black"
        >项目邀请</v-list-item-title
      >
      <v-list-item-content class="caption"
        >来自{{ item.projectName }}的
        {{ item.nickName }} 向您发出邀请</v-list-item-content
      >
      <v-layout row wrap>
        <v-flex xs6>
          <v-btn
            block
            text
            small
            class="body-2 font-weight-black"
            @click="updateInvitationStatus(1, item.id)"
            >接受</v-btn
          >
        </v-flex>
        <v-flex xs6>
          <v-btn
            block
            text
            small
            class="body-2 font-weight-black"
            @click="updateInvitationStatus(2, item.id)"
            >拒绝</v-btn
          >
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ProjectService from '@/service/projectService';
import UserService from '@/service/userService';

const usermodule = namespace('user');
const systemModule = namespace('system');

@Component
export default class Invitation extends Vue {
  @usermodule.Getter('authorization') authorization: any;
  @systemModule.Getter('notificationCenter') notificationCenter: any;
  @systemModule.Getter('invitationList') invitationList!: Invitation[];

  async updateInvitationStatus(status: number, invitationID: string) {
    await ProjectService.updateInvitationStatus(invitationID, status);
    // get project id list
    await UserService.getUserInfo(this.authorization.userID);

    // update projectlist with id list
    await ProjectService.getProjectList(this.authorization.userID);
    this.getInvitationList();
  }

  async getInvitationList() {
    await ProjectService.getInvitationList('', '', this.authorization.userID);
    await UserService.getUserInfo(this.authorization.userID);
  }

  mounted() {
    console.log(this.invitationList);
  }
}
</script>

<style scoped></style>
