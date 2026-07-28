import { useState } from 'react';
import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Plus, Minus } from 'lucide-react';

function FooterSubItemRenderer({ item }: { item: NavItem }) {
    const page = usePage();
    const hasSubItems = item.items && item.items.length > 0;
    const hasUrl = !!item.url;
    const [subOpen, setSubOpen] = useState(false);

    if (!hasSubItems) {
        return (
            <SidebarMenuSubButton asChild isActive={item.url === page.url}>
                <Link href={item.url} prefetch>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuSubButton>
        );
    }

    return (
        <Collapsible open={subOpen} onOpenChange={setSubOpen} asChild>
            <SidebarMenuSubItem>
                <CollapsibleTrigger asChild>
                    {hasUrl ? (
                        <SidebarMenuSubButton asChild isActive={item.url === page.url}>
                            <Link href={item.url} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuSubButton>
                    ) : (
                        <SidebarMenuSubButton className="cursor-pointer">
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </SidebarMenuSubButton>
                    )}
                </CollapsibleTrigger>
                <SidebarMenuAction
                    className="cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSubOpen(!subOpen);
                    }}
                >
                    {subOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </SidebarMenuAction>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items!.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={subItem.url === page.url}>
                                    <Link href={subItem.url} prefetch>
                                        {subItem.icon && <subItem.icon />}
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuSubItem>
        </Collapsible>
    );
}

function FooterNavItemRenderer({ item }: { item: NavItem }) {
    const page = usePage();
    const hasSubItems = item.items && item.items.length > 0;
    const hasUrl = !!item.url;
    const [open, setOpen] = useState(false);

    if (!hasSubItems) {
        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                    asChild
                    isActive={item.url === page.url}
                    className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                >
                    <Link href={item.url} prefetch>
                        {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }

    return (
        <Collapsible key={item.title} open={open} onOpenChange={setOpen} asChild>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    {hasUrl ? (
                        <SidebarMenuButton
                            asChild
                            isActive={item.url === page.url}
                            className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                        >
                            <Link href={item.url} prefetch>
                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    ) : (
                        <SidebarMenuButton className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100 cursor-pointer">
                            {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                    )}
                </CollapsibleTrigger>
                <SidebarMenuAction
                    className="cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpen(!open);
                    }}
                >
                    {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </SidebarMenuAction>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items!.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                {subItem.items && subItem.items.length > 0 ? (
                                    <FooterSubItemRenderer item={subItem} />
                                ) : (
                                    <SidebarMenuSubButton asChild isActive={subItem.url === page.url}>
                                        <Link href={subItem.url} prefetch>
                                            {subItem.icon && <subItem.icon />}
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                )}
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

export function NavFooter({
    items,
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <FooterNavItemRenderer key={item.title} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
