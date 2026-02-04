"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type WallpaperContextType = {
  currentWallpaper: string;
  setWallpaper: (url: string) => void;
};

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

export function WallpaperProvider({ children }: { children: ReactNode }) {
  // Use an initializer function to check localStorage immediately
const [currentWallpaper, setCurrentWallpaper] = useState("/wallpapers/snowyMorning.webp");

useEffect(() => {
  const saved = localStorage.getItem("mac-wallpaper");
  if (saved) setCurrentWallpaper(saved);
}, []);

  const updateWallpaper = (url: string) => {
    setCurrentWallpaper(url);
    localStorage.setItem("mac-wallpaper", url);
  };

  return (
    <WallpaperContext.Provider value={{ currentWallpaper, setWallpaper: updateWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
}

export const useWallpaper = () => {
  const context = useContext(WallpaperContext);
  if (!context) throw new Error("useWallpaper must be used within WallpaperProvider");
  return context;
};