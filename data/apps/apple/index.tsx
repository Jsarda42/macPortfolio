import { App } from "@/types/App";
import { AppleMenus } from "./menu";
import { AppleAppMenu } from "./app.menu";


export const AppleApp: App = {
  id: "finder",
  appName: "Finder",
  appMenu: AppleAppMenu,
  menus: AppleMenus,
};
