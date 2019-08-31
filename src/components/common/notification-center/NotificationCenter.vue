<template>
  <div>
    <v-container fluid grid-list-md>
      <v-toolbar color="transparent" flat>
        <h3 style="margin-left:-16px">通知中心</h3>
        <v-spacer></v-spacer>
        <v-btn icon @click="$refs.invitation.getInvitationList()">
          <v-icon size="20">mdi-refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <invitation ref="invitation" class="mt-4" style="width:100%"></invitation>
    </v-container>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import invitation from "./modules/Invitation.vue";
import { Invitation } from "@/types/project";
import ProjectService from "@/service/projectService";

const systemModule = namespace("system");

@Component({
  components: {
    invitation
  }
})
export default class NotificationCenter extends Vue {
  public $refs!: {
    invitation: HTMLFormElement;
  };
  private mounted() {}
}
</script>

<style scoped>
</style>
