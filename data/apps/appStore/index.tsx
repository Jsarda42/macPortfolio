import { App } from "@/types/App";
import {  AppStoreMenu } from "./menu";
import { AppleAppStoreMenu } from "./app.menu";


export const AppStoreApp: App = {
  id: "appStore",
  appName: "App Store",
  icon: "/icons/appStore.png",
  appMenu: AppleAppStoreMenu,
  menus: AppStoreMenu,
};
