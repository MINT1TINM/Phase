export default [
  {
    path: "/project",
    meta: "所有项目",
    component: () => import("@/views/project/Home")
  },
  {
    path: "/project/index",
    component: () => import("@/views/project/ProjectIndex"),
    children: [
      {
        path: "/project/calendar",
        meta: "项目日历",
        component: () => import("@/views/project/calendar/Calendar")
      },
      {
        path: "/project/process",
        meta: "项目过程",
        component: () => import("@/views/project/process/Process")
      },
      {
        path: "/project/process/:processId",
        meta: "项目过程",
        component: () => import("@/views/project/process/ProcessBoard"),
        children: [
          {
            path: "/project/process/:processId/timeline",
            meta: "任务清单",
            component: () => import("@/views/project/process/Timeline")
          },
          {
            path: "/project/process/:processId/task",
            meta: "任务清单",
            component: () => import("@/views/project/process/Task"),
            children: [
              {
                path: "/project/process/:processId/task/:taskId",
                meta: "任务清单",
                component: () => import("@/components/process/task/TaskDetail")
              }
            ]
          },
          {
            path: "/project/process/:processId/settings",
            meta: "过程设置",
            component: () => import("@/views/project/process/Settings")
          }
        ]
      },
      {
        path: "/project/document",
        meta: "项目文件",
        component: () => import("@/views/project/document/Document")
      },
      {
        path: "/project/member",
        meta: "项目成员",
        component: () => import("@/views/project/member/Member")
      },
      {
        path: "/project/settings",
        meta: "项目设置",
        component: () => import("@/views/project/settings/Settings")
      }
    ]
  }
];
