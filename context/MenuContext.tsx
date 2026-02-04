"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { FinderApp } from "@/data/apps/finder";
import { App } from "@/types/App";
import { MenuActionHelpers } from "@/types/Helpers";

type MenuContextType = MenuActionHelpers & {
  activeApp: App;
};

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [activeApp, setActiveApp] = useState<App>(FinderApp);
  const [modal, setModal] = useState<{ Component: React.FC<any>; props: any } | null>(null);

  const openModal = useCallback((Component: React.FC<any>, props?: any) => {
    setModal({ Component, props });
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const closeActiveApp = useCallback(() => {
    setActiveApp(FinderApp);
    closeModal();
  }, [closeModal]);

  const helpers: MenuActionHelpers = {
    openModal,
    closeActiveApp,
    setActiveApp,
  };

  return (
    <MenuContext.Provider
      value={{
        activeApp,
        ...helpers,
      }}
    >
      {children}
      {modal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <modal.Component {...modal.props} onClose={closeModal} />
          </div>
        </div>
      )}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used inside MenuProvider");
  return ctx;
}