import { Menu } from "@/types/Menu";
import { useMenu } from "@/context/MenuContext";

type DropdownProps = {
  menu: Menu;
  onClose?: () => void;
};

export function Dropdown({ menu, onClose }: DropdownProps) {
  const helpers = useMenu();

  return (
    <div className="absolute top-full left-0 mt-1 w-55 
             bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-2xl 
             border border-black/10 dark:border-white/15 
             shadow-[0_10px_30px_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(0,0,0,0.05)]
             rounded-[10px] p-1.25 z-50 animate-in fade-in zoom-in-95 duration-75">

      {menu.items.map((item) => {
        if (item.type === "separator") {
          return (
            <div
              key={item.id}
              className="h-px bg-black/8 dark:bg-white/12] my-1.25 mx-2.5"
            />
          );
        }

        return (
          <div
            key={item.id}
            className="group flex justify-between items-center px-2.5 py-0.75 
                       hover:bg-[#007AFF] hover:text-white rounded-[5px] 
                       cursor-default select-none transition-colors duration-75"
            onClick={(e) => {
              e.stopPropagation();

              if (item.action) {
                item.action(helpers);
              }

              onClose?.();
            }}
          >
            <span className="text-[13px] font-medium tracking-wide">
              {item.label}
            </span>

            {item.shortcut && (
              <span className="text-[11px] opacity-50 group-hover:text-white group-hover:opacity-100 ml-4">
                {item.shortcut}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}