"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { MenuClassic } from './menu-classic';
import { MenuTwoColumn } from './menu-two-column';
import { MenuDragAble } from './menu-dragable';
import { useConfig } from "@/hooks/use-config";

export function Menu() {
    const [isReady, setIsReady] = useState(false);
    const [roleFromCookie, setRoleFromCookie] = useState<string | undefined>(undefined);
    const [config] = useConfig();

    useEffect(() => {
        // Fetch role from cookie directly
        const role = Cookies.get("userRole");
        if (role) {
            setRoleFromCookie(role);
            setIsReady(true);  // Once the role is fetched, set the state to ready
        } else {
            setIsReady(true);  // If no role, consider it ready
        }
    }, []); // Runs only once when component mounts

    // Loading state
    if (!isReady) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    // If the user is unauthenticated and no role is found, show message
    if (roleFromCookie === undefined) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <p className="text-gray-500">You are not logged in or no role found.</p>
            </div>
        );
    }

    // Render based on layout
    if (config.sidebar === 'draggable') return <MenuDragAble />;
    if (config.sidebar === 'two-column') return <MenuTwoColumn />;
    return <MenuClassic />;
}