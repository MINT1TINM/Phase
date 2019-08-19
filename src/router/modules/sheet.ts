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
        path: "/sheet/design",
        component: () => import("@/components/sheet/Design.vue")
      },
      {
        path: "/sheet/preview/:templateID",
        component: () => import("@/components/sheet/Preview.vue")
      }
    ]
  }
];
