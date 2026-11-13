"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** next/image with a graceful tonal fallback if a remote source fails. */
export function SmartImage({ className, fallbackClassName, alt, ...props }: ImageProps & { fallbackClassName?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 bg-[radial-gradient(120%_90%_at_60%_40%,#8a8f98_0%,#4b4f57_45%,#1b1c1f_100%)]",
          fallbackClassName,
        )}
      />
    );
  }
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
