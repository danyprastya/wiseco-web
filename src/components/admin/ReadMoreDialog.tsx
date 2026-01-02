"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface ReadMoreDialogProps {
  text: string;
  title?: string;
  maxLength?: number;
}

export function ReadMoreDialog({
  text,
  title,
  maxLength = 100,
}: ReadMoreDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const truncatedText =
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  const needsReadMore = text.length > maxLength;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{truncatedText}</span>
      {needsReadMore && (
        <>
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="h-auto p-0 text-[#D79C60] hover:text-[#C08850]"
          >
            Read more
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {title || "Full Text"}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[500px] pr-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {text}
                </p>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
