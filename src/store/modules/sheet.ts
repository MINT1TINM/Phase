import { Field, Template } from "@/types/sheet";
import { encodeUnicode } from "@/utils/ConvertType";

interface State {
  sheetTemplate: {
    name: string;
    field: { data: Field[] };
  };
  currentTemplateID: string;
}

const state: State = {
  sheetTemplate: {
    name: "未命名模版",
    field: {
      data: []
    }
  },
  currentTemplateID: ""
};

const getters = {
  sheetTemplate: (s: State) => {
    return s.sheetTemplate;
  },
  currentTemplateID: (s: State) => {
    return s.currentTemplateID;
  }
};

const mutations = {
  insertNewEmptyField: (s: State) => {
    s.sheetTemplate.field.data.push({
      title: "",
      type: "",
      name: ""
    });
  },
  updateSheetTemplate: (s: State, template: Template) => {
    s.sheetTemplate = template;
  },
  updateCurrentTemplateID: (s: State, id: string) => {
    s.currentTemplateID = id;
  },
  restoreSheetTemplate: (s: State) => {
    s.sheetTemplate = {
      name: "未命名模版",
      field: {
        data: []
      }
    };
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
