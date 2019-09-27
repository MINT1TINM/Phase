<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-layout fill-height>
        <v-flex xs2 class="inner-sidebar-withoutpadding">
          <v-list dense nav color="transparent">
            <v-list-item
              :class="currentGroup === `all`?`v-list-item--active`:``"
              link
              @click="toGroup(`all`)"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-multiple-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="body-2 font-weight-regular">所有联系人</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex xs10>
          <contact-list></contact-list>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import contactList from "@/components/contact/ContactList.vue";

const contactModule = namespace("contact");

@Component({
  components: {
    "contact-list": contactList
  }
})
export default class Contact extends Vue {
  @contactModule.Getter("currentGroup") private currentGroup!: string;
  @contactModule.Mutation("updateCurrentGroup") private updateCurrentGroup!: (
    v: string
  ) => void;

  private toGroup(group: string) {
    this.updateCurrentGroup(group);
  }
}
</script>

<style scoped>
</style>
