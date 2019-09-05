<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="250">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-light mb-5 mt-5">Audit 表单</h1>
          <v-btn rounded outlined dark @click="typeSelectDialog=true" class="mt-4">
            <v-icon>mdi-plus</v-icon>&nbsp;新建模版
          </v-btn>
        </v-layout>
      </v-parallax>

      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="subtitle-1 font-weight-black">
              最新
              <v-spacer></v-spacer>
            </v-card-title>
            <v-container>
              <transition appear appear-active-class="fade-up-enter">
                <v-layout row wrap>
                  <v-flex xs3 v-for="(item,i) in templateList" :key="`project-${i}`">
                    <v-hover v-slot:default="{ hover }">
                      <v-card :elevation="hover ? 8 : 2">
                        <v-img
                          :aspect-ratio="16/9"
                          src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                        >
                          <v-expand-transition>
                            <div
                              v-if="hover"
                              class="d-flex green-acrylic white--text"
                              style="height: 100%;"
                            >
                              <v-layout justify-center align-center>
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on }">
                                    <v-btn v-on="on" icon @click="toDesignTool(item.id,item.type)">
                                      <v-icon size="20" class="white--text">mdi-pencil-outline</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>编辑</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on }">
                                    <v-btn v-on="on" icon @click="toPreviewTool(item.id)">
                                      <v-icon
                                        size="20"
                                        class="white--text"
                                      >mdi-feature-search-outline</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>预览</span>
                                </v-tooltip>
                              </v-layout>
                            </div>
                          </v-expand-transition>
                        </v-img>
                        <v-card-title class="body-2 font-weight-black">
                          {{item.name}}
                          <span
                            class="grey--text ml-2 font-weight-regular"
                          >{{item.createdAt| format("yyyy-MM-dd")}}</span>
                          <v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>{{type(item.type).name}}</v-card-text>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </transition>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>

      <v-dialog v-model="typeSelectDialog" width="600">
        <v-card>
          <v-toolbar flat class="font-weight-black subtitle-1">
            选择类型
            <v-spacer></v-spacer>
            <v-btn icon @click="typeSelectDialog=false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fluid grid-list-md>
            <v-layout wrap row>
              <v-flex xs3 v-for="(item,i) in typeList" :key="`type-${i}`">
                <v-card ripple @click="toDesignPage(item.type)">
                  <v-card-text>{{item.name}}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import appBar from "@/components/common/app-bar/AppBar.vue";
import SheetService from "@/service/sheetService";
import { namespace } from "vuex-class";

const sheetModule = namespace("sheet");
const userModule = namespace("user");

@Component({
  components: {
    "app-bar": appBar
  }
})
export default class Sheet extends Vue {
  @userModule.Getter("authorization") private authorization: any;
  @sheetModule.Getter("typeList") private typeList: any;
  @sheetModule.Getter("type") private type: any;

  @sheetModule.Mutation("restoreSheetTemplate")
  private restoreSheetTemplate: any;
  @sheetModule.Mutation("updateCurrentTemplateID")
  private updateCurrentTemplateID: any;

  private templateList = [];
  private typeSelectDialog: boolean = false;

  private toDesignPage(type: string) {
    this.updateCurrentTemplateID("");

    this.$router.push({
      path: `/sheet/design/${type}`
    });
  }

  private async getTemplateList() {
    const rsp = await SheetService.getSheetTemplateList(
      "",
      this.authorization.userID
    );
    this.templateList = rsp.template;
  }

  private toDesignTool(templateID: string, type: string) {
    this.updateCurrentTemplateID(templateID);
    this.restoreSheetTemplate();

    this.$router.push({
      path: `/sheet/design/${type}`
    });
  }

  private toPreviewTool(templateID: string) {
    this.$router.push({
      path: `/sheet/preview/${templateID}`
    });
  }

  private mounted() {
    this.getTemplateList();
  }
}
</script>

<style scoped>
</style>
