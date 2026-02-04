"use client";

import AppleIcon from "@mui/icons-material/Apple";
import { useState, useRef, useEffect } from "react";
import { useMenu } from "@/context/MenuContext";
import { Dropdown } from "./menubar/MenuDropdown";
import { AppleApp } from "@/data/apps/apple/index";

export default function TopNavBar() {
  const { activeApp } = useMenu();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (id: string) => {
        console.log(activeApp)
    setOpenMenuId(openMenuId === id ? null : id);
  };
  return (
    <nav 
      ref={navRef}
      className="fixed top-0 z-9999 flex h-7.5 w-full items-center px-2 text-[13px] backdrop-blur-md bg-white/70 dark:bg-black/60 select-none shadow-sm border-b border-black/5 dark:border-white/5"
    >
      
      {/* 🍎 Apple Menu */}
      <div className="relative">
        <div
          className={`px-2.5 py-0.5 rounded-sm cursor-default transition-colors ${
            openMenuId === "apple" ? "bg-[#007AFF] text-white" : "hover:bg-black/10 dark:hover:bg-white/10"
          }`}
          onClick={() => handleToggle("apple")}
        >
          <AppleIcon sx={{ fontSize: 18 }} />
        </div>
        {openMenuId === "apple" && (
          <Dropdown menu={AppleApp.appMenu} onClose={() => setOpenMenuId(null)} />
        )}
      </div>

      {/* 🧩 Active App Name (Bold) */}
      <div className="relative">
        <div
          className={`px-3 py-0.5 rounded-sm cursor-default transition-colors font-bold ${
            openMenuId === "app-main" ? "bg-[#007AFF] text-white" : "hover:bg-black/10 dark:hover:bg-white/10"
          }`}
          onClick={() => handleToggle("app-main")}
        >
          {activeApp.appName}
        </div>
        {openMenuId === "app-main" && (
          <Dropdown menu={activeApp.appMenu} onClose={() => setOpenMenuId(null)} />
        )}
      </div>

      {/* 📂 Active App Dynamic Menus (File, Edit, etc.) */}
      <div className="flex items-center gap-0.5">
        {activeApp.menus.map((menu) => (
          <div key={menu.id} className="relative">
            <div
              className={`px-3 py-0.5 rounded-sm cursor-default transition-colors ${
                openMenuId === menu.id ? "bg-[#007AFF] text-white" : "hover:bg-black/10 dark:hover:bg-white/10"
              }`}
              onClick={() => handleToggle(menu.id)}
            >
              {menu.label}
            </div>
            {openMenuId === menu.id && (
              <Dropdown menu={menu} onClose={() => setOpenMenuId(null)} />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}