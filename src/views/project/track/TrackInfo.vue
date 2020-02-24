<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title class="subtitle-1 font-weight-black">{{
        track.name
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({ path: `/track` })"
        ><v-icon size="20">mdi-close</v-icon></v-btn
      >
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-card>
            <v-toolbar dense color="transparent" flat>
              <v-toolbar-title class="body-2 font-weight-black">
                基本信息
              </v-toolbar-title>
            </v-toolbar>
            <v-container fluid>
              <dim-form :target="track" :formContent="infoContent"></dim-form>
              <v-row no-gutters justify="center">
                <v-col cols="6">
                  <v-btn
                    @click="updateTrack"
                    rounded
                    block
                    depressed
                    color="primary darken-1"
                  >
                    <v-icon size="20" class="mr-2"
                      >mdi-content-save-outline </v-icon
                    >保存
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Track } from '@/types/project';
import TrackService from '@/service/trackService';

@Component
export default class ProjectTrackInfo extends Vue {
  track: Track = new Track();

  get infoContent() {
    return [
      { type: 'text-field', title: '跟踪单位', name: 'trackUnit' },
      { type: 'text-field', title: '跟踪人员', name: 'tracker' },
      { type: 'date-picker', title: '跟踪日期', name: 'trackDate' },
      {
        disabled: true,
        type: 'date-picker',
        title: '跟踪日期',
        name: 'updatedAt'
      }
    ];
  }

  async getTrack() {
    try {
      this.track = await TrackService.getOneTrack(this.$route.params.trackID);
    } catch (err) {
      this.$snack('加载失败');
    }
  }

  async updateTrack() {
    try {
      await TrackService.updateTrack(this.track);
      this.$snack('更新成功');
    } catch (err) {
      this.$snack('更新失败');
    }
  }

  mounted() {
    this.getTrack();
  }
}
</script>

<style scoped></style>
