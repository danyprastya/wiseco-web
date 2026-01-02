"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { ImageIcon } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}

// Helper to convert R2 URL to proxy URL if needed
function getProxiedUrl(url: string): string {
  // If it's an R2 URL, use our proxy to avoid SSL issues
  if (url && url.includes("r2.dev")) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export default function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useProxy, setUseProxy] = useState(false);

  // Memoize the URL to prevent re-renders
  const imageUrl = useMemo(() => {
    if (useProxy) {
      return getProxiedUrl(src);
    }
    return src;
  }, [src, useProxy]);

  // Handle empty or invalid URL
  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={
          fill
            ? { position: "absolute", inset: 0 }
            : { width: width || "100%", height: height || "100%" }
        }
      >
        <ImageIcon className="h-6 w-6 text-gray-400" />
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <ImageIcon className="h-6 w-6 text-gray-300" />
        </div>
      )}
      <Image
        src={imageUrl}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        unoptimized={useProxy} // Skip optimization for proxied images
        onError={() => {
          // If direct URL fails and it's an R2 URL, try proxy
          if (!useProxy && src.includes("r2.dev")) {
            setUseProxy(true);
          } else {
            setHasError(true);
            setIsLoading(false);
          }
        }}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}
