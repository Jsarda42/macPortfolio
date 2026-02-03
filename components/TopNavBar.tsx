"use client";

import AppleIcon from "@mui/icons-material/Apple";
import { useState, useRef, useEffect } from "react";
import { useMenu } from "@/context/MenuContext";
import { Dropdown } from "./menubar/MenuDropdown";
import { AppleApp } from "@/data/apps/apple/index";

export default function TopNavBar() {
  const { activeApp, openModal, setActiveApp, closeActiveApp } = useMenu();

  // dropdown states
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false);
  const [isAppleDropdownOpen, setIsAppleDropdownOpen] = useState(false);

  // refs for click outside
  const appRef = useRef<HTMLDivElement>(null);
  const appleRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (appRef.current && !appRef.current.contains(event.target as Node)) {
        setIsAppDropdownOpen(false);
      }
      if (appleRef.current && !appleRef.current.contains(event.target as Node)) {
        setIsAppleDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // helpers to pass to menu actions
  const helpers = { openModal, setActiveApp, closeActiveApp };

  return (
    <nav className="fixed top-0 z-50 flex h-8 w-full items-center gap-3 bg-white/70 px-4 text-sm backdrop-blur-md dark:bg-black/60">
      
      {/* 🍎 Apple menu — always present */}
      <div
        ref={appleRef}
        className="flex items-center gap-1 px-1.5 py-0.5 cursor-pointer relative"
        onClick={() => setIsAppleDropdownOpen(!isAppleDropdownOpen)}
      >
        <AppleIcon fontSize="small" />

        {isAppleDropdownOpen && (
          <Dropdown menu={AppleApp.appMenu} helpers={helpers} />
        )}
      </div>

      {/* 🧩 Active App Name */}
      <div
        ref={appRef}
        className="px-1.5 py-0.5 font-semibold cursor-pointer relative"
        onClick={() => setIsAppDropdownOpen(!isAppDropdownOpen)}
      >
        {activeApp.appName}

        {isAppDropdownOpen && (
          <Dropdown menu={activeApp.appMenu} helpers={helpers} />
        )}
      </div>

      {/* 📂 Active App Menus */}
      {activeApp.menus.map((menu) => (
        <div key={menu.id} className="px-1.5 py-0.5 cursor-default">
          {menu.label}
        </div>
      ))}
    </nav>
  );
}
