import { App } from "@/types/App";
import { FinderAppMenu } from "./app.menu";
import { FinderMenus } from "./menu";


export const FinderApp: App = {
  id: "finder",
  appName: "Finder",
  appMenu: FinderAppMenu,
  menus: FinderMenus,
};
