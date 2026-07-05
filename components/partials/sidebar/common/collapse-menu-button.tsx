"use client";
import React, { CSSProperties } from 'react'
import { Link, usePathname } from "@/components/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { GripVertical } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { Submenu } from "@/lib/menus"

// for dnd 

import {
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useConfig } from '@/hooks/use-config';
import { MultiCollapseMenuButton } from './classic-multi-collapse-button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useMobileMenuConfig } from '@/hooks/use-mobile-menu';
import { useMenuHoverConfig } from '@/hooks/use-menu-hover';


interface CollapseMenuButtonProps {
    icon: string;
    label: string;
    active: boolean;
    submenus: Submenu[];
    collapsed: boolean | undefined;
    id: string

}

export function CollapseMenuButton({
    icon,
    label,
    active,
    submenus,
    collapsed,
    id,

}: CollapseMenuButtonProps) {
    const pathname = usePathname();
    const isSubmenuActive = (submenus || []).some((submenu) => submenu?.active || pathname.startsWith(submenu?.href || ''));
    const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
    const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig()
    const [config] = useConfig();
    const [hoverConfig] = useMenuHoverConfig();
    const { hovered } = hoverConfig;
    const isDesktop = useMediaQuery("(min-width: 1280px)");
    const { transform, transition, setNodeRef, isDragging, attributes, listeners } = useSortable({
        id: id,

    })

    React.useEffect(() => {
        setIsCollapsed(isSubmenuActive);
    }, [isSubmenuActive, pathname]);


    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: "relative",
    };

    if (config.sidebar === 'compact' && isDesktop) {
        return (
            <Collapsible
                open={isCollapsed}
                onOpenChange={setIsCollapsed}
            >
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        fullWidth
                        color="secondary"
                        className={cn(
                          "hover:ring-transparent hover:ring-offset-0 flex-col h-auto py-2 px-2 capitalize font-semibold rounded-xl transition-all duration-200 ease-in-out group",
                          {
                            "bg-[#ff793b]/10 text-[#ff793b] font-bold hover:bg-[#ff793b]/12": active,
                            "text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200 hover:bg-default-100/60 dark:hover:bg-default-800/40": !active
                          }
                        )}
                    >
                        <Icon icon={icon} className={cn('h-5 w-5 mb-1 group-hover:scale-105 transition-transform duration-200', {
                            "text-[#ff793b]": active,
                            "text-default-500 dark:text-default-400": !active
                        })} />
                        <p className="max-w-[200px] text-[10px] truncate">{label}</p>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="flex flex-col gap-1 mt-1">
                        {(submenus || []).map(({ href, label, icon: subIcon, active }, index) => (
                            <Button
                                key={index}
                                color='secondary'
                                variant="ghost"
                                fullWidth
                                size='sm'
                                className={cn('w-full justify-start py-1.5 px-2 hover:bg-default-100/50 dark:hover:bg-default-800/40 rounded-xl capitalize text-xs font-normal transition-all duration-200 relative group/subc', {
                                    'text-[#ff793b] font-semibold bg-[#ff793b]/5 dark:bg-[#ff793b]/10': active,
                                    'text-default-600 dark:text-default-400': !active
                                })}
                                asChild
                            >
                                <Link href={href} className="flex items-center gap-2 w-full justify-center">
                                    {subIcon && (
                                        <Icon icon={subIcon} className={cn("h-3.5 w-3.5", {
                                            "text-[#ff793b]": active,
                                            "text-default-500 dark:text-default-400": !active
                                        })} />
                                    )}
                                    <span className="truncate">{label}</span>
                                </Link>
                            </Button>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        )
    }

    return !collapsed || hovered ? (
        <Collapsible
            open={isCollapsed}
            onOpenChange={setIsCollapsed}
        >
            <CollapsibleTrigger asChild>
                <div className='peer flex items-center group [&[data-state=open]>button>div>div>svg]:rotate-180' >
                    <Button
                        style={style}
                        ref={setNodeRef}
                        variant="ghost"
                        color='secondary'
                        className={cn('justify-start capitalize group rounded-xl h-auto py-2.5 px-3 ring-offset-sidebar transition-all duration-200 ease-in-out relative hover:ring-transparent', {
                            'bg-[#ff793b]/10 text-[#ff793b] dark:bg-[#ff793b]/20 font-semibold hover:bg-[#ff793b]/12 before:absolute before:inset-y-2.5 ltr:before:left-0 rtl:before:right-0 before:w-[3.5px] before:rounded-e-md rtl:before:rounded-s-md rtl:before:rounded-e-none before:bg-[#ff793b]': isSubmenuActive,
                            'text-default-600 dark:text-default-400 hover:text-default-900 dark:hover:text-default-200 hover:bg-default-100/60 dark:hover:bg-default-800/40 ltr:hover:translate-x-1.5 rtl:hover:-translate-x-1.5': !isSubmenuActive,
                            'group-data-[state=open]:bg-default-100/50 dark:group-data-[state=open]:bg-default-800/30': !isSubmenuActive,
                        })}
                        fullWidth
                    >
                        <div className="w-full items-center flex justify-between">
                            <div className="flex items-center">
                                {config.sidebar === 'draggable' && isDesktop && (
                                    <GripVertical
                                        {...attributes} 
                                        {...listeners} 
                                        className="inset-t-0 absolute me-1 h-5 w-5 ltr:-translate-x-6 rtl:translate-x-6 invisible opacity-0 group-hover:opacity-100 transition-all group-hover:visible group-hover:ltr:-translate-x-5 group-hover:rtl:translate-x-5" 
                                    />
                                )}
                                <span className="me-3 transition-transform duration-200 group-hover:scale-105">
                                    <Icon icon={icon} className={cn("h-5 w-5", {
                                        "text-[#ff793b]": isSubmenuActive,
                                        "text-default-500 dark:text-default-400": !isSubmenuActive
                                    })} />
                                </span>
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
                    {(submenus || []).map(({ href, label, icon: subIcon, active, children: subChildren }, index) => (
                        (!subChildren || subChildren.length === 0) ? (
                            <Button
                                onClick={() => setMobileMenuConfig({ ...mobileMenuConfig, isOpen: false })}
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
                        ) : (
                            <React.Fragment key={index}>
                                <MultiCollapseMenuButton
                                    label={label}
                                    active={active}
                                    submenus={subChildren as any}
                                />
                            </React.Fragment>
                        )
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    ) : (
        <DropdownMenu >
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={active ? "default" : "ghost"}
                                color='secondary'
                                className="w-full justify-center rounded-xl"
                                size="icon"
                            >
                                <Icon icon={icon} className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="start" alignOffset={2}>
                        {label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent side="right" sideOffset={20} align="start" className="border-sidebar space-y-1.5 rounded-xl p-1.5 bg-sidebar shadow-md border border-default-200/50 dark:border-default-800/40" >
                <DropdownMenuLabel className="max-w-[190px] truncate font-semibold text-xs text-default-400 uppercase tracking-wider px-2 py-1.5">
                    {label}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-default-200/50 dark:bg-default-800/40 my-1' />
                <DropdownMenuGroup className="space-y-1">
                    {(submenus || []).map(({ href, label, icon: subIcon, active, children }, index) => (
                        (!children || children.length === 0) ? (
                            <DropdownMenuItem key={index} asChild className={cn('focus:bg-default-100/60 dark:focus:bg-default-800/40 rounded-lg cursor-pointer px-2 py-1.5 transition-colors duration-150', {
                                'bg-[#ff793b]/10 text-[#ff793b] focus:bg-[#ff793b]/15': active,
                                'text-default-700 dark:text-default-300': !active
                            })}>
                                <Link className="cursor-pointer flex items-center gap-3 w-full" href={href}>
                                    {subIcon && (
                                        <Icon icon={subIcon} className='h-4 w-4' />
                                    )}
                                    <p className="max-w-[180px] truncate">{label}</p>
                                </Link>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuSub key={index}>
                                <DropdownMenuSubTrigger className="rounded-lg px-2 py-1.5 text-default-700 dark:text-default-300">
                                    <span>{label}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="rounded-xl p-1.5 bg-sidebar shadow-md border border-default-200/50 dark:border-default-800/40">
                                        <ScrollArea className='h-[200px]'>
                                            {children?.map(({ href, label, active }, index) => (
                                                <DropdownMenuItem key={`nested-index-${index}`} asChild className={cn('focus:bg-default-100/60 dark:focus:bg-default-800/40 rounded-lg cursor-pointer px-2 py-1.5 transition-colors duration-150', {
                                                    'bg-[#ff793b]/10 text-[#ff793b]': active,
                                                    'text-default-700 dark:text-default-300': !active
                                                })}>
                                                    <Link href={href} className="w-full">{label}</Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </ScrollArea>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        )
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
