"use client";

import { useState, useRef, useEffect } from "react";

export function useDraggable(isMobile: boolean) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [snapRegion, setSnapRegion] = useState<"none" | "left" | "right" | "full">("none");

    const dragStart = useRef({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent) => {
        if (isMobile || e.button !== 0) return;
        setIsDragging(true);

        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    useEffect(() => {
        if (isMobile || !isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const newX = e.clientX - dragStart.current.x;
            const newY = e.clientY - dragStart.current.y;

            setPosition({ x: newX, y: newY });

            const threshold = 15;
            if (e.clientY < 40) setSnapRegion("full");
            else if (e.clientX < threshold) setSnapRegion("left");
            else if (e.clientX > window.innerWidth - threshold) setSnapRegion("right");
            else setSnapRegion("none");
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isMobile]);

    return {
        position,
        setPosition,
        onMouseDown,
        snapRegion,
        setSnapRegion,
        isDragging,
        setIsDragging,
        dragStart,
    };
}