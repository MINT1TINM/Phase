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
        <v-col cols="8">
          <v-card>
            <v-toolbar dense color="transparent" flat>
              <v-toolbar-title class="body-2 font-weight-black">
                现场情况
              </v-toolbar-title>
            </v-toolbar>
            <v-container fluid>
              <v-card outlined flat>
                <v-container fluid>
                  <v-row dense>
                    <v-col cols="6">
                      <v-subheader class="pl-0">现场描述</v-subheader>
                      <v-textarea
                        outlined
                        label="现场描述"
                        hide-details
                        v-model="track.liveDescription"
                        dense
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6" class="pl-4">
                      <v-row dense>
                        <v-subheader>现场照片</v-subheader>
                        <v-col cols="12">
                          <v-file-input
                            outlined
                            dense
                            label="上传图片"
                            @change="uploadFile"
                            accept="image/png, image/jpeg"
                          ></v-file-input>
                        </v-col>
                        <v-col
                          cols="6"
                          v-for="(item, i) in track.file"
                          :key="`file-${i}`"
                        >
                          <v-card outlined flat>
                            <img v-viewer :src="staticURL + item" />
                            <v-toolbar dense flat color="transparent">
                              <div class="caption pa-2">
                                ... {{ item.slice(-15) }}
                              </div>
                              <v-spacer></v-spacer>
                              <v-btn icon small @click="removeFile(item)"
                                ><v-icon size="20">mdi-close</v-icon></v-btn
                              >
                            </v-toolbar>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-card outlined flat class="mt-2">
                <v-container fluid>
                  <v-row dense>
                    <v-col cols="6">
                      <v-subheader class="pl-0"
                        >图纸、招标文件等要求文本</v-subheader
                      >
                      <v-textarea
                        outlined
                        hide-details
                        label="图纸、招标文件等要求文本"
                        v-model="track.liveComment"
                        dense
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6" class="pl-4">
                      <v-row dense>
                        <v-subheader>图纸、招标文件等资料截图</v-subheader>
                        <v-col cols="12">
                          <v-file-input
                            outlined
                            dense
                            label="上传图片"
                            @change="uploadLiveFile"
                            accept="image/png, image/jpeg"
                          ></v-file-input>
                        </v-col>
                        <v-col
                          cols="6"
                          v-for="(item, i) in track.liveFile"
                          :key="`liveFile-${i}`"
                        >
                          <v-card outlined flat>
                            <v-img
                              aspect-ratio="1.7"
                              :src="staticURL + item"
                            ></v-img>
                            <v-toolbar dense flat color="transparent">
                              <div class="caption pa-2">
                                ... {{ item.slice(-15) }}
                              </div>
                              <v-spacer></v-spacer>
                              <v-btn icon small @click="removeLiveFile(item)"
                                ><v-icon size="20">mdi-close</v-icon></v-btn
                              >
                            </v-toolbar>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-row dense class="mt-2">
                <v-col cols="12">
                  <v-textarea
                    outlined
                    hide-details
                    label="本次跟踪总结"
                    v-model="track.description"
                    dense
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-divider class="my-4"></v-divider>
              <v-row dense>
                <v-col cols="12">
                  <v-switch
                    label="是否发现问题"
                    v-model="track.extraInfo.problem"
                  ></v-switch>
                  <v-textarea
                    outlined
                    hide-details
                    label="问题描述"
                    v-model="track.extraInfo.problemDesc"
                    dense
                  ></v-textarea>
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
import FileService from '@/service/fileService';

@Component
export default class ProjectTrackInfo extends Vue {
  track: Track = new Track();

  get infoContent() {
    return [
      { type: 'text-field', title: '跟踪单位', name: 'trackUnit' },
      { type: 'text-field', title: '跟踪人员', name: 'tracker' },
      { type: 'date-picker', title: '跟踪日期', name: 'trackDate' }
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

  async uploadFile(v: any) {
    const rsp = await FileService.uploadFile(v, '', '');
    this.track.file.unshift(rsp.path);
    this.updateTrack();
  }

  async removeFile(v: string) {
    this.track.file = this.track.file.filter(e => e !== v);
    this.updateTrack();
  }

  async uploadLiveFile(v: any) {
    const rsp = await FileService.uploadFile(v, '', '');
    this.track.liveFile.unshift(rsp.path);
    this.updateTrack();
  }

  async removeLiveFile(v: string) {
    this.track.liveFile = this.track.liveFile.filter(e => e !== v);
    this.updateTrack();
  }

  get staticURL() {
    return process.env.VUE_APP_STATIC_URL;
  }

  mounted() {
    this.getTrack();
  }
}
</script>

<style scoped></style>
