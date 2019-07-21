<template>
  <v-layout row justify-center>
    <v-dialog light v-model="dialog" persistent max-width="300">
      <v-card>
        <v-container>
          <v-card-title class="subtitle-1">{{title}}</v-card-title>
          <v-card-text>{{text}}</v-card-text>
          <v-card-actions>
            <v-layout xs12 justify-center>
              <v-btn rounded color="primary" depressed @click="confirm">确认</v-btn>
              <v-btn rounded text @click="cancel">取消</v-btn>
            </v-layout>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    title: null,
    text: null
  },
  data: () => ({
    dialog: false
  }),

  methods: {
    show(title, text) {
      this.dialog = true;
      this.title = title;
      this.text = text;
    },
    confirm() {
      this.dialog = false;
      this.callBack(true);
    },
    cancel() {
      this.dialog = false;
      this.callBack(false);
    }
  }
};
</script>

<style>
</style>
