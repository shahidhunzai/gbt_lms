import { useState } from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Plus, Minus } from 'lucide-react';

function NavItemRenderer({ item, depth = 0 }: { item: NavItem; depth?: number }) {
    const page = usePage();
    const hasSubItems = item.items && item.items.length > 0;
    const [open, setOpen] = useState(false);

    if (!hasSubItems) {
        // Leaf item: render a simple link
        if (depth > 0) {
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
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.url === page.url}>
                    <Link href={item.url} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }

    // Item with sub-items: use collapsible
    if (depth === 0) {
        // Top-level collapsible item
        return (
            <Collapsible key={item.title} open={open} onOpenChange={setOpen} asChild>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild isActive={item.url === page.url}>
                            <Link href={item.url} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
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
                                        <SubItemRecursive item={subItem} />
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

    // Deeper nested item with sub-items (depth > 0)
    return (
        <Collapsible key={item.title} open={open} onOpenChange={setOpen} asChild>
            <SidebarMenuSubItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuSubButton asChild isActive={item.url === page.url}>
                        <Link href={item.url} prefetch>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuSubButton>
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
                                    <SubItemRecursive item={subItem} depth={depth + 1} />
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
            </SidebarMenuSubItem>
        </Collapsible>
    );
}

function SubItemRecursive({ item, depth = 1 }: { item: NavItem; depth?: number }) {
    const page = usePage();
    const hasSubItems = item.items && item.items.length > 0;
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
                    <SidebarMenuSubButton asChild isActive={item.url === page.url}>
                        <Link href={item.url} prefetch>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuSubButton>
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
                                {subItem.items && subItem.items.length > 0 ? (
                                    <SubItemRecursive item={subItem} depth={depth + 1} />
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
            </SidebarMenuSubItem>
        </Collapsible>
    );
}

export function NavMain({ items = [], label = 'Platform' }: { items: NavItem[]; label?: string }) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <NavItemRenderer key={item.title} item={item} depth={0} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

