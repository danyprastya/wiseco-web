"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Image as ImageIcon,
  FolderKanban,
  MessageSquareQuote,
  Handshake,
  Newspaper,
  Briefcase,
  GalleryHorizontal,
  BookOpen,
  Images,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  portfolioLogos: number;
  projects: number;
  testimonials: number;
  strategicPartners: number;
  mediaReviews: number;
  wisevisoryServices: number;
  wisevisoryGallery: number;
  wisecubationModules: number;
  wisecubationGallery: number;
}

const statsConfig = [
  {
    key: "portfolioLogos",
    label: "Portfolio Logos",
    icon: ImageIcon,
    href: "/admin/dashboard/portfolio-logos",
    color: "bg-blue-500",
  },
  {
    key: "projects",
    label: "Projects",
    icon: FolderKanban,
    href: "/admin/dashboard/projects",
    color: "bg-green-500",
  },
  {
    key: "testimonials",
    label: "Testimonials",
    icon: MessageSquareQuote,
    href: "/admin/dashboard/testimonials",
    color: "bg-purple-500",
  },
  {
    key: "strategicPartners",
    label: "Strategic Partners",
    icon: Handshake,
    href: "/admin/dashboard/strategic-partners",
    color: "bg-orange-500",
  },
  {
    key: "mediaReviews",
    label: "Media Reviews",
    icon: Newspaper,
    href: "/admin/dashboard/media-reviews",
    color: "bg-pink-500",
  },
  {
    key: "wisevisoryServices",
    label: "Wisevisory Services",
    icon: Briefcase,
    href: "/admin/dashboard/wisevisory-services",
    color: "bg-cyan-500",
  },
  {
    key: "wisevisoryGallery",
    label: "Wisevisory Gallery",
    icon: GalleryHorizontal,
    href: "/admin/dashboard/wisevisory-gallery",
    color: "bg-teal-500",
  },
  {
    key: "wisecubationModules",
    label: "Wisecubation Modules",
    icon: BookOpen,
    href: "/admin/dashboard/wisecubation-modules",
    color: "bg-indigo-500",
  },
  {
    key: "wisecubationGallery",
    label: "Wisecubation Gallery",
    icon: Images,
    href: "/admin/dashboard/wisecubation-gallery",
    color: "bg-rose-500",
  },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all counts in parallel
        const [
          portfolioLogos,
          projects,
          testimonials,
          strategicPartners,
          mediaReviews,
          wisevisoryServices,
          wisevisoryGallery,
          wisecubationModules,
          wisecubationGallery,
        ] = await Promise.all([
          fetch("/api/data/portfolio-logos?activeOnly=false").then((r) =>
            r.json()
          ),
          fetch("/api/data/projects?activeOnly=false").then((r) => r.json()),
          fetch("/api/data/testimonials?activeOnly=false").then((r) =>
            r.json()
          ),
          fetch("/api/data/strategic-partners?activeOnly=false").then((r) =>
            r.json()
          ),
          fetch("/api/data/media-reviews?activeOnly=false").then((r) =>
            r.json()
          ),
          fetch("/api/data/wisevisory-services?activeOnly=false").then((r) =>
            r.json()
          ),
          fetch("/api/data/wisevisory-gallery?activeOnly=false").then((r) =>
            r.json()
          ),
          fetch("/api/data/wisecubation-modules?activeOnly=false").then((r) =>
            r.json()
          ),
          fetch("/api/data/wisecubation-gallery?activeOnly=false").then((r) =>
            r.json()
          ),
        ]);

        setStats({
          portfolioLogos: portfolioLogos.data?.length || 0,
          projects: projects.data?.length || 0,
          testimonials: testimonials.data?.length || 0,
          strategicPartners: strategicPartners.data?.length || 0,
          mediaReviews: mediaReviews.data?.length || 0,
          wisevisoryServices: wisevisoryServices.data?.length || 0,
          wisevisoryGallery: wisevisoryGallery.data?.length || 0,
          wisecubationModules: wisecubationModules.data?.length || 0,
          wisecubationGallery: wisecubationGallery.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome to Wiseco Admin Dashboard. Manage your website content here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsConfig.map((item) => {
          const Icon = item.icon;
          const count = stats?.[item.key as keyof DashboardStats] ?? 0;

          return (
            <Link key={item.key} href={item.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {item.label}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                  ) : (
                    <div className="text-3xl font-bold text-gray-900">
                      {count}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Total items</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
          <CardDescription>
            Get started with managing your website content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D79C60] text-white text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium">Add Content</h4>
                <p className="text-sm text-gray-500">
                  Use the sidebar navigation to add and manage content for each
                  section of your website.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D79C60] text-white text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium">Upload Images</h4>
                <p className="text-sm text-gray-500">
                  Images are automatically uploaded to Cloudflare R2 and linked
                  to Firebase records.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
