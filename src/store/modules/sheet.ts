import { Field, Sheet, Template } from "@/types/sheet";

interface State {
  sheetTemplate: {
    name: string;
    field: { data: Field[] };
  };
  currentTemplateID: string;
  typeList: any[];
  sheetList: Sheet[];
}

const state: State = {
  sheetTemplate: {
    name: "未命名模版",
    field: {
      data: []
    }
  },
  currentTemplateID: "",
  typeList: [
    {
      name: "键值型",
      type: "key"
    },
    {
      name: "列表型",
      type: "list"
    }
  ],
  sheetList: []
};

const getters = {
  sheetTemplate: (s: State) => {
    return s.sheetTemplate;
  },
  currentTemplateID: (s: State) => {
    return s.currentTemplateID;
  },
  typeList: (s: State) => {
    return s.typeList;
  },
  type: (s: State) => (type: string) => {
    return s.typeList.find((e: any) => {
      return e.type === type;
    });
  },
  sheetList: (s: State) => {
    return s.sheetList;
  }
};

const mutations = {
  insertNewEmptyField: (s: State) => {
    s.sheetTemplate.field.data.push({
      title: "",
      type: "",
      name: "",
      list: []
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
  },
  updateSheetList: (s: State, sheetList: Sheet[]) => {
    s.sheetList = sheetList;
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
