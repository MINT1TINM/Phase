export default [
  {
    path: "/project",
    meta: "所有项目",
    component: () => import("@/views/project/Project.vue")
  },
  {
    path: "/project/:processID/index",
    component: () => import("@/views/project/ProjectTemplate.vue"),
    children: [
      {
        path: "/project/calendar",
        meta: "项目日历",
        component: () => import("@/views/project/calendar/Calendar.vue")
      },
      {
        path: "/project/process",
        meta: "项目过程",
        component: () => import("@/views/project/process/Process.vue")
      },
      {
        path: "/project/process/:processID",
        meta: "项目过程",
        component: () => import("@/views/project/process/ProcessBoard.vue"),
        children: [
          {
            path: "/project/process/:processID/timeline",
            meta: "任务清单",
            component: () => import("@/views/project/process/Timeline.vue")
          },
          {
            path: "/project/process/:processID/task",
            meta: "任务清单",
            component: () => import("@/views/project/process/Task.vue"),
            children: [
              {
                path: "/project/process/:processID/task/:taskID",
                meta: "任务清单",
                component: () =>
                  import("@/components/project/process/task/TaskDetail.vue")
              }
            ]
          },
          {
            path: "/project/process/:processID/settings",
            meta: "过程设置",
            component: () => import("@/views/project/process/Settings.vue")
          }
        ]
      },
      {
        path: "/project/document",
        meta: "项目文件",
        component: () => import("@/views/project/document/Document.vue")
      },
      {
        path: "/project/member",
        meta: "项目成员",
        component: () => import("@/views/project/member/Member.vue")
      },
      {
        path: "/project/sheet",
        meta: "项目表单",
        component: () => import("@/views/project/sheet/Sheet.vue")
      },
      {
        path: "/project/settings",
        meta: "项目设置",
        component: () => import("@/views/project/settings/Settings.vue")
      }
    ]
  }
];
