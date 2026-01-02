"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Image as ImageIcon,
  FolderKanban,
  MessageSquareQuote,
  Handshake,
  Briefcase,
  BookOpen,
  LogOut,
  Menu,
  ChevronDown,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";

interface AdminUser {
  userId: string;
  email: string;
  name: string;
  role: string;
}

// Menu items for the sidebar
const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Portfolio Logos",
    icon: ImageIcon,
    href: "/admin/dashboard/portfolio-logos",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/admin/dashboard/projects",
  },
  {
    title: "Testimonials",
    icon: MessageSquareQuote,
    href: "/admin/dashboard/testimonials",
  },
  {
    title: "Partners",
    icon: Handshake,
    items: [
      {
        title: "Strategic Partners",
        href: "/admin/dashboard/strategic-partners",
      },
      {
        title: "Media Reviews",
        href: "/admin/dashboard/media-reviews",
      },
    ],
  },
  {
    title: "Wisevisory",
    icon: Briefcase,
    items: [
      {
        title: "Services",
        href: "/admin/dashboard/wisevisory-services",
      },
      {
        title: "Gallery",
        href: "/admin/dashboard/wisevisory-gallery",
      },
    ],
  },
  {
    title: "Wisecubation",
    icon: BookOpen,
    items: [
      {
        title: "Modules",
        href: "/admin/dashboard/wisecubation-modules",
      },
      {
        title: "Gallery",
        href: "/admin/dashboard/wisecubation-gallery",
      },
    ],
  },
];

function DashboardSidebar({ user }: { user: AdminUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="relative w-[120px] h-[40px]">
            <Image
              src="/images/Logo wise.png"
              alt="Wiseco"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                // If item has sub-items
                if (item.items) {
                  const isActive = item.items.some((sub) =>
                    pathname.startsWith(sub.href)
                  );
                  return (
                    <Collapsible
                      key={item.title}
                      defaultOpen={isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((sub) => (
                              <SidebarMenuSubItem key={sub.href}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === sub.href}
                                >
                                  <Link
                                    href={sub.href}
                                    onClick={() => setOpenMobile(false)}
                                  >
                                    {sub.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // Single item without sub-items
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link
                        href={item.href!}
                        onClick={() => setOpenMobile(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D79C60] text-white">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">{user?.name || "Admin"}</span>
                <span className="text-xs text-gray-500">
                  {user?.email || "Loading..."}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem disabled>
              <span className="text-xs text-gray-500">
                Role: {user?.role || "admin"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-[150px] h-[50px]">
            <Image
              src="/images/Logo wise.png"
              alt="Wiseco"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar user={user} />
        <main className="flex-1 bg-gray-50">
          {/* Mobile Header */}
          <div className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-white px-4 lg:hidden">
            <SidebarTrigger>
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <div className="relative w-[100px] h-[30px]">
              <Image
                src="/images/Logo wise.png"
                alt="Wiseco"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </SidebarProvider>
  );
}
