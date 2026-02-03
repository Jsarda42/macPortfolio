import { Menu } from "@/types/Menu";
import { useMenu } from "@/context/MenuContext";
import { MenuActionHelpers } from "@/types/Helpers";

type DropdownProps = {
  menu: Menu;
};

export function Dropdown({ menu }: DropdownProps) {
  const { openModal, closeActiveApp, setActiveApp } = useMenu();

  const helpers: MenuActionHelpers = { openModal, closeActiveApp, setActiveApp };

  return (
    <div className="absolute top-full left-0 mt-1 w-56 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-2xl border rounded-xl shadow z-50">
      {menu.items.map((item) => {
        if (item.type === "separator") {
          return <hr key={item.id} className="my-1 border-gray-200 dark:border-gray-700" />;
        }

        return (
          <div
            key={item.id}
            className="px-4 py-2 hover:bg-[#007AFF] hover:text-white cursor-pointer rounded"
            onClick={() => item.action?.(helpers)} // ✅ dynamic helpers
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
