<template>
  <v-chip pill small>
    <v-avatar size="10" left>
      <v-img :src="headImgURL"></v-img>
    </v-avatar>
    <span class="font-weight-black">{{nickName}}</span>
  </v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const projectModule = namespace("project");

@Component({
  name: "user-chip"
})
export default class UserChip extends Vue {
  @projectModule.Getter("projectMemberCache") private projectMemberCache: any;

  @Prop(String) private userID!: string;

  private get headImgURL() {
    if (this.userID) {
      return (
        `https` + this.projectMemberCache(this.userID).headImgURL.substring(4)
      );
    } else {
      return "";
    }
  }

  private get nickName() {
    if (this.userID) {
      return this.projectMemberCache(this.userID).nickName;
    } else {
      return "";
    }
  }
}
</script>

<style scoped>
</style>
