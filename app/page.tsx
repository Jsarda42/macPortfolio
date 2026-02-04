"use client";
import { useEffect, useState } from "react";
import { useMenu } from "@/context/MenuContext";
import { useWallpaper } from "@/context/WallpapersContext";

export default function Home() {
  const { closeActiveApp } = useMenu();
  const { currentWallpaper } = useWallpaper();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <main className="min-h-screen p-6 relative" onMouseDown={closeActiveApp}>
      <div
        className={`fixed inset-0 -z-10 bg-cover bg-center transition-opacity duration-1000
          ${hasMounted ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: hasMounted ? `url('${currentWallpaper}')` : "none"
        }}
      />

      {hasMounted && (
        <div className="relative z-10">
        </div>
      )}
    </main>
  );
}