"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Move } from "lucide-react";

interface ImageCropDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onSave: (position: { x: number; y: number; scale: number }) => void;
  initialPosition?: { x: number; y: number; scale: number };
}

export function ImageCropDialog({
  isOpen,
  onClose,
  imageUrl,
  onSave,
  initialPosition = { x: 50, y: 50, scale: 1 },
}: ImageCropDialogProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset position when dialog opens with new image - use ref to track previous isOpen
  const prevIsOpenRef = useRef(isOpen);
  useEffect(() => {
    // Only reset if dialog just opened (was closed, now open)
    if (isOpen && !prevIsOpenRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosition(initialPosition);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, initialPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = ((e.clientX - dragStart.x) / containerRect.width) * 100;
      const deltaY = ((e.clientY - dragStart.y) / containerRect.height) * 100;

      setPosition((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(100, prev.x - deltaX)),
        y: Math.max(0, Math.min(100, prev.y - deltaY)),
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const deltaX = ((touch.clientX - dragStart.x) / containerRect.width) * 100;
    const deltaY = ((touch.clientY - dragStart.y) / containerRect.height) * 100;

    setPosition((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(100, prev.x - deltaX)),
      y: Math.max(0, Math.min(100, prev.y - deltaY)),
    }));

    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (value: number[]) => {
    setPosition((prev) => ({ ...prev, scale: value[0] }));
  };

  const handleSave = () => {
    onSave(position);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Move className="h-5 w-5" />
            Adjust Photo Position
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Container */}
          <div className="flex justify-center">
            <div
              ref={containerRef}
              className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-gray-300 cursor-move bg-gray-100"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="absolute w-full h-full"
                style={{
                  transform: `scale(${position.scale})`,
                  transformOrigin: `${position.x}% ${position.y}%`,
                }}
              >
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover pointer-events-none"
                  style={{
                    objectPosition: `${position.x}% ${position.y}%`,
                  }}
                  sizes="200px"
                  draggable={false}
                />
              </div>

              {/* Drag indicator overlay */}
              {isDragging && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Move className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <p className="text-sm text-center text-gray-500">
            Drag the image to adjust position
          </p>

          {/* Zoom Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <ZoomOut className="h-4 w-4" />
                Zoom
                <ZoomIn className="h-4 w-4" />
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(position.scale * 100)}%
              </span>
            </div>
            <Slider
              value={[position.scale]}
              onValueChange={handleZoomChange}
              min={1}
              max={2}
              step={0.05}
              className="w-full"
            />
          </div>

          {/* Position Info */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>X: {Math.round(position.x)}%</div>
            <div>Y: {Math.round(position.y)}%</div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#D79C60] hover:bg-[#c78d54]"
          >
            Save Position
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
