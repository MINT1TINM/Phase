<template>
  <v-app>
    <app-bar></app-bar>
    <app-common></app-common>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import {
 Component, Prop, Vue, Watch 
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';

@Component({
  components: {}
})
export default class Admin extends Vue {
  private get currentPath() {
    return this.$route.path;
  }

  @Watch('currentPath')
  private onChanged() {
    if (this.currentPath === '/') {
      this.$router.push({ path: '/home' });
    }
  }

  private mounted() {
    if (this.currentPath === '/') {
      this.$router.push({ path: '/home' });
    }
  }
}
</script>

<style scoped>
</style>
