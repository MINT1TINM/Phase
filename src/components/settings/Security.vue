<template>
  <div>
    <v-list>
      <v-list-item class="pl-2">
        <v-subheader class="pl-0">登录历史</v-subheader>
      </v-list-item>
      <v-divider class="mx-2"></v-divider>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Authorization } from "@/types/user";
import UserService from "@/service/userService";

const userModule = namespace("user");

@Component
export default class SecuritySetting extends Vue {
  @userModule.Getter("authorization") private authorization!: Authorization;

  private async getUserLoginHistory() {
    const rsp = await UserService.getUserLoginHistory(
      this.authorization.userID
    );
  }

  private mounted() {
    this.getUserLoginHistory();
  }
}
</script>

<style scoped>
</style>
