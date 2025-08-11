"use client";

import { useRef, useState, type CSSProperties } from "react";

function StatsCard({
  value,
  title,
  description,
}: {
  value: string;
  title: string;
  description: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [overlayStyle, setOverlayStyle] = useState<CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setOverlayStyle({
      opacity: 1,
      background: `radial-gradient(180px 140px at ${xPct}% ${yPct}%, rgba(255,255,255,0.14), transparent 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setOverlayStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-tr from-blue-950 via-indigo-950 to-blue-900 text-white p-8 rounded-xl text-center border border-white/10 soft-shadow transform-gpu transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01]"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-150"
        style={overlayStyle}
      />
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-xl font-semibold mb-2">{title}</div>
      <div className="text-blue-100">{description}</div>
    </div>
  );
}

export default function ProvenResultsSection() {
  return (
    <section className="bg-transparent py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 sm:p-10 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust our tracking technology to keep their valuables safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <StatsCard
              value="100,000"
              title="Tracking Cards Sold"
              description="Trusted by customers worldwide"
            />
            <StatsCard
              value="6000+"
              title="Reviews"
              description="Average 4.8/5 star rating"
            />
            <StatsCard
              value="5000+"
              title="Wallets Found"
              description="Items successfully recovered"
            />
          </div>
        </div>
      </div>
    </section>
  );
}