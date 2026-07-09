"use client";
import React from "react";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

const HeaderContent = ({ children }: { children: React.ReactNode }) => {
  const [config] = useConfig();
  const transitionClass = "transition-all duration-300 ease-in-out";

  const getMarginClass = () => {
    if (config.layout === "horizontal" || config.menuHidden) return "ms-0";
    if (config.sidebar === "two-column") return config.subMenu || !config.hasSubMenu ? "xl:ms-[72px]" : "xl:ms-[300px]";
    if (config.collapsed) return "xl:ms-[72px]";
    if (config.sidebar === "compact") return "xl:ms-28";
    return "xl:ms-[248px] ms-0"; 
  };

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-[999] pointer-events-none overflow-visible", 
        config.navbar, 
        transitionClass, 
        { "has-sticky-header sticky top-6 px-6": config.navbar === "floating" }
      )}
    >
      <div 
        className={cn(
          "bg-header backdrop-blur-lg md:px-6 px-[15px] py-3 flex items-center justify-between relative pointer-events-auto overflow-visible",
          transitionClass, 
          getMarginClass(),
          {
            "border-b": config.skin === "bordered" && config.layout !== "semi-box",
            "shadow-base": config.skin === "default",
            "rounded-md": config.navbar === "floating",
          }
        )}
      >
        <div className="flex items-center justify-between w-full relative overflow-visible">
          {children}
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;