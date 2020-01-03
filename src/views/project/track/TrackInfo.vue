<template>
  <div>
    <v-toolbar dense>
      <v-tabs style="flex:auto">
        <v-tab :to="`/track/${$route.params.trackID}/info`">信息</v-tab>
        <v-tab :to="`/track/${$route.params.trackID}/timeline`">时间轴</v-tab>
        <v-tab :to="`/track/${$route.params.trackID}/operation`">操作</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({ path: `/track` })"
        ><v-icon size="20">mdi-close</v-icon></v-btn
      >
    </v-toolbar>
    <router-view :track="track"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Track } from '@/types/project';
import TrackService from '@/service/trackService';

@Component
export default class ProjectTrackInfo extends Vue {
  private track: Track = new Track();

  private async getTrack() {
    try {
      this.track = await TrackService.getOneTrack(this.$route.params.trackID);
    } catch (err) {
      this.$snack('加载失败');
    }
  }

  private mounted() {
    this.getTrack();
  }
}
</script>

<style scoped></style>
