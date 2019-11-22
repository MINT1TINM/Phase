<template>
  <div style="height:100%">
    <v-app-bar
      dense
      fixed
      dark
      color="primary darken-1"
      style="margin-top:48px"
    >
      <v-layout row justify-center>
        <v-flex xs8>
          <v-text-field
            dense
            flat
            class="body-2 ml-3"
            rounded
            prepend-inner-icon="mdi-magnify"
            single-line
            hide-details
            @keyup.enter="
              $router.push({
                path: `/explore/${searchContent}`,
                query: { page: '1' }
              })
            "
            solo-inverted
            label="键入以搜索"
            v-model="searchContent"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <div class="body-2 font-weight-black">找到 {{ count }} 条结果</div>
    </v-app-bar>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout justify-center>
          <v-flex xs12 md10>
            <v-layout justify-start>
              <v-list two-line color="transparent">
                <div v-for="(item, i) in policyList" :key="`p-${i}`">
                  <v-list-item
                    :to="isGod ? `/edit/${item.id}` : `/info/${item.id}`"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="body-2 font-weight-bold">
                        <v-chip small>{{ item.effective_level }}</v-chip>
                        {{ item.title | cut(60) }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="mt-2">{{
                        item.describe | cut(60)
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="my-3"></v-divider>
                </div>
              </v-list>
            </v-layout>
            <v-layout>
              <v-pagination
                v-model="currentPage"
                :length="totalPage"
                :total-visible="7"
              ></v-pagination>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import PolicyService from '@/service/policyService';
import { Policy } from '@/types/policy';

const userModule = namespace('user');

@Component
export default class PolicyExploreResult extends Vue {
  @userModule.Getter('isGod') private isGod!: boolean;

  private policyList: Policy[] = [];

  private count: number = 0;

  private searchContent: string = '';

  private async searchPolicy() {
    const rsp = await PolicyService.searchPolicy(
      this.search,
      Number(this.$route.query.page),
      50
    );
    this.policyList = rsp.policyList || [];
    this.count = rsp.count || 0;
  }

  private get search() {
    return this.$route.params.search;
  }

  private get totalPage() {
    return Math.ceil(this.count / 50) || 1;
  }

  private get currentPage() {
    return Number(this.$route.query.page);
  }

  private set currentPage(v: number) {
    this.$router.push({ query: { page: String(v) } });
  }

  @Watch('search')
  private async onSearchChanged() {
    this.searchPolicy();
  }

  @Watch('currentPage')
  private async onPageChanged() {
    this.$vuetify.goTo(0, { duration: 300 });
    this.searchPolicy();
  }

  private mounted() {
    this.searchPolicy();
    this.searchContent = this.search;
  }
}
</script>

<style scoped></style>
