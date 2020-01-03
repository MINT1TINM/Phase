<template>
  <v-container>
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >基本</v-toolbar-title
      >
    </v-toolbar>
    <v-card>
      <v-container>
        <dim-form :target="trackShow" :formContent="trackContent"></dim-form>
        <v-layout justify-center>
          <v-flex xs6>
            <v-btn
              @click="updateTrack"
              rounded
              color="primary darken-1"
              block
              depressed
              >保存</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-toolbar class="mt-2" dense flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >危险</v-toolbar-title
      >
    </v-toolbar>
    <v-card>
      <v-container fluid>
        <v-layout justify-center>
          <v-flex xs6>
            <v-btn
              @click="deleteTrack"
              rounded
              color="error darken-1"
              block
              depressed
              >删除合同</v-btn
            >
          </v-flex>
        </v-layout></v-container
      >
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Track } from '@/types/project';
import TrackService from '@/service/trackService';

@Component
export default class ProjectTrackOperation extends Vue {
  @Prop() private track!: Track;

  private trackContent = [
    {
      type: 'text-field',
      title: '跟踪对象',
      name: 'name'
    },
    {
      type: 'text-area',
      title: '描述',
      name: 'description'
    }
  ];

  private async updateTrack() {
    try {
      await TrackService.updateTrack(this.trackShow);
      this.$snack('更新成功');
    } catch (_) {
      this.$snack('更新失败');
    }
  }

  private async deleteTrack() {
    const rsp = await this.$confirm('此操作无法恢复', {
      title: '确认删除?',
      buttonTrueColor: 'red darken-1',
      dark: this.$vuetify.theme.dark
    });
    if (rsp) {
      try {
        await TrackService.deleteTrack(this.$route.params.trackID);
        this.$snack('删除成功');
        this.$router.push({ path: `/track` });
      } catch (_) {
        this.$snack('删除失败');
        this.$router.push({ path: `/track` });
      }
    }
  }

  private get trackShow() {
    return this.track;
  }

  private set trackShow(v: Track) {
    this.trackShow = v;
  }

  private mounted() {}
}
</script>

<style scoped></style>
