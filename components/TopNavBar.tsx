"use client";

import AppleIcon from "@mui/icons-material/Apple";
import { useMenu } from "@/context/MenuContext";
import { MenuTrigger } from "./menubar/MenuTrigger";

export default function TopNavBar() {
  const { appleMenu, activeAppMenu } = useMenu();

  return (
    <nav className="fixed top-0 z-50 flex h-8 w-full items-center gap-3 bg-white/70 px-4 text-sm backdrop-blur-md dark:bg-black/60">
      <MenuTrigger menu={appleMenu}>
        <AppleIcon fontSize="small" />
      </MenuTrigger>

      <span className="font-semibold">{activeAppMenu.appName}</span>

      {activeAppMenu.menus.map(menu => (
        <MenuTrigger key={menu.title} menu={menu}>
          {menu.title}
        </MenuTrigger>
      ))}
    </nav>
  );
}