import Vue from "vue";

import basicService from "@/service/basicService";
import store from "@/store/store";
import { Task, TaskMember } from "@/types/task";

const vue = new Vue();

class TaskService {
  public static async getTaskList(processID: string) {
    const rsp = await basicService.getRequest("/task/list", {
      processID
    });
    store.commit("process/updateCurrentProcessTask", {
      processID,
      taskList: await rsp.taskList
    });
    return rsp;
  }

  public static async createTask(processID: string, name: string) {
    const rsp = await basicService.postRequest("/task", {
      processID,
      name
    });

    return rsp;
  }

  public static async getTaskInfo(taskID: string) {
    const rsp = await basicService.getRequest("/task/info", {
      taskID
    });

    return rsp;
  }

  public static async updateTaskInfo(taskInfo: Task) {
    const rsp = await basicService.putRequest("/task/info", {
      taskID: taskInfo.id,
      name: taskInfo.name,
      description: taskInfo.description,
      tags: taskInfo.tags,
      startDate: taskInfo.startDate,
      endDate: taskInfo.endDate,
      actionStartDate: taskInfo.actionStartDate,
      actionEndDate: taskInfo.actionEndDate,
      executorID: taskInfo.executorID
    });
    // @ts-ignore
    vue.$snackbar.show("更新成功");
    return rsp;
  }

  public static async deleteTask(taskID: string) {
    const rsp = await basicService.deleteRequest("/task", {
      taskID
    });
    return rsp;
  }

  public static async toggleTaskStatus(
    ProcessID: string,
    taskID: string,
    status: boolean
  ) {
    const rsp = await basicService.putRequest("/task/status", {
      ProcessID,
      taskID,
      status
    });
    return rsp;
  }

  public static async updateTaskMember(taskID: string, member: TaskMember[]) {
    const rsp = await basicService.putRequest("/task/member", {
      taskID,
      member
    });
    return rsp;
  }

  public static async createSubTask(taskID: string) {
    const rsp = await basicService.postRequest("/task/subtask", {
      taskID
    });
    return rsp;
  }
}

export default TaskService;
