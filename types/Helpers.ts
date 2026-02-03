import { App } from "@/types/App";

export type MenuActionHelpers = {
  openModal: (Component: React.FC<any>, props?: any) => void;
  closeActiveApp: () => void;
  setActiveApp: (app: App) => void;
};
