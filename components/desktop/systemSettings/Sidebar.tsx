import CollectionsIcon from '@mui/icons-material/Collections';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { 
      id: "Wallpaper", 
      label: "Wallpaper", 
      icon: CollectionsIcon, 
      iconColor: "#007AFF" 
    },
  ];

  return (
    <nav className="flex-1 px-3 mt-12 space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] transition-colors duration-200 select-none
              ${isActive 
                ? "bg-[#007AFF] text-white shadow-sm" 
                : "hover:bg-black/5 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200"
              }`}
          >
            <div className="flex h-5 w-5 items-center justify-center">
              <Icon 
                sx={{ 
                  fontSize: 18, 
                  color: isActive ? "white" : item.iconColor 
                }} 
              />
            </div>
            
            <span className="font-medium tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}