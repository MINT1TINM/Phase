import basicService from '@/service/basicService';
import store from '@/store/store';
import {
  SubTask,
  SubTaskCertificate,
  SubTaskContent,
  Task,
  TaskMember
} from '@/types/task';
import Vue from 'vue';

const vue = new Vue();

class TaskService {
  static async getTaskList(processID: string) {
    const rsp = await basicService.getRequest('/task/list', { processID });
    store.commit('process/updateCurrentProcessTask', {
      processID,
      taskList: await rsp.taskList
    });
    return rsp;
  }

  static async getMultiProcessTaskList(processIDList: string[]) {
    const rsp = await basicService.getRequest('/task/list/full', {
      id: processIDList
    });
    store.commit('process/updateFullTaskList', rsp.taskList);
    return rsp;
  }

  static async createTask(processID: string, name: string) {
    const rsp = await basicService.postRequest('/task', { processID, name });

    return rsp;
  }

  static async getTaskInfo(taskID: string) {
    let date = new Date().getTime();
    const rsp = await basicService.getRequest('/task/info', { taskID, date });
    store.commit('task/updateCurrentTask', rsp.task);
    return rsp;
  }

  static async updateTaskInfo(taskInfo: Task) {
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
      vue.$snack('更新成功');
    }
    return rsp;
  }

  static async insertTaskFile(taskID: string, file: any) {
    const rsp = await basicService.postRequest('/task/file', { taskID, file });
    if (rsp.msg === 'success') {
      vue.$snack('链接成功');
    }
    return rsp;
  }

  static async deleteTaskFile(taskID: string, fileID: string) {
    const rsp = await basicService.deleteRequest('/task/file', {
      taskID,
      fileID
    });
    if (rsp.msg === 'success') {
      vue.$snack('删除成功');
    }
    return rsp;
  }

  static async deleteTask(taskID: string) {
    const rsp = await basicService.deleteRequest('/task', { taskID });
    return rsp;
  }

  static async toggleTaskStatus(
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

  static async updateTaskMember(taskID: string, member: TaskMember[]) {
    const rsp = await basicService.putRequest('/task/member', {
      taskID,
      member
    });
    return rsp;
  }

  static async createSubTask(taskID: string, subTask: SubTask) {
    const rsp = await basicService.postRequest('/task/subtask', {
      taskID,
      subTask
    });
    if (rsp.msg === 'success') {
      vue.$snack('创建成功');
    }
    return rsp;
  }

  static async updateSubTask(taskID: string, subTask: any) {
    // console.log('subTask:', subTask);

    const rsp = await basicService.putRequest('/task/subtask', {
      taskID,
      subTaskID: subTask.id,
      status: subTask.status,
      name: subTask.name,
      content: subTask.content,
      color: subTask.color,
      startDate: subTask.startDate,
      endDate: subTask.endDate,
      member: subTask.member,
      certificat: subTask.certificate
    });
    if (rsp.msg === 'success') {
      vue.$snack('修改成功');
    }
    return rsp;
  }

  static async deleteSubTask(taskID: string, subTaskID: string) {
    const rsp = await basicService.deleteRequest('/task/subtask', {
      taskID,
      subTaskID
    });
    if (rsp.msg === 'success') {
      vue.$snack('删除成功');
    }
    return rsp;
  }
}

export default TaskService;
