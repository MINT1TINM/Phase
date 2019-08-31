<template>
  <v-layout>
    <v-flex
      xs3
      class="inner-sidebar-withoutpadding"
      style="height:calc(100vh - 48px);overflow-y:auto"
    >
      <!-- <v-toolbar flat class="transparent" dense>
        <v-text-field hide-details single-line outlined class="text-field-dense mt-2"></v-text-field>
      </v-toolbar>-->
      <v-list nav dense two-line color="transparent">
        <v-list-item
          :class="item.id === currentContactID?`v-list-item--active`:``"
          v-for="(item,i) in userList"
          :key="`user-${i}`"
          @click="showInfo(item)"
        >
          <v-list-item-avatar>
            <v-avatar color="primary" size="32">
              <img v-if="item.headImgURL" :src="item.headImgURL | httpsfy" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{item.nickName}}</v-list-item-title>
            <v-list-item-subtitle class="caption grey--text">{{item.phone}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-flex>
    <v-flex xs9>
      <contact-info :userID="currentContactID"></contact-info>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Authorization, UserInfo } from "@/types/user";
import UserService from "@/service/userService";
import contactInfo from "./ContactInfo.vue";

const userModule = namespace("user");
const contactModule = namespace("contact");

@Component({
  components: {
    "contact-info": contactInfo
  }
})
export default class ContactList extends Vue {
  @userModule.Getter("authorization") private authorization!: Authorization;
  @contactModule.Getter("currentContactID") private currentContactID!: string;
  @contactModule.Mutation("updateCurrentContactID")
  private updateCurrentContactID!: (v: string) => void;

  private userList: UserInfo[] = [];

  private async getUserList() {
    const rsp = await UserService.getUserList();
    this.userList = rsp.user;
  }

  private showInfo(user: UserInfo) {
    console.log(user.id);
    this.updateCurrentContactID(user.id!);
  }

  private mounted() {
    this.getUserList();
  }
}
</script>

<style scoped>
</style>
