"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ViewImageDialog } from "@/components/admin/ViewImageDialog";
import { PortfolioLogo, R2_FOLDERS } from "@/lib/db-types";

export default function PortfolioLogosPage() {
  const [logos, setLogos] = useState<PortfolioLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<PortfolioLogo | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    index: 0,
    isActive: true,
  });

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "/api/data/portfolio-logos?activeOnly=false"
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log("Portfolio logos data:", data); // Debug log
      setLogos(data.data || []);
    } catch (error) {
      console.error("Failed to fetch portfolio logos:", error);
      toast.error("Failed to fetch data");
      setLogos([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter logos
  const filteredLogos = logos.filter((logo) =>
    logo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open dialog for create/edit
  const openDialog = (logo?: PortfolioLogo) => {
    if (logo) {
      setSelectedLogo(logo);
      setFormData({
        name: logo.name,
        imageUrl: logo.imageUrl,
        index: logo.index,
        isActive: logo.isActive,
      });
    } else {
      setSelectedLogo(null);
      setFormData({
        name: "",
        imageUrl: "",
        index: logos.length,
        isActive: true,
      });
    }
    setIsDialogOpen(true);
  };

  // Handle save
  const handleSave = async () => {
    if (!formData.name || !formData.imageUrl) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const url = "/api/data/portfolio-logos";
      const method = selectedLogo ? "PUT" : "POST";
      const body = selectedLogo
        ? { id: selectedLogo.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save");
      }

      toast.success(selectedLogo ? "Logo updated!" : "Logo created!");
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedLogo) return;

    setIsSaving(true);
    try {
      const response = await fetch(
        `/api/data/portfolio-logos?id=${
          selectedLogo.id
        }&imageUrl=${encodeURIComponent(selectedLogo.imageUrl)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete");
      }

      toast.success("Logo deleted!");
      setIsDeleteDialogOpen(false);
      setSelectedLogo(null);
      fetchData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Logos</h1>
        <p className="text-gray-500 mt-1">
          Manage client logos displayed in the portfolio marquee section.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search logos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => openDialog()}
          className="bg-[#D79C60] hover:bg-[#c78d54]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Logo
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Index</TableHead>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-12 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredLogos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm
                    ? "No logos found"
                    : "No logos yet. Add your first logo!"}
                </TableCell>
              </TableRow>
            ) : (
              filteredLogos.map((logo) => (
                <TableRow key={logo.id}>
                  <TableCell className="font-medium">{logo.index}</TableCell>
                  <TableCell>
                    <ViewImageDialog
                      imageUrl={logo.imageUrl}
                      title={logo.name}
                    />
                  </TableCell>
                  <TableCell>{logo.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        logo.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {logo.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(logo)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setSelectedLogo(logo);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedLogo ? "Edit Logo" : "Add New Logo"}
            </DialogTitle>
            <DialogDescription>
              {selectedLogo
                ? "Update the logo details below."
                : "Fill in the details to add a new logo."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Company name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Logo Image *</Label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder={R2_FOLDERS.PORTFOLIO_LOGOS}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="index">Display Order</Label>
              <Input
                id="index"
                type="number"
                min="0"
                value={formData.index}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    index: parseInt(e.target.value) || 0,
                  })
                }
              />
              <p className="text-xs text-gray-500">
                Lower numbers appear first in the marquee.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: !!checked })
                }
              />
              <Label htmlFor="isActive">Active (visible on website)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#D79C60] hover:bg-[#c78d54]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Logo</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{selectedLogo?.name}&quot;?
              This action cannot be undone and will also remove the image from
              storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isSaving}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
