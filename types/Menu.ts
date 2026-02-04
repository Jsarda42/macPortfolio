import { App } from "./App";
import { MenuActionHelpers } from "./Helpers";

export type MenuActionProps = {
  openModal: (component: React.FC<any>, props?: any) => void;
  closeActiveApp: () => void;
  setActiveApp: (app: App) => void;
};

export type MenuItem =
  | {
    type: "item";
    id: string;
    label: string;
    action?: (helpers: MenuActionHelpers) => void;
    disabled?: boolean;
    shortcut?: string;
  }
  | {
    type: "separator";
    id: string;
  };

export type Menu = {
  action?: (helpers: MenuActionHelpers) => void;
  id: string;
  label?: string;
  icon?: "apple" | string;
  items: MenuItem[];
};

export type AppMenu = {
  id: string;
  appName: string;
  appMenu: Menu;
  menus: Menu[];
};

export type SystemMenus = {
  apple: Menu;
};




