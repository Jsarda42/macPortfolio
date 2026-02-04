"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import { useMenu } from "@/context/MenuContext";
import { DockApps } from "@/data/registry";

const DockIcon = memo(({ src, name, isBouncing }: { src: string, name: string, isBouncing: boolean }) => (
  <div className={`relative mb-1 transition-transform duration-200 ease-out group-hover:-translate-y-2 group-active:scale-90 ${isBouncing ? "animate-dock-bounce" : ""}`}>
    <Image
      src={src}
      alt={name}
      width={48}
      height={48}
      priority
      className="select-none pointer-events-none object-contain"
      style={{ aspectRatio: "1/1" }}
    />
  </div>
));
DockIcon.displayName = "DockIcon";

export function Dock() {
  // 1. Get openModal and setActiveApp from context to pass to the actions
  const { activeApp, openModal, setActiveApp } = useMenu();
  const [bouncingApp, setBouncingApp] = useState<string | null>(null);

  const handleAppClick = (app: any) => {
    // Visual Feedback
    setBouncingApp(app.id);
    setTimeout(() => setBouncingApp(null), 800);

    // 2. Sync Top Bar (Active App State)
    setActiveApp(app);

    // 3. Trigger the generic action
    // We pass the context handlers (h) so the app knows how to open its modal
    console.log(app)

    console.log(app.appMenu.action)
    if (app.appMenu.action) {
      app.appMenu.action({ openModal, setActiveApp });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] isolate">
      <div className="flex items-end gap-2 px-3 pb-2 pt-2 bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl h-16">
        {DockApps.map((app) => {
          const isActive = activeApp?.id === app.id;

          return (
            <div
              key={app.id}
              className="group relative flex items-center justify-center cursor-default"
              style={{ width: "50px", height: "100%" }}
              onClick={() => handleAppClick(app)}
            >
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-md text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none border border-black/5 shadow-sm z-50">
                {app.appName}
              </span>

              <div className="flex items-center justify-center">
                <DockIcon
                  src={app.icon || ""}
                  name={app.appName}
                  isBouncing={bouncingApp === app.id}
                />
              </div>

              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    isActive ? "bg-black/60 dark:bg-white/80 scale-100" : "bg-transparent scale-0"
                  }`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}