import { Menu } from "./Menu";

export type App = {
  id: string;
  appName: string;
  appMenu: Menu;
  menus: Menu[];
  icon?: string;
};
