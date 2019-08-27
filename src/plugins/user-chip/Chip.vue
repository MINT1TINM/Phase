<template>
  <v-chip pill small>
    <v-avatar size="10" left>
      <v-img :src="projectMemberCache(userID).headImgURL"></v-img>
    </v-avatar>
    <span class="font-weight-black">{{ projectMemberCache(userID).nickName }}</span>
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

  @Prop(String) userID!: string;
}
</script>

<style scoped>
</style>
