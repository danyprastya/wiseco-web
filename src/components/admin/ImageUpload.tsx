"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder: string;
  disabled?: boolean;
  className?: string;
  mode?: "add" | "edit"; // add = show full text, edit = show "Add more"
}

export function ImageUpload({
  value,
  onChange,
  folder,
  disabled,
  className,
  mode = "add",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        // If there's an existing image, include it for deletion
        if (value) {
          formData.append("oldUrl", value);
        }

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, value, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp", ".avif"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: disabled || isUploading,
  });

  const handleRemove = async () => {
    if (!value) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/upload?url=${encodeURIComponent(value)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Delete failed");
      }

      onChange("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative inline-block">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={value}
              alt="Uploaded"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemove}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <X className="h-3 w-3" />
            )}
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "w-full border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors",
            mode === "edit" ? "p-3" : "p-6",
            isDragActive
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400",
            (disabled || isUploading) && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                <span className="text-sm text-gray-500">Uploading...</span>
              </>
            ) : mode === "edit" ? (
              <>
                <Upload className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {isDragActive ? "Drop here" : "Add more"}
                </span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {isDragActive
                    ? "Drop the image here"
                    : "Click or drag image to upload"}
                </span>
                <span className="text-xs text-gray-400">
                  Max size: 10MB • JPG, PNG, GIF, WebP, AVIF
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
