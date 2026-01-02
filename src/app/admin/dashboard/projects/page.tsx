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
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Loader2, X } from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ViewImageDialog } from "@/components/admin/ViewImageDialog";
import { ReadMoreDialog } from "@/components/admin/ReadMoreDialog";
import { Project, ProjectLayoutType, R2_FOLDERS } from "@/lib/db-types";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<{
    index: number;
    layoutType: ProjectLayoutType;
    titleImageUrl: string;
    partnerLogos: string[];
    description: string;
    galleryImages: string[];
    mainImageUrl: string;
    isActive: boolean;
  }>({
    index: 0,
    layoutType: "anns",
    titleImageUrl: "",
    partnerLogos: [],
    description: "",
    galleryImages: [],
    mainImageUrl: "",
    isActive: true,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/data/projects?activeOnly=false");
      const data = await response.json();
      setItems(data.data || []);
    } catch {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDialog = (item?: Project) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        index: item.index,
        layoutType: item.layoutType,
        titleImageUrl: item.titleImageUrl,
        partnerLogos: item.partnerLogos || [],
        description: item.description,
        galleryImages: item.galleryImages || [],
        mainImageUrl: item.mainImageUrl || "",
        isActive: item.isActive ?? true, // Default to true if undefined (for old data)
      });
    } else {
      setSelectedItem(null);
      setFormData({
        index: items.length,
        layoutType: "anns",
        titleImageUrl: "",
        partnerLogos: [],
        description: "",
        galleryImages: [],
        mainImageUrl: "",
        isActive: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.titleImageUrl || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch("/api/data/projects", {
        method: selectedItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          selectedItem ? { id: selectedItem.id, ...formData } : formData
        ),
      });
      if (!response.ok)
        throw new Error((await response.json()).error || "Failed to save");
      toast.success(selectedItem ? "Project updated!" : "Project added!");
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setIsSaving(true);
    try {
      // Collect all image URLs for deletion
      const imageUrls = [
        selectedItem.titleImageUrl,
        ...(selectedItem.partnerLogos || []),
        ...(selectedItem.galleryImages || []),
      ].filter(Boolean);

      const response = await fetch(
        `/api/data/projects?id=${
          selectedItem.id
        }&imageUrls=${encodeURIComponent(JSON.stringify(imageUrls))}`,
        { method: "DELETE" }
      );
      if (!response.ok)
        throw new Error((await response.json()).error || "Failed to delete");
      toast.success("Project deleted!");
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete");
    } finally {
      setIsSaving(false);
    }
  };

  const addPartnerLogo = (url: string) => {
    if (url && !formData.partnerLogos.includes(url)) {
      setFormData({
        ...formData,
        partnerLogos: [...formData.partnerLogos, url],
      });
    }
  };

  const removePartnerLogo = (index: number) => {
    const newLogos = [...formData.partnerLogos];
    newLogos.splice(index, 1);
    setFormData({ ...formData, partnerLogos: newLogos });
  };

  const addGalleryImage = (url: string) => {
    if (url && !formData.galleryImages.includes(url)) {
      setFormData({
        ...formData,
        galleryImages: [...formData.galleryImages, url],
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = [...formData.galleryImages];
    newImages.splice(index, 1);
    setFormData({ ...formData, galleryImages: newImages });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-500 mt-1">
          Manage project slides for the homepage carousel.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
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
          Add Project
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Index</TableHead>
              <TableHead className="w-[100px]">Title Image</TableHead>
              <TableHead className="w-[100px]">Layout</TableHead>
              <TableHead>Description</TableHead>
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
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm
                    ? "No projects found"
                    : "No projects yet. Add your first project!"}
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.index}</TableCell>
                  <TableCell>
                    <ViewImageDialog
                      imageUrl={item.titleImageUrl}
                      title="Title Image"
                    />
                  </TableCell>
                  <TableCell className="capitalize">
                    {item.layoutType}
                  </TableCell>
                  <TableCell>
                    <ReadMoreDialog
                      text={item.description}
                      title="Project Description"
                      maxLength={100}
                    />
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setSelectedItem(item);
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {selectedItem
                ? "Update the project details below."
                : "Fill in the details to add a new project."}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="layoutType">Layout Type</Label>
                    <Select
                      value={formData.layoutType}
                      onValueChange={(v) =>
                        setFormData({
                          ...formData,
                          layoutType: v as ProjectLayoutType,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bislaf">BISLAF</SelectItem>
                        <SelectItem value="anns">Ann&apos;s Bakery</SelectItem>
                        <SelectItem value="dusdukduk">Dusdukduk</SelectItem>
                        <SelectItem value="iluminen">Iluminen</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Main Images */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
                  Main Images
                </h3>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold">
                      Title Image *
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Main title/logo image
                    </p>
                  </div>
                  <ImageUpload
                    value={formData.titleImageUrl}
                    onChange={(url) =>
                      setFormData({ ...formData, titleImageUrl: url })
                    }
                    folder={R2_FOLDERS.PROJECTS}
                  />
                </div>

                {/* Main Image - Only for BISLAF layout */}
                {formData.layoutType === "bislaf" && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-semibold">
                        Main Image (BISLAF Layout)
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        Large banner image for BISLAF project layout
                      </p>
                    </div>
                    <ImageUpload
                      value={formData.mainImageUrl}
                      onChange={(url) =>
                        setFormData({ ...formData, mainImageUrl: url })
                      }
                      folder={R2_FOLDERS.PROJECTS}
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-semibold"
                    >
                      Description *
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Project description (will be displayed on the website)
                    </p>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Enter project description..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="resize-none"
                  />
                </div>
              </div>

              {/* Additional Images */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
                  Additional Images
                </h3>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold">
                      Partner Logos
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload partner/sponsor logos (optional)
                    </p>
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex flex-wrap gap-3">
                      {formData.partnerLogos.map((url, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 bg-white border-2 border-gray-200 rounded-lg overflow-hidden group hover:border-[#D79C60] transition-colors"
                        >
                          <Image
                            src={url}
                            alt={`Partner ${index + 1}`}
                            fill
                            className="object-contain p-2"
                            sizes="80px"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                            onClick={() => removePartnerLogo(index)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <div className="flex-1 min-w-[120px]">
                        <ImageUpload
                          value=""
                          onChange={addPartnerLogo}
                          folder={R2_FOLDERS.PROJECTS}
                          mode="edit"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold">
                      Gallery Images *
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload project photos (3-4 images recommended)
                    </p>
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex flex-wrap gap-3">
                      {formData.galleryImages.map((url, index) => (
                        <div
                          key={index}
                          className="relative w-24 h-24 bg-white border-2 border-gray-200 rounded-lg overflow-hidden group hover:border-[#D79C60] transition-colors"
                        >
                          <Image
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                            onClick={() => removeGalleryImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <div className="flex-1 min-w-[120px]">
                        <ImageUpload
                          value=""
                          onChange={addGalleryImage}
                          folder={R2_FOLDERS.PROJECTS}
                          mode="edit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">
                  Settings
                </h3>
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
            </div>
          </ScrollArea>
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

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? All associated
              images will also be deleted. This action cannot be undone.
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
