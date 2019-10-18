<template>
  <v-dialog
    @input="change"
    value="true"
    :dark="dark"
    :max-width="width"
    :persistent="persistent"
    @keydown.esc="choose(false)"
  >
    <v-card tile flat>
      <v-toolbar v-if="Boolean(title)" dense flat>
        <v-toolbar-title class="font-weight-black subtitle-1 pl-0" v-text="title" />
      </v-toolbar>

      <v-container fluid>
        <div class="body-2 pl-1" v-html="message" />
      </v-container>

      <v-card-actions class="justify-center">
        <v-btn
          v-if="Boolean(buttonTrueText)"
          depressed
          rounded
          :color="buttonTrueColor+` darken-1`"
          @click="choose(true)"
        >{{ buttonTrueText }}</v-btn>
        <v-btn
          v-if="Boolean(buttonFalseText)"
          :color="buttonFalseColor"
          rounded
          text
          @click="choose(false)"
        >{{ buttonFalseText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    buttonTrueText: {
      type: String,
      default: '确认',
    },
    buttonFalseText: {
      type: String,
      default: '取消',
    },
    buttonTrueColor: {
      type: String,
      default: 'red',
    },
    buttonFalseColor: {
      type: String,
      default: 'grey',
    },
    message: {
      type: String,
      required: true,
    },
    persistent: Boolean,
    title: {
      type: String,
    },
    width: {
      type: Number,
      default: 350,
    },
    dark: {
      type: Boolean,
    },
  },
  data() {
    return {
      value: false,
    };
  },
  methods: {
    choose(value) {
      this.$emit('result', value);
      this.value = value;
      this.$destroy();
    },
    change(res) {
      this.$destroy();
    },
  },
  mounted() {
    // wtf???
    this.$vuetify.breakpoint = {};
  },
};
</script>

<style>
.v-dialog__container {
  display: block;
}
</style>
