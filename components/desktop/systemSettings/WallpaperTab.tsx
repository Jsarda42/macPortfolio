import { useWallpaper } from "@/context/WallpapersContext";
import { WALLPAPERS } from "@/data/systemSettings/wallpapers";

export function WallpaperTab() {
  const { currentWallpaper, setWallpaper } = useWallpaper();

  return (
    <div className="p-6 overflow-y-auto h-full bg-white/50 dark:bg-black/20">
      <h3 className="text-[11px] font-bold text-neutral-500 mb-4 uppercase tracking-widest opacity-60">
        Desktop Pictures
      </h3>
      
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {WALLPAPERS.map((wall) => {
          const isSelected = currentWallpaper === wall.url;
          
          return (
            <div key={wall.id} className="flex flex-col gap-2">
              <button
                onClick={() => setWallpaper(wall.url)}
                className={`group relative aspect-16/10 rounded-lg overflow-hidden transition-all
                  ${isSelected 
                    ? "ring-[3px] ring-[#007AFF] ring-offset-2 dark:ring-offset-neutral-900" 
                    : "hover:ring-2 hover:ring-neutral-300 dark:hover:ring-neutral-600"
                  }`}
              >
                <img 
                  src={wall.thumbnail} 
                  alt={wall.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </button>
              <span className="text-[11px] text-center font-medium text-neutral-700 dark:text-neutral-300">
                {wall.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}