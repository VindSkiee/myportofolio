"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface ProjectGalleryProps {
  photos: string[];
  title: string;
  accentColor: string;
}

export default function ProjectGallery({ photos, title, accentColor }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const hasMultiplePhotos = photos.length > 1;
  const activePhoto = useMemo(
    () => (activeIndex === null ? null : photos[activeIndex]),
    [activeIndex, photos]
  );

  const closePreview = () => setActiveIndex(null);

  const showPrev = () => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + photos.length) % photos.length;
    });
  };

  const showNext = () => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % photos.length;
    });
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowLeft" && hasMultiplePhotos) {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev - 1 + photos.length) % photos.length;
        });
      }

      if (event.key === "ArrowRight" && hasMultiplePhotos) {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev + 1) % photos.length;
        });
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, hasMultiplePhotos, photos.length]);

  if (photos.length === 0) return null;

  return (
    <section className="py-12 md:py-20 border-t border-white/5 animate-fadeInUp animation-delay-400">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center md:text-start">
          Project Gallery
        </h2>

        <div
          className={`grid gap-6 ${
            photos.length === 1
              ? "grid-cols-1"
              : photos.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {photos.map((photo, index) => (
            <button
              key={photo + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative rounded-xl overflow-hidden group text-left border border-white/10 ${
                photos.length === 3 && index === 0
                  ? "md:col-span-2 h-[250px] md:h-[400px]"
                  : "h-[250px] md:h-[300px]"
              }`}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.15}s forwards`,
              }}
              aria-label={`Open preview ${index + 1} for ${title}`}
            >
              <Image
                src={photo || "/placeholder.jpg"}
                alt={`${title} Screenshot ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />

              <div className="absolute bottom-3 right-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-black/70 text-white border border-white/20 backdrop-blur-sm">
                Click to preview
              </div>
            </button>
          ))}
        </div>
      </div>

      {activePhoto !== null && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview for ${title}`}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closePreview();
            }}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/70 text-white border border-white/20 hover:bg-black transition-colors"
            aria-label="Close image preview"
          >
            x
          </button>

          {hasMultiplePhotos && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              className="absolute left-5 md:left-8 w-10 h-10 rounded-full bg-black/70 text-white border border-white/20 hover:bg-black transition-colors"
              aria-label="Previous image"
            >
              &lt;
            </button>
          )}

          <div
            className="relative w-full max-w-6xl h-[80vh] rounded-xl overflow-hidden border"
            style={{ borderColor: `${accentColor}55` }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activePhoto}
              alt={`${title} Preview ${activeIndex + 1}`}
              fill
              className="object-contain bg-black"
              sizes="100vw"
              priority
            />
          </div>

          {hasMultiplePhotos && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-5 md:right-8 w-10 h-10 rounded-full bg-black/70 text-white border border-white/20 hover:bg-black transition-colors"
              aria-label="Next image"
            >
              &gt;
            </button>
          )}

          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider bg-black/70 border"
            style={{ color: accentColor, borderColor: `${accentColor}66` }}
          >
            {activeIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
