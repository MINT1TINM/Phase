<template>
  <div>
    <v-card
      outlined
      class="acrylic pa-3 mt-2"
      v-for="(item,i) in invitationList"
      :key="`invitation-${i}`"
    >
      <v-list-item-title class="body-2 font-weight-black">项目邀请</v-list-item-title>
      <v-list-item-content class="caption">来自{{item.projectName}}的{{item.fromUserName}}向您发出邀请</v-list-item-content>
      <v-layout row wrap>
        <v-flex xs6>
          <v-btn
            block
            text
            small
            class="body-2 font-weight-black"
            @click="updateInvitationStatus(1,item.id)"
          >接受</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn
            block
            text
            small
            class="body-2 font-weight-black"
            @click="updateInvitationStatus(2,item.id)"
          >拒绝</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProjectService from "@/service/projectService";
import { namespace } from "vuex-class";
import UserService from "@/service/userService";

const usermodule = namespace("user");

@Component
export default class Invitation extends Vue {
  @usermodule.Getter("authorization") private authorization: any;

  private invitationList: Invitation[] = [];

  private async updateInvitationStatus(status: number, invitationID: string) {
    await ProjectService.updateInvitationStatus(invitationID, status);
    ProjectService.getProjectList();
  }

  private async getInvitationList() {
    const rsp = await ProjectService.getInvitationList(
      "",
      "",
      this.authorization.userID
    );
    this.invitationList = rsp.invitation;
    UserService.getUserInfo(this.authorization.userID);
  }

  private mounted() {
    if (
      this.authorization.token.length >= 5 &&
      this.$route.fullPath !== "/" &&
      this.$route.fullPath !== "/login"
    ) {
      this.getInvitationList();
    }
  }
}
</script>

<style scoped>
</style>
