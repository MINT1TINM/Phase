import Vue from "vue";

import basicService from "@/service/basicService";
import store from "@/store/store";
import { Field, Template } from "@/types/sheet";
import { encodeUnicode } from "@/utils/ConvertType";

const vue = new Vue();
class SheetService {
  public static async createSheetTemplate(template: Template) {
    // encode field name
    for (const field of template.field.data) {
      field.name = encodeUnicode(field.title);
    }

    const rsp = await basicService.postRequest("/sheet/template", {
      name: template.name,
      field: template.field,
      type: template.type
    });

    return rsp;
  }

  public static async updateSheetTemplate(
    template: Template,
    templateID: string
  ) {
    // encode field name
    for (const field of template.field.data) {
      field.name = encodeUnicode(field.title);
    }

    const rsp = await basicService.putRequest("/sheet/template", {
      templateID,
      name: template.name,
      field: template.field
    });

    return rsp;
  }

  public static async getSheetTemplate(templateID: string) {
    const rsp = await basicService.getRequest("/sheet/template", {
      id: templateID
    });

    return rsp;
  }

  public static async getSheetTemplateList(
    templateName: string,
    userID: string
  ) {
    const rsp = await basicService.getRequest("/sheet/templatelist", {
      userID,
      templateName
    });

    return rsp;
  }

  public static async createSheet(
    projectID: string,
    templateID: string,
    type: string,
    taskID: string,
    target?: string
  ) {
    const rsp = await basicService.postRequest("/sheet", {
      projectID,
      templateID,
      type,
      taskID,
      target
    });
    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("创建成功");
    }

    return rsp;
  }

  public static async getSheetList(projectID: string) {
    const rsp = await basicService.getRequest("/sheet/list", {
      projectID
    });
    store.commit("sheet/updateSheetList", rsp.sheet);
    return rsp;
  }

  public static async getSheetInfoList(sheetIDList: string[]) {
    const rsp = await basicService.getRequest("/sheet/list/info", {
      id: sheetIDList
    });
    return rsp;
  }

  public static async getSheetInfo(sheetID: string) {
    const rsp = await basicService.getRequest("/sheet", {
      sheetID
    });

    return rsp;
  }

  public static async updateSheet(
    sheetID: string,
    name: string,
    target: string,
    content: {}
  ) {
    const rsp = await basicService.putRequest("/sheet", {
      sheetID,
      name,
      target,
      content
    });
    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("更新成功");
    }
    return rsp;
  }

  public static async deleteSheet(
    sheetID: string,
    taskID: string,
    target: string
  ) {
    const rsp = await basicService.deleteRequest("/sheet", {
      sheetID,
      taskID,
      target
    });

    return rsp;
  }
}

export default SheetService;
