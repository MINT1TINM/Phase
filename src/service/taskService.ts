import Vue from 'vue';

import basicService from '@/service/basicService';
import store from '@/store/store';
import {
  SubTaskContent,
  Task,
  TaskMember,
  SubTaskCertificate
} from '@/types/task';

const vue = new Vue();

class TaskService {
  public static async getTaskList(processID: string) {
    const rsp = await basicService.getRequest('/task/list', {
      processID
    });
    store.commit('process/updateCurrentProcessTask', {
      processID,
      taskList: await rsp.taskList
    });
    return rsp;
  }

  public static async getMultiProcessTaskList(processIDList: string[]) {
    const rsp = await basicService.getRequest('/task/list/full', {
      id: processIDList
    });
    store.commit('process/updateFullTaskList', rsp.taskList);
    return rsp;
  }

  public static async createTask(processID: string, name: string) {
    const rsp = await basicService.postRequest('/task', {
      processID,
      name
    });

    return rsp;
  }

  public static async getTaskInfo(taskID: string) {
    const rsp = await basicService.getRequest('/task/info', {
      taskID
    });
    store.commit('task/updateCurrentTask', rsp.task);
    return rsp;
  }

  public static async updateTaskInfo(taskInfo: Task) {
    const rsp = await basicService.putRequest('/task/info', {
      taskID: taskInfo.id,
      name: taskInfo.name,
      description: taskInfo.description,
      tags: taskInfo.tags,
      startDate: taskInfo.startDate,
      endDate: taskInfo.endDate,
      actionStartDate: taskInfo.actionStartDate,
      actionEndDate: taskInfo.actionEndDate,
      executorID: taskInfo.executorID,
      color: taskInfo.color
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('更新成功');
    }
    return rsp;
  }

  public static async deleteTask(taskID: string) {
    const rsp = await basicService.deleteRequest('/task', {
      taskID
    });
    return rsp;
  }

  public static async toggleTaskStatus(
    ProcessID: string,
    taskID: string,
    status: boolean
  ) {
    const rsp = await basicService.putRequest('/task/status', {
      ProcessID,
      taskID,
      status
    });
    return rsp;
  }

  public static async updateTaskMember(taskID: string, member: TaskMember[]) {
    const rsp = await basicService.putRequest('/task/member', {
      taskID,
      member
    });
    return rsp;
  }

  public static async createSubTask(taskID: string) {
    const rsp = await basicService.postRequest('/task/subtask', {
      taskID
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('创建成功');
    }
    return rsp;
  }

  public static async updateSubTask(
    taskID: string,
    subTaskID: string,
    name: string,
    content: SubTaskContent[],
    file: any[],
    certificate: SubTaskCertificate[]
  ) {
    const rsp = await basicService.putRequest('/task/subtask', {
      taskID,
      subTaskID,
      name,
      content,
      file,
      certificate
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('修改成功');
    }
    return rsp;
  }

  public static async deleteSubTask(taskID: string, subTaskID: string) {
    const rsp = await basicService.deleteRequest('/task/subtask', {
      taskID,
      subTaskID
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('删除成功');
    }
    return rsp;
  }
}

export default TaskService;
