export default [
  {
    path: "/sheet",
    component: () => import("@/views/sheet/Sheet.vue")
  },
  {
    path: "/sheet/index",
    component: () => import("@/views/sheet/SheetTemplate.vue"),
    children: [
      {
        path: "/sheet/design/key",
        component: () => import("@/components/sheet/KeyDesign.vue")
      },
      {
        path: "/sheet/design/list",
        component: () => import("@/components/sheet/ListDesign.vue")
      },
      {
        path: "/sheet/preview/:templateID",
        component: () => import("@/components/sheet/Preview.vue")
      }
    ]
  }
];
