"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { WallpaperTab } from "./WallpaperTab";
import { WindowFrame } from "../windowFrame";
import { useDraggable } from "../windowFrame/useDraggable";
import { useMenu } from "@/context/MenuContext";
import { AppleApp } from "@/data/apps/apple";
import { FinderApp } from "@/data/apps/finder";

export default function SystemSettingsModal({ onClose }: { onClose: () => void }) {
    const [activeTab, setActiveTab] = useState("Wallpaper");
    const { setActiveApp } = useMenu();

    useEffect(() => {
        setActiveApp({
            ...AppleApp,
            appName: "System Settings"
        });

        return () => {
            setActiveApp(FinderApp);
        };
    }, [setActiveApp]);

    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") return window.innerWidth < 1024;
        return false;
    });

    const [isSnapped, setIsSnapped] = useState<"none" | "left" | "right" | "full">("none");
    const windowRef = useRef<HTMLDivElement>(null);
    const clickStartPos = useRef({ x: 0, y: 0 });

    const {
        position,
        setPosition,
        onMouseDown,
        snapRegion,
        setSnapRegion,
        isDragging,
        setIsDragging,
        dragStart
    } = useDraggable(isMobile);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
                setPosition({ x: 0, y: 30 });
            }
        };

        checkMobile();

        if (window.innerWidth >= 1024) {
            setPosition({
                x: window.innerWidth / 2 - 350,
                y: Math.max(30, window.innerHeight / 2 - 250)
            });
        }

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [setPosition]);

    useEffect(() => {
        if (isMobile || !isDragging || isSnapped === "none") return;

        const handleMoveWhileSnapped = (e: MouseEvent) => {
            const moveThreshold = 5;
            const deltaX = Math.abs(e.clientX - clickStartPos.current.x);
            const deltaY = Math.abs(e.clientY - clickStartPos.current.y);

            if (deltaX > moveThreshold || deltaY > moveThreshold) {
                if (windowRef.current) {
                    const rect = windowRef.current.getBoundingClientRect();
                    setPosition({ x: rect.left, y: rect.top });
                    setIsSnapped("none");

                    dragStart.current = {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                    };
                }
            }
        };

        window.addEventListener("mousemove", handleMoveWhileSnapped);
        return () => window.removeEventListener("mousemove", handleMoveWhileSnapped);
    }, [isDragging, isSnapped, isMobile, setPosition, dragStart]);

    useEffect(() => {
        if (!isDragging && snapRegion !== "none") {
            setIsSnapped(snapRegion);
            setSnapRegion("none");
        }
    }, [isDragging, snapRegion, setSnapRegion]);

    const handleStartDrag = (e: React.MouseEvent) => {
        if (isMobile) return;
        clickStartPos.current = { x: e.clientX, y: e.clientY };
        onMouseDown(e);
    };

    const windowStyles = useMemo(() => {
        const shouldTransition = !isMobile && !isDragging;
        const transitionClass = shouldTransition ? "transition-all duration-300 ease-out" : "transition-none";

        const common = `absolute shadow-2xl overflow-hidden flex flex-col pointer-events-auto ${transitionClass}`;
        const dragEffect = isDragging ? "scale-[0.99] opacity-95" : "scale-100 opacity-100";
        const rounding = isMobile ? "rounded-none" : "rounded-xl";

        if (isMobile) {
            return `top-[30px] left-0 w-full h-[calc(100vh-30px)] ${rounding} ${common}`;
        }

        switch (isSnapped) {
            case "full":
                return `left-0 top-[30px] w-full h-[calc(100vh-30px)] ${rounding} ${common} ${dragEffect}`;
            case "left":
                return `left-0 top-[30px] w-1/2 h-[calc(100vh-30px)] ${rounding} ${common} ${dragEffect}`;
            case "right":
                return `right-0 top-[30px] w-1/2 h-[calc(100vh-30px)] ${rounding} ${common} ${dragEffect}`;
            default:
                return `left-0 top-0 rounded-xl ${common} ${dragEffect}`;
        }
    }, [isMobile, isSnapped, isDragging]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {!isMobile && isDragging && snapRegion !== "none" && (
                <div className={`fixed z-40 bg-[#007AFF]/20 border-2 border-[#007AFF]/50 backdrop-blur-sm transition-all duration-200 pointer-events-none
                    ${snapRegion === "full" ? "top-7.5 inset-x-0 bottom-0" : ""}
                    ${snapRegion === "left" ? "left-0 top-7.5 bottom-0 w-1/2" : ""}
                    ${snapRegion === "right" ? "right-0 top-7.5 bottom-0 w-1/2" : ""}
                `} />
            )}

            <div
                ref={windowRef}
                className={windowStyles}
                style={{
                    transform: isSnapped === "none" && !isMobile
                        ? `translate3d(${position.x}px, ${position.y}px, 0)`
                        : "translate3d(0,0,0)",
                    width: isSnapped === "none" && !isMobile ? "750px" : undefined,
                    height: isSnapped === "none" && !isMobile ? "550px" : undefined,
                    left: isSnapped === "right" ? "auto" : (isSnapped !== "none" ? "0" : undefined),
                }}
            >
                <WindowFrame
                    title={activeTab}
                    onClose={onClose}
                    isMobile={isMobile}
                    isDragging={isDragging}
                    onMouseDown={handleStartDrag}
                    styles="w-full h-full border-none shadow-none"
                    sidebar={<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}
                >
                    {activeTab === "Wallpaper" ? (
                        <WallpaperTab />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-500 bg-white/50 dark:bg-black/20">
                            <p className="text-lg font-semibold">{activeTab}</p>
                            <p className="text-sm">Setting coming soon...</p>
                        </div>
                    )}
                </WindowFrame>
            </div>
        </div>
    );
}