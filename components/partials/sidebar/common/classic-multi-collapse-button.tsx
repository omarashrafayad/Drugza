"use client";
import React, { useEffect, useState } from 'react'
import { Link, usePathname } from "@/components/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import { SubChildren } from '@/lib/menus';
import { useMobileMenuConfig } from '@/hooks/use-mobile-menu';
import { Icon } from "@/components/ui/icon";

interface CollapseMenuButtonProps {
    icon?: string;
    label: string;
    active: boolean;
    submenus: SubChildren[]
}

export function MultiCollapseMenuButton({
    label,
    active,
    submenus = [],
}: CollapseMenuButtonProps) {
    const pathname = usePathname();
    const isSubmenuActive = (submenus || []).some((submenu) => submenu?.active || pathname.startsWith(submenu?.href || ''));
    const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
    const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();

    useEffect(() => {
        setIsCollapsed(isSubmenuActive);
    }, [isSubmenuActive]);

    return (
        <Collapsible
            open={isCollapsed}
            onOpenChange={setIsCollapsed}
            className="w-full mb-1.5 last:mb-0"
        >
            <CollapsibleTrigger asChild>
                <div className='flex items-center group [&[data-state=open]>button>div>div>svg]:rotate-180' >
                    <Button
                        color='secondary'
                        variant="ghost"
                        className={cn("w-full justify-start h-auto rounded-xl py-2 px-3 transition-all duration-200 relative group/multi hover:bg-default-100/40 dark:hover:bg-default-800/30", {
                            "text-[#ff793b] font-semibold": isSubmenuActive,
                            "text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200": !isSubmenuActive
                        })}
                        fullWidth
                    >
                        <div className="w-full items-center flex justify-between">
                            <div className="flex items-center">
                                <span
                                    className={cn(
                                        "h-1.5 w-1.5 me-2.5 rounded-full transition-all duration-200",
                                        {
                                            "bg-[#ff793b] scale-125 ring-2 ring-[#ff793b]/20": active,
                                            "bg-default-300 dark:bg-default-700 group-hover/multi:bg-default-400 dark:group-hover/multi:bg-default-500": !active
                                        }
                                    )}
                                ></span>
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
                <div className="ltr:border-l rtl:border-r border-default-200/60 dark:border-default-800/40 ltr:ml-[16px] rtl:mr-[16px] ltr:pl-3 rtl:pr-3 space-y-1 mt-1 pb-1">
                    {(submenus || []).map(({ href, label, icon: subIcon, active }, index) => (
                        <Button
                            key={index}
                            onClick={() => setMobileMenuConfig({ ...mobileMenuConfig, isOpen: false })}
                            color='secondary'
                            variant="ghost"
                            className={cn('w-full justify-start h-auto hover:bg-default-100/40 dark:hover:bg-default-800/30 rounded-xl capitalize text-xs font-normal py-1.5 px-2.5 transition-all duration-200 relative group/sub3', {
                                'bg-[#ff793b]/10 text-[#ff793b] dark:bg-[#ff793b]/20 font-semibold hover:bg-[#ff793b]/12 before:absolute before:inset-y-1.5 ltr:before:left-0 rtl:before:right-0 before:w-[3px] before:rounded-e-md rtl:before:rounded-s-md rtl:before:rounded-e-none before:bg-[#ff793b]': active,
                                'text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200': !active,
                            })}
                            asChild
                        >
                            <Link href={href}>
                                {subIcon ? (
                                    <span className="me-2 transition-transform duration-200 group-hover/sub3:scale-105">
                                        <Icon icon={subIcon} className={cn("h-3.5 w-3.5", {
                                            "text-[#ff793b]": active,
                                            "text-default-500 dark:text-default-400": !active
                                        })} />
                                    </span>
                                ) : (
                                    <span
                                        className={cn(
                                            "h-1 w-1 me-2 rounded-full transition-all duration-200",
                                            {
                                                "bg-[#ff793b] scale-125 ring-2 ring-[#ff793b]/20": active,
                                                "bg-default-300 dark:bg-default-700 group-hover/sub3:bg-[#default-400] dark:group-hover/sub3:bg-default-500": !active
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
