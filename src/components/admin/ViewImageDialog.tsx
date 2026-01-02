"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ViewImageDialogProps {
  imageUrl: string;
  title?: string;
}

export function ViewImageDialog({ imageUrl, title }: ViewImageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Eye className="h-4 w-4" />
        View Image
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{title || "Image Preview"}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={title || "Preview"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
