<template>
  <v-app>
    <app-bar></app-bar>
    <app-common></app-common>
    <div>
      <router-view></router-view>
    </div>
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
export default class Finance extends Vue {
  private get currentPath() {
    return this.$route.path;
  }

  @Watch('currentPath')
  private onChanged() {
    if (this.currentPath === '/') {
      this.$router.push({ path: '/project' });
    }
  }

  private mounted() {
    if (this.currentPath === '/') {
      this.$router.push({ path: '/project' });
    }
  }
}
</script>

<style scoped>
</style>
