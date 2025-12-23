"use client";

import Image from "next/image";
import { useState } from "react";
import { isBlobUrl } from "@/lib/storage/blob";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

/**
 * Optimized Image component with fallback support
 * Handles both Vercel Blob URLs and external URLs
 * Provides fallback if image fails to load
 */
export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  fallbackSrc = "/placeholder-image.jpg",
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      console.warn(`Image failed to load: ${src}, using fallback`);
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Determine if this is a blob URL (reliable) or external URL (may fail)
  const isReliable = isBlobUrl(src);

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        className={className}
        priority={priority}
        onError={handleError}
        unoptimized={!isReliable} // Only optimize blob URLs, external URLs may have CORS issues
      />
    );
  }

  if (!width || !height) {
    throw new Error("OptimizedImage: width and height are required when fill is false");
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={handleError}
      unoptimized={!isReliable}
    />
  );
}

