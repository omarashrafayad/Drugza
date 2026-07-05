"use client";
import React, { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useConfig } from "@/hooks/use-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMobileMenuConfig } from "@/hooks/use-mobile-menu";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";

interface MenuItemProps {
  id: string;
  href: string;
  label: string;
  icon: string;
  active: boolean;
  collapsed: boolean;
}

const MenuItem = ({
  href,
  label,
  icon,
  active,
  id,
  collapsed,
}: MenuItemProps) => {
  const [config] = useConfig();
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();
  const {
    transform,
    transition,
    setNodeRef,
    isDragging,
    attributes,
    listeners,
  } = useSortable({
    id: id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  if (config.sidebar === "draggable" && isDesktop) {
    return (
      <Button
        ref={setNodeRef}
        style={style}
        variant="ghost"
        color="secondary"
        fullWidth
        className={cn(
          "justify-start capitalize group rounded-xl h-auto py-2.5 px-3 ring-offset-sidebar transition-all duration-200 ease-in-out relative hover:ring-transparent",
          {
            "bg-[#ff793b]/10 text-white font-semibold hover:bg-[#ff793b]/12 before:absolute before:inset-y-2.5 ltr:before:left-0 rtl:before:right-0 before:w-[3.5px] before:rounded-e-md rtl:before:rounded-s-md rtl:before:rounded-e-none before:bg-[#ff793b]": active,
            "text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200 hover:bg-default-100/60 dark:hover:bg-default-800/40 ltr:hover:translate-x-1.5 rtl:hover:-translate-x-1.5": !active,
          }
        )}
        asChild
        size={collapsed ? "icon" : "default"}
      >
        <Link
          href={href}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex items-center w-full"
        >
          {!collapsed && (
            <GripVertical
              {...attributes}
              {...listeners}
              className="inset-t-0 absolute me-1 h-5 w-5 ltr:-translate-x-6 rtl:translate-x-6 invisible opacity-0 group-hover:opacity-100 transition-all group-hover:visible group-hover:ltr:-translate-x-5 group-hover:rtl:translate-x-5"
            />
          )}
          <span className="me-3 transition-transform duration-200 group-hover:scale-105">
            <Icon
              icon={icon}
              className={cn("h-5 w-5", {
                "text-[#ff793b]": active,
                "text-default-500 dark:text-default-400": !active,
              })}
            />
          </span>
          {!collapsed && (
            <p className="max-w-[200px] truncate">{label}</p>
          )}
        </Link>
      </Button>
    );
  }

  if (config.sidebar === "compact" && isDesktop) {
    return (
      <Button
        variant="ghost"
        fullWidth
        color="secondary"
        className={cn(
          "hover:ring-transparent hover:ring-offset-0 flex-col h-auto py-2 px-2 capitalize font-semibold rounded-xl transition-all duration-200 ease-in-out group",
          {
            "bg-[#ff793b]/10 text-[#ff793b] font-bold hover:bg-[#ff793b]/12": active,
            "text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200 hover:bg-default-100/60 dark:hover:bg-default-800/40": !active,
          }
        )}
        asChild
      >
        <Link href={href}>
          <Icon
            icon={icon}
            className={cn("h-5 w-5 mb-1 group-hover:scale-105 transition-transform duration-200", {
              "text-[#ff793b]": active,
              "text-default-500 dark:text-default-400": !active,
            })}
          />
          <p className="max-w-[200px] text-[10px] truncate">{label}</p>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() =>
        setMobileMenuConfig({ ...mobileMenuConfig, isOpen: false })
      }
      variant="ghost"
      fullWidth
      color="secondary"
      className={cn(
        "justify-start capitalize group rounded-xl h-auto py-2.5 px-3 ring-offset-sidebar transition-all duration-200 ease-in-out relative hover:ring-transparent",
        {
          "bg-[#ff793b]/10 text-[#ff793b] font-semibold hover:bg-[#ff793b]/12 before:absolute before:inset-y-2.5 ltr:before:left-0 rtl:before:right-0 before:w-[3.5px] before:rounded-e-md rtl:before:rounded-s-md rtl:before:rounded-e-none before:bg-[#ff793b]": active,
          "text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200 hover:bg-default-100/60 dark:hover:bg-default-800/40 ltr:hover:translate-x-1.5 rtl:hover:-translate-x-1.5": !active,
        }
      )}
      asChild
      size={collapsed && !hovered ? "icon" : "default"}
    >
      <Link href={href} className="flex items-center w-full">
        <span className={cn({ "me-3 transition-transform duration-200 group-hover:scale-105": !collapsed || hovered })}>
          <Icon
            icon={icon}
            className={cn("h-5 w-5", {
              "text-[#ff793b]": active,
              "text-default-500 dark:text-default-400": !active,
            })}
          />
        </span>
        {(!collapsed || hovered) && (
          <p className="max-w-[200px] truncate">{label}</p>
        )}
      </Link>
    </Button>
  );
};

export default MenuItem;
