<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="pt-0">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >基本</v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-container fluid>
            <dim-form
              disabled
              :target="track"
              :formContent="trackContent"
            ></dim-form>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6" class="pt-0">
        <v-toolbar class="mt-2" dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >附件</v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-container fluid> </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Track } from '@/types/project';

@Component
export default class ProjectTrackInfo extends Vue {
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

  private mounted() {
    console.log(this.track);
  }
}
</script>

<style scoped></style>
