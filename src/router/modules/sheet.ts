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
        path: "/sheet/design/:type",
        component: () => import("@/components/sheet/Design.vue")
      }
    ]
  }
];
