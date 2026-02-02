export type MenuItem =
  | { type: "item"; label: string; action?: () => void }
  | { type: "separator" };

export type Menu = {
  title: string;
  items: MenuItem[];
};

export type AppMenu = {
  appName: string;
  menus: Menu[];
};
