"use client";

import { useMenu } from "@/context/MenuContext";
import { Menu } from "@/type/Menu";
import { MenuDropdown } from "./MenuDropdown";

type Props = {
  menu: Menu;
  children?: React.ReactNode;
};

export function MenuTrigger({ menu, children }: Props) {
  const { openMenuId, open, close } = useMenu();
  const isOpen = openMenuId === menu.title;

  return (
    <div className="relative">
      <div
        onClick={() => (isOpen ? close() : open(menu.title))}
        className={`cursor-default rounded px-1.5 py-0.5 ${
          isOpen ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/10 dark:hover:bg-white/10"
        }`}
      >
        {children ?? menu.title}
      </div>

      <MenuDropdown menu={menu} />
    </div>
  );
}
