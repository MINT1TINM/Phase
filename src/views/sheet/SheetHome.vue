<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-title class="subtitle-1 font-weight-black">创建</v-card-title>
        <v-container fluid>
          <transition appear appear-active-class="fade-up-enter">
            <v-layout row wrap>
              <v-flex xs2 v-for="(item, i) in typeList" :key="`type-${i}`">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 8 : 0"
                    @click="toDesignPage(item.type)"
                    outlined
                  >
                    <v-img height="100">
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
        </v-card-title>
        <v-container fluid>
          <transition appear appear-active-class="fade-up-enter">
            <v-layout>
              <v-list dense two-line width="100%" class="transparent">
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
                          <v-chip small class="font-weight-black">{{
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
