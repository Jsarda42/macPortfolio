import { App } from "@/types/App";
import { AppleMenus } from "./menu";
import { AppleAppMenu } from "./app.menu";


export const AppleApp: App = {
  id: "apple",
  appName: "Apple",
  appMenu: AppleAppMenu,
  menus: AppleMenus,
};
