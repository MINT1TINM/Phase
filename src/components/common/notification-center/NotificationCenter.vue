<template>
  <div>
    <v-container fluid grid-list-md>
      <h3 class="mt-5">通知中心</h3>
      <invitation class="mt-4" style="width:100%"></invitation>
    </v-container>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import invitation from "./modules/Invitation.vue";
import { Invitation } from "../../../types/project";
import ProjectService from "../../../service/projectService";

const systemModule = namespace("system");

@Component({
  components: {
    invitation
  }
})
export default class NotificationCenter extends Vue {
  @systemModule.Mutation("toggleNotificationCenter")
  private togtoggleNotificationCentergle: any;

  private mounted() {}
}
</script>

<style scoped>
</style>
