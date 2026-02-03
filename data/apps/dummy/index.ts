import { DummyMenus } from "./menu";
import { DummyAppMenu } from "./app.menu";
import { App } from "@/types/App";


export const DummyApp: App = {
  id: "dummy",
  appName: "Dummy",
  appMenu: DummyAppMenu,
  menus: DummyMenus,
};