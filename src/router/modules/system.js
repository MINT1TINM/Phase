export default [
  {
    path: "/",
    component: () => import("@/views/Landing")
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login")
  },
  {
    path: "/wechat/login",
    component: () => import("@/views/login/WechatLogin")
  },
  {
    path: "/register",
    component: () => import("@/views/user/Register")
  }
];
