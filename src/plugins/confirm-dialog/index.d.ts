import Vue, { PluginFunction } from "vue";

export interface VuetifyConfirmUseOptions extends VuetifyConfirmObject {
  property?: string;
}

declare const VuetifyConfirmPlugin: VuetifyConfirmPlugin;
export default VuetifyConfirmPlugin;

export interface VuetifyConfirmPlugin {
  install: PluginFunction<VuetifyConfirmUseOptions>;
}

export interface VuetifyConfirmObject {
  buttonTrueText?: string;
  buttonFalseText?: string;
  buttonTrueColor?: string;
  buttonFalseColor?: string;
  color?: string;
  icon?: string;
  title?: string;
  width?: number;
  dark?: boolean;
}
declare module "vue/types/vue" {
  interface Vue {
    $confirm(
      message: string,
      options?: VuetifyConfirmObject
    ): Promise<boolean | undefined>;
  }
}
