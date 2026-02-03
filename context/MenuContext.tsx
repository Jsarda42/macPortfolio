"use client";

import { createContext, useContext, useState } from "react";
import { FinderApp } from "@/data/apps/finder";
import { App } from "@/types/App";

type MenuContextType = {
  activeApp: App;
  setActiveApp: (app: App) => void;
  closeActiveApp: () => void;
  openModal: (component: React.FC<any>, props?: any) => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [activeApp, setActiveApp] = useState(FinderApp);
  const [modal, setModal] = useState<React.ReactNode | null>(null);

  const openModal = (Component: React.FC<any>, props?: any) => {
    setModal(<Component {...props} />);
  };

  const closeModal = () => setModal(null);

  const closeActiveApp = () => {
    setActiveApp(FinderApp);
    closeModal(); // automatically close modal when app closes
  };

  const helpers = {
    openModal,
    closeActiveApp,
    setActiveApp,
  };

  return (
    <MenuContext.Provider
      value={{
        activeApp,
        setActiveApp,
        closeActiveApp,
        openModal,
      }}
    >
      {children}
      {modal && <div className="fixed inset-0 z-50">{modal}</div>}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used inside MenuProvider");
  return ctx;
}
