<template>
  <v-layout fill-height>
    <v-flex xs2 class="inner-sidebar-withoutpadding">
      <v-list dense nav color="transparent">
        <v-list-item
          :class="$route.params.group === `all` ? `v-list-item--active` : ``"
          link
          @click="toGroup(`all`)"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-multiple-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="body-2 font-weight-regular"
            >所有联系人</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-flex>
    <v-flex xs10>
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const contactModule = namespace('contact');

@Component({
  components: {}
})
export default class ContactGroup extends Vue {
  toGroup(group: string) {
    this.$router.push({ path: `/${group}` });
  }
}
</script>

<style scoped></style>
