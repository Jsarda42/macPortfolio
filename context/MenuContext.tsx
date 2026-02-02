"use client";

import { createContext, useContext, useState } from "react";
import { AppleMenu } from "@/data/menus/apple.menu";
import { FinderMenu } from "@/data/menus/finder.menu";
import { AppMenu, Menu } from "@/type/Menu";

type MenuContextType = {
  appleMenu: Menu;
  activeAppMenu: AppMenu;
  setActiveAppMenu: (menu: AppMenu) => void;

  openMenuId: string | null;
  open: (id: string) => void;
  close: () => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [activeAppMenu, setActiveAppMenu] = useState<AppMenu>(FinderMenu);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <MenuContext.Provider
      value={{
        appleMenu: AppleMenu,
        activeAppMenu,
        setActiveAppMenu,
        openMenuId,
        open: setOpenMenuId,
        close: () => setOpenMenuId(null),
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used inside MenuProvider");
  return ctx;
}
