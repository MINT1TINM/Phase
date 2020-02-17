<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-title class="subtitle-1 font-weight-black">创建</v-card-title>
        <v-container>
          <transition appear appear-active-class="fade-up-enter">
            <v-layout row wrap>
              <v-flex xs3 v-for="(item, i) in typeList" :key="`type-${i}`">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 8 : 0"
                    @click="toDesignPage(item.type)"
                    outlined
                  >
                    <v-img height="150">
                      <v-layout fill-height justify-center align-center>
                        <v-icon size="30">mdi-plus</v-icon>
                      </v-layout>
                    </v-img>
                  </v-card>
                </v-hover>
                <v-card-title class="body-2 font-weight-black text-center">
                  <v-layout justify-center>{{ item.name }}</v-layout>
                </v-card-title>
              </v-flex>
            </v-layout>
          </transition>
        </v-container>
        <v-card-title class="subtitle-1 font-weight-black">
          最新
          <v-spacer></v-spacer>

          <v-btn
            @click="updateViewMode(`grid`)"
            icon
            :color="viewMode === `grid` ? 'primary' : ''"
          >
            <v-icon>mdi-grid-large</v-icon>
          </v-btn>

          <v-btn
            @click="updateViewMode(`list`)"
            icon
            :color="viewMode === `list` ? 'primary' : ''"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-btn>
        </v-card-title>
        <v-container>
          <transition appear appear-active-class="fade-up-enter">
            <v-layout row wrap v-if="viewMode === `grid`">
              <v-flex
                xs3
                v-for="(item, i) in templateList"
                :key="`project-${i}`"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card :elevation="hover ? 8 : 2">
                    <v-img
                      :aspect-ratio="16 / 9"
                      src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                    >
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex white--text primary"
                          style="height: 100%;opacity:0.8"
                        >
                          <v-layout justify-center align-center>
                            <v-tooltip v-if="item.locked" bottom>
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  v-on="on"
                                  icon
                                  @click="toDesignTool(item.id, item.type)"
                                >
                                  <v-icon size="20" class="white--text"
                                    >mdi-magnify</v-icon
                                  >
                                </v-btn>
                              </template>
                              <span>预览</span>
                            </v-tooltip>
                            <v-tooltip v-else bottom>
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  v-on="on"
                                  icon
                                  @click="toDesignTool(item.id, item.type)"
                                >
                                  <v-icon size="20" class="white--text"
                                    >mdi-pencil-outline</v-icon
                                  >
                                </v-btn>
                              </template>
                              <span>编辑</span>
                            </v-tooltip>
                          </v-layout>
                        </div>
                      </v-expand-transition>
                    </v-img>
                    <v-card-title class="body-2 font-weight-black pb-0">
                      <v-icon
                        color="warning darken-1"
                        v-if="item.locked"
                        small
                        class="mr-2"
                        >mdi-lock-outline</v-icon
                      >
                      {{ item.name | cut(15) }}

                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text>
                      <span class="grey--text font-weight-regular caption">{{
                        item.createdAt | format('yyyy-MM-dd')
                      }}</span>
                      <v-spacer></v-spacer>
                      {{ type(item.type).name }}</v-card-text
                    >
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
            <v-layout v-else>
              <v-list two-line width="100%" class="transparent">
                <template v-for="(item, i) in templateList">
                  <div :key="`project-${i}`">
                    <v-list-item @click="toDesignTool(item.id, item.type)">
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-black">{{
                          item.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle class="caption">{{
                          item.createdAt | format('yyyy-MM-dd')
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-avatar min-width="100">
                        <v-list-item-title>
                          <v-chip class="font-weight-black">{{
                            type(item.type).name
                          }}</v-chip>
                        </v-list-item-title>
                      </v-list-item-avatar>
                      <v-list-item-avatar>
                        <v-icon
                          color="warning darken-1"
                          v-if="item.locked"
                          small
                          class="mr-2"
                          >mdi-lock-outline</v-icon
                        >
                      </v-list-item-avatar>
                    </v-list-item>
                    <v-divider></v-divider>
                  </div>
                </template>
              </v-list>
            </v-layout>
          </transition>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import appBar from '@/components/common/app-bar/AppBar.vue';
import SheetService from '@/service/sheetService';

const sheetModule = namespace('sheet');
const userModule = namespace('user');
const systemModule = namespace('system');

@Component({
  components: {
    'app-bar': appBar
  }
})
export default class SheetHome extends Vue {
  @userModule.Getter('authorization') authorization: any;

  @sheetModule.Getter('typeList') typeList: any;

  @sheetModule.Getter('type') type: any;

  @sheetModule.Getter('viewMode') viewMode!: string;

  @sheetModule.Mutation('restoreSheetTemplate')
  restoreSheetTemplate: any;

  @sheetModule.Mutation('updateCurrentTemplateID')
  updateCurrentTemplateID: any;

  @sheetModule.Mutation('updateViewMode') updateViewMode!: (v: string) => void;

  @systemModule.Getter('systemName') systemName!: string;

  templateList = [];

  toDesignPage(type: string) {
    this.updateCurrentTemplateID('');
    this.restoreSheetTemplate();

    this.$router.push({
      path: `/design/${type}`
    });
  }

  async getTemplateList() {
    const rsp = await SheetService.getSheetTemplateList(
      '',
      this.authorization.userID
    );
    this.templateList = rsp.template;
  }

  toDesignTool(templateID: string, type: string) {
    this.updateCurrentTemplateID(templateID);
    this.restoreSheetTemplate();

    this.$router.push({
      path: `/design/${type}`
    });
  }

  toPreviewTool(templateID: string) {
    this.$router.push({
      path: `/preview/${templateID}`
    });
  }

  mounted() {
    this.getTemplateList();
  }
}
</script>

<style scoped></style>
