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
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Loader2, X, Move } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ViewImageDialog } from "@/components/admin/ViewImageDialog";
import { ReadMoreDialog } from "@/components/admin/ReadMoreDialog";
import { ImageCropDialog } from "@/components/admin/ImageCropDialog";
import { Testimonial, R2_FOLDERS, ImagePosition } from "@/lib/db-types";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Testimonial | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newBoldPhrase, setNewBoldPhrase] = useState("");
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  const [formData, setFormData] = useState<{
    index: number;
    ownerName: string;
    position: string;
    ownerImageUrl: string;
    ownerImagePosition: ImagePosition;
    companyLogoUrl: string;
    backgroundImageUrl: string;
    activityImageUrl: string;
    testimonialText: string;
    boldPhrases: string[];
    isActive: boolean;
  }>({
    index: 0,
    ownerName: "",
    position: "",
    ownerImageUrl: "",
    ownerImagePosition: { x: 50, y: 50, scale: 1 },
    companyLogoUrl: "",
    backgroundImageUrl: "",
    activityImageUrl: "",
    testimonialText: "",
    boldPhrases: [],
    isActive: true,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/data/testimonials?activeOnly=false");
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

  const filteredItems = items.filter(
    (item) =>
      item.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.testimonialText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDialog = (item?: Testimonial) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        index: item.index,
        ownerName: item.ownerName,
        position: item.position || "",
        ownerImageUrl: item.ownerImageUrl,
        ownerImagePosition: item.ownerImagePosition || {
          x: 50,
          y: 50,
          scale: 1,
        },
        companyLogoUrl: item.companyLogoUrl,
        backgroundImageUrl: item.backgroundImageUrl,
        activityImageUrl: item.activityImageUrl,
        testimonialText: item.testimonialText,
        boldPhrases: item.boldPhrases || [],
        isActive: item.isActive ?? true,
      });
    } else {
      setSelectedItem(null);
      setFormData({
        index: items.length,
        ownerName: "",
        position: "",
        ownerImageUrl: "",
        ownerImagePosition: { x: 50, y: 50, scale: 1 },
        companyLogoUrl: "",
        backgroundImageUrl: "",
        activityImageUrl: "",
        testimonialText: "",
        boldPhrases: [],
        isActive: true,
      });
    }
    setNewBoldPhrase("");
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (
      !formData.ownerName ||
      !formData.position ||
      !formData.ownerImageUrl ||
      !formData.companyLogoUrl ||
      !formData.backgroundImageUrl ||
      !formData.activityImageUrl ||
      !formData.testimonialText
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch("/api/data/testimonials", {
        method: selectedItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          selectedItem ? { id: selectedItem.id, ...formData } : formData
        ),
      });
      if (!response.ok)
        throw new Error((await response.json()).error || "Failed to save");
      toast.success(
        selectedItem ? "Testimonial updated!" : "Testimonial added!"
      );
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
      const imageUrls = [
        selectedItem.ownerImageUrl,
        selectedItem.companyLogoUrl,
        selectedItem.backgroundImageUrl,
        selectedItem.activityImageUrl,
      ].filter(Boolean);

      const response = await fetch(
        `/api/data/testimonials?id=${
          selectedItem.id
        }&imageUrls=${encodeURIComponent(JSON.stringify(imageUrls))}`,
        { method: "DELETE" }
      );
      if (!response.ok)
        throw new Error((await response.json()).error || "Failed to delete");
      toast.success("Testimonial deleted!");
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete");
    } finally {
      setIsSaving(false);
    }
  };

  const addBoldPhrase = () => {
    if (
      newBoldPhrase.trim() &&
      !formData.boldPhrases.includes(newBoldPhrase.trim())
    ) {
      setFormData({
        ...formData,
        boldPhrases: [...formData.boldPhrases, newBoldPhrase.trim()],
      });
      setNewBoldPhrase("");
    }
  };

  const removeBoldPhrase = (index: number) => {
    const newPhrases = [...formData.boldPhrases];
    newPhrases.splice(index, 1);
    setFormData({ ...formData, boldPhrases: newPhrases });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
        <p className="text-gray-500 mt-1">
          Manage client testimonials for the homepage.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search testimonials..."
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
          Add Testimonial
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Index</TableHead>
              <TableHead className="w-[80px]">Owner</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[80px]">Logo</TableHead>
              <TableHead className="max-w-xs">Testimonial</TableHead>
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
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded" />
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
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm
                    ? "No testimonials found"
                    : "No testimonials yet. Add your first testimonial!"}
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.index}</TableCell>
                  <TableCell>
                    <ViewImageDialog
                      imageUrl={item.ownerImageUrl}
                      title="Owner Image"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.ownerName}
                  </TableCell>
                  <TableCell>
                    <ViewImageDialog
                      imageUrl={item.companyLogoUrl}
                      title="Company Logo"
                    />
                  </TableCell>
                  <TableCell>
                    <ReadMoreDialog
                      text={item.testimonialText}
                      title="Testimonial Text"
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
              {selectedItem ? "Edit Testimonial" : "Add New Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {selectedItem
                ? "Update the testimonial details below."
                : "Fill in the details to add a new testimonial."}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6 py-4">
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
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input
                    id="ownerName"
                    placeholder="John Doe"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position / Job Title *</Label>
                  <Input
                    id="position"
                    placeholder="CEO and Co-founder"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Owner Image *</Label>
                  <ImageUpload
                    value={formData.ownerImageUrl}
                    onChange={(url) =>
                      setFormData({ ...formData, ownerImageUrl: url })
                    }
                    folder={R2_FOLDERS.TESTIMONIALS}
                  />
                  {formData.ownerImageUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => setIsCropDialogOpen(true)}
                    >
                      <Move className="h-4 w-4 mr-2" />
                      Adjust Photo Position
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Company Logo *</Label>
                  <ImageUpload
                    value={formData.companyLogoUrl}
                    onChange={(url) =>
                      setFormData({ ...formData, companyLogoUrl: url })
                    }
                    folder={R2_FOLDERS.TESTIMONIALS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Background Image *</Label>
                  <ImageUpload
                    value={formData.backgroundImageUrl}
                    onChange={(url) =>
                      setFormData({ ...formData, backgroundImageUrl: url })
                    }
                    folder={R2_FOLDERS.TESTIMONIALS}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Activity Image *</Label>
                  <ImageUpload
                    value={formData.activityImageUrl}
                    onChange={(url) =>
                      setFormData({ ...formData, activityImageUrl: url })
                    }
                    folder={R2_FOLDERS.TESTIMONIALS}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonialText">Testimonial Text *</Label>
                <Textarea
                  id="testimonialText"
                  placeholder="Write the testimonial..."
                  rows={4}
                  value={formData.testimonialText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      testimonialText: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Bold Phrases</Label>
                <p className="text-xs text-gray-500 mb-2">
                  Add phrases from the testimonial text that should be bold
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.boldPhrases.map((phrase, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {phrase}
                      <button
                        type="button"
                        onClick={() => removeBoldPhrase(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a phrase to bold..."
                    value={newBoldPhrase}
                    onChange={(e) => setNewBoldPhrase(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addBoldPhrase();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addBoldPhrase}
                  >
                    Add
                  </Button>
                </div>
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
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the testimonial from &quot;
              {selectedItem?.ownerName}&quot;? All associated images will also
              be deleted. This action cannot be undone.
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

      {/* Image Position Crop Dialog */}
      <ImageCropDialog
        isOpen={isCropDialogOpen}
        onClose={() => setIsCropDialogOpen(false)}
        imageUrl={formData.ownerImageUrl}
        initialPosition={formData.ownerImagePosition}
        onSave={(position) =>
          setFormData({ ...formData, ownerImagePosition: position })
        }
      />
    </div>
  );
}
