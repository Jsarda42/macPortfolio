"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AppConfig } from "@/types/system";
import { ALL_APPS } from "@/data/registry";

interface OSContextType {
    installApp: (id: string) => void; // Added this
    uninstallApp: (id: string) => void; // Added this
    installedAppIds: string[]; // Added this
    activeApp: AppConfig | null;
    openAppIds: string[];
    setActiveApp: (app: AppConfig | null) => void;
    openApp: (appId: string) => void;
    closeApp: (appId: string) => void;
    wallpaper: string;
    setWallpaper: (style: string) => void;
    minimizedAppIds: string[];
    toggleMinimize: (appId: string) => void;
    closeAllMenus: () => void;
    handleBackgroundClick: () => void;
    launchingAppId: string | null;
    loadingAppIds: string[]; // Add this
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
    const [activeApp, setActiveApp] = useState<AppConfig | null>(null);
    const [openAppIds, setOpenAppIds] = useState<string[]>([]);
    const [wallpaper, setWallpaper] = useState("/wallpapers/futurama.webp");
    const [minimizedAppIds, setMinimizedAppIds] = useState<string[]>([]);
    const [launchingAppId, setLaunchingAppId] = useState<string | null>(null);
    const [installedAppIds, setInstalledAppIds] = useState<string[]>(["settings", "app-store"]);
const [loadingAppIds, setLoadingAppIds] = useState<string[]>([]); // New state

const installApp = (id: string) => {
        if (installedAppIds.includes(id) || loadingAppIds.includes(id)) return;

        // Start loading
        setLoadingAppIds((prev) => [...prev, id]);

        // Simulate download delay (e.g., 2 seconds)
        setTimeout(() => {
            setInstalledAppIds((prev) => [...prev, id]);
            setLoadingAppIds((prev) => prev.filter((loadingId) => loadingId !== id));
        }, 2000);
    };

    

    const uninstallApp = (id: string) => {
        setInstalledAppIds((prev) => prev.filter((appId) => appId !== id));
    };

    const closeAllMenus = () => {
        window.dispatchEvent(new CustomEvent("close-all-menus"));
    };

    const handleBackgroundClick = () => {
        window.dispatchEvent(new CustomEvent("close-all-menus"));
        setActiveApp(null);
        setMinimizedAppIds((prev) => {
            const newMinimized = new Set([...prev, ...openAppIds]);
            return Array.from(newMinimized);
        });
    };

    const openApp = (appId: string) => {
        const isAlreadyOpen = openAppIds.includes(appId);

        if (isAlreadyOpen) {
            setMinimizedAppIds((prev) => prev.filter(id => id !== appId));
            const app = ALL_APPS.find(a => a.id === appId);
            if (app) setActiveApp(app);
            window.dispatchEvent(new CustomEvent("close-all-menus"));
            return;
        }
        setLaunchingAppId(appId);

        setTimeout(() => {
            setOpenAppIds((prev) => {
                if (prev.includes(appId)) return prev;
                return [...prev, appId];
            });

            const app = ALL_APPS.find(a => a.id === appId);
            if (app) setActiveApp(app);
            setLaunchingAppId(null);
        }, 800);

        window.dispatchEvent(new CustomEvent("close-all-menus"));
    };

    const closeApp = (appId: string) => {
        setOpenAppIds((prev) => prev.filter((id) => id !== appId));
        setMinimizedAppIds((prev) => prev.filter((id) => id !== appId));
        if (activeApp?.id === appId) setActiveApp(null);
    };

    const toggleMinimize = (appId: string) => {
        const isMinimizing = !minimizedAppIds.includes(appId);

        setMinimizedAppIds(prev =>
            isMinimizing ? [...prev, appId] : prev.filter(id => id !== appId)
        );

        if (isMinimizing && activeApp?.id === appId) {
            setActiveApp(null);
        } else if (!isMinimizing) {
            const app = ALL_APPS.find(a => a.id === appId);
            if (app) setActiveApp(app);
        }
    };

    return (
        <OSContext.Provider value={{
            activeApp,
            openAppIds,
            setActiveApp,
            openApp,
            closeApp,
            wallpaper,
            setWallpaper,
            minimizedAppIds,
            toggleMinimize,
            closeAllMenus,
            handleBackgroundClick,
            launchingAppId,
            installedAppIds, // Include in value
            installApp,    // Include in value
            uninstallApp,  // Include in value
            loadingAppIds,
        }}>
            {children}
        </OSContext.Provider>
    );
}

export const useOS = () => {
    const context = useContext(OSContext);
    if (!context) throw new Error("useOS must be used within OSProvider");
    return context;
};