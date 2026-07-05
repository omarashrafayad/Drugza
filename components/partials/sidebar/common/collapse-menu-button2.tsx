"use client";
import React from 'react'
import { Link, usePathname } from "@/components/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Icon } from "@/components/ui/icon";
import { SubChildren } from '@/lib/menus';

interface CollapseMenuButtonProps {
    icon: string;
    label: string;
    active: boolean;
    submenus: SubChildren[]
}

export function CollapseMenuButton2({
    icon,
    label,
    active,
    submenus,
}: CollapseMenuButtonProps) {
    const pathname = usePathname();
    const isSubmenuActive = submenus.some((submenu) => submenu.active || pathname.startsWith(submenu.href));
    const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

    return (
        <Collapsible
            open={isCollapsed}
            onOpenChange={setIsCollapsed}
            className="w-full"
        >
            <CollapsibleTrigger asChild>
                <div className='flex items-center group [&[data-state=open]>button>div>div>svg]:rotate-180' >
                    <Button
                        variant="ghost"
                        color="secondary"
                        className={cn('justify-start capitalize group rounded-xl h-auto py-2.5 px-3 ring-offset-sidebar transition-all duration-200 ease-in-out relative hover:ring-transparent', {
                            'bg-[#ff793b]/10 text-[#ff793b] dark:bg-[#ff793b]/20 font-semibold hover:bg-[#ff793b]/12 before:absolute before:inset-y-2.5 ltr:before:left-0 rtl:before:right-0 before:w-[3.5px] before:rounded-e-md rtl:before:rounded-s-md rtl:before:rounded-e-none before:bg-[#ff793b]': isSubmenuActive,
                            'text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200 hover:bg-default-100/60 dark:hover:bg-default-800/40 ltr:hover:translate-x-1.5 rtl:hover:-translate-x-1.5': !isSubmenuActive,
                            'group-data-[state=open]:bg-default-100/50 dark:group-data-[state=open]:bg-default-800/30': !isSubmenuActive
                        })}
                        fullWidth
                    >
                        <div className="w-full items-center flex justify-between">
                            <div className="flex items-center">
                                {icon && (
                                    <span className="me-3 transition-transform duration-200 group-hover:scale-105">
                                        <Icon icon={icon} className={cn("h-5 w-5", {
                                            "text-[#ff793b]": isSubmenuActive,
                                            "text-default-500 dark:text-default-400": !isSubmenuActive
                                        })} />
                                    </span>
                                )}
                                <p className="max-w-[150px] truncate">
                                    {label}
                                </p>
                            </div>
                            <div className="whitespace-nowrap inline-flex items-center justify-center rounded-full h-5 w-5 bg-menu-arrow text-menu-menu-foreground group-hover:bg-menu-arrow-active transition-all duration-300">
                                <ChevronDown
                                    size={16}
                                    className="transition-transform duration-200"
                                />
                            </div>
                        </div>
                    </Button>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="ltr:border-l rtl:border-r border-default-200/60 dark:border-default-800/40 ltr:ml-[23px] rtl:mr-[23px] ltr:pl-3.5 rtl:pr-3.5 space-y-1 mt-1 pb-1">
                    {submenus.map(({ href, label, icon: subIcon, active }, index) => (
                        <Button
                            key={index}
                            color='secondary'
                            variant="ghost"
                            className={cn('w-full justify-start h-auto hover:bg-default-100/40 dark:hover:bg-default-800/30 rounded-xl capitalize text-sm font-normal py-2 px-3 transition-all duration-200 relative group/sub', {
                                'bg-[#ff793b]/10 text-[#ff793b] dark:bg-[#ff793b]/15 font-semibold hover:bg-[#ff793b]/12 before:absolute before:inset-y-2 ltr:before:left-0 rtl:before:right-0 before:w-[3px] before:rounded-e-md rtl:before:rounded-s-md rtl:before:rounded-e-none before:bg-[#ff793b]': active,
                                'text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200 ltr:hover:translate-x-1 rtl:hover:-translate-x-1': !active,
                            })}
                            asChild
                        >
                            <Link href={href}>
                                {subIcon ? (
                                    <span className="me-2.5 transition-transform duration-200 group-hover/sub:scale-105">
                                        <Icon icon={subIcon} className={cn("h-4 w-4", {
                                            "text-[#ff793b]": active,
                                            "text-default-500 dark:text-default-400": !active
                                        })} />
                                    </span>
                                ) : (
                                    <span
                                        className={cn(
                                            "h-1.5 w-1.5 me-2.5 rounded-full transition-all duration-200",
                                            {
                                                "bg-[#ff793b] scale-125 ring-2 ring-[#ff793b]/20": active,
                                                "bg-default-300 dark:bg-default-700 group-hover/sub:bg-default-400 dark:group-hover/sub:bg-default-500": !active
                                            }
                                        )}
                                    ></span>
                                )}
                                <p className="max-w-[170px] truncate">{label}</p>
                            </Link>
                        </Button>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}
