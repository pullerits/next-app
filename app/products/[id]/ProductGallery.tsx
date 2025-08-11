'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const initialImages = useMemo(() => {
    const list = (images && images.length > 0 ? images : ['/placeholder.svg']).map((src) => src || '/placeholder.svg');
    return list;
  }, [images]);

  const [resolvedImages, setResolvedImages] = useState<string[]>(initialImages);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setResolvedImages(initialImages);
    setActiveIndex(0);
  }, [initialImages]);

  const handleImageError = (index: number) => {
    setResolvedImages((prev) => {
      if (prev[index] === '/placeholder.svg') return prev;
      const next = prev.slice();
      next[index] = '/placeholder.svg';
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-lg">
        <Image
          key={resolvedImages[activeIndex]}
          src={resolvedImages[activeIndex]}
          alt={name}
          width={600}
          height={600}
          className="w-full h-full object-cover"
          onError={() => handleImageError(activeIndex)}
        />
      </div>

      {resolvedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {resolvedImages.slice(0, 4).map((src, i) => {
            const index = i;
            return (
              <button
                type="button"
                key={`${src}-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-md focus:outline-none ring-2 ring-offset-2 ${
                  activeIndex === index ? 'ring-blue-500' : 'ring-transparent'
                }`}
                aria-label={`Show image ${index + 1}`}
              >
                <Image
                  key={src}
                  src={src || '/placeholder.svg'}
                  alt={`${name} thumbnail ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                  onError={() => handleImageError(index)}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


