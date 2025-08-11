'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, type CSSProperties } from 'react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width; // 0..1
    const y = (event.clientY - rect.top) / rect.height; // 0..1
    const rotationRange = 5; // degrees, subtle
    const rotateX = (0.5 - y) * rotationRange; // invert so top tilts back
    const rotateY = (x - 0.5) * rotationRange;
    setTiltStyle({
      transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.01)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
  };
  return (
    <section className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm">100 Day Money Back Guarantee</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">Ultra-Slim.</span>
              <span className="block gradient-text">Ultra-Secure.</span>
            </h1>
            
            <p className="text-xl text-gray-200">
              Track it. Find it. Keep it.
            </p>
            
            <Link href="/products" className="inline-block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 hover:scale-105 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg">
              SHOP NOW
            </Link>
            
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>100 Day Money Back Guarantee</span>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-80 h-80 lg:w-96 lg:h-96 group [perspective:1000px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl transition-all duration-300 group-hover:opacity-40 group-hover:blur-[0.5px]"></div>
              <div
                className="absolute inset-4 bg-black/90 rounded-xl shadow-2xl flex items-center justify-center backdrop-blur-sm transform-gpu transition-transform duration-200 ease-out will-change-transform"
                style={tiltStyle}
              >
                <Image
                  src="/images/hero/trackpro-hero-product.jpg"
                  alt="TRACKPRO Ultra-Slim Card"
                  width={300}
                  height={400}
                  className="w-full h-full object-contain rounded-lg"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}