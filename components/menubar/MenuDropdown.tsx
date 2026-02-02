"use client";

import { useMenu } from "@/context/MenuContext";
import { Menu } from "@/type/Menu";

type Props = {
  menu: Menu;
};

export function MenuDropdown({ menu }: Props) {
  const { openMenuId, close } = useMenu();

  if (openMenuId !== menu.title) return null;

  return (
    <div className="absolute top-8 left-0 min-w-48 rounded-md bg-white shadow-lg dark:bg-black">
      {menu.items.map((item, i) =>
        item.type === "separator" ? (
          <div key={i} className="my-1 h-px bg-black/10 dark:bg-white/10" />
        ) : (
          <div
            key={item.label}
            onClick={() => {
              item.action?.();
              close();
            }}
            className="px-3 py-1.5 hover:bg-black/10 dark:hover:bg-white/10"
          >
            {item.label}
          </div>
        )
      )}
    </div>
  );
}
