<template>
  <v-chip pill small>
    <v-avatar color="primary" size="10" left>
      <v-img v-if="headImgURL!==``" :src="headImgURL"></v-img>
      <span v-else>{{nickName | avatar}}</span>
    </v-avatar>
    <span class="font-weight-black">{{nickName}}</span>
  </v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const projectModule = namespace('project');

@Component({
  name: 'user-chip'
})
export default class UserChip extends Vue {
  @projectModule.Getter('projectMemberCache') private projectMemberCache: any;

  @Prop(String) private userID!: string;

  private get headImgURL() {
    if (this.userID && this.projectMemberCache(this.userID).headImgURL !== '') {
      return `https${this.projectMemberCache(this.userID).headImgURL.substring(
        4
      )}`;
    }
    return '';
  }

  private get nickName() {
    if (this.userID) {
      return this.projectMemberCache(this.userID).nickName;
    }
    return '';
  }
}
</script>

<style scoped>
</style>
