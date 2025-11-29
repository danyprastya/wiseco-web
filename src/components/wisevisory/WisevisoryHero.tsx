"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function WisevisoryHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="h-[401px] relative flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-[150%]"
        style={{
          backgroundImage: "url('/images/bg-wisevisory.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center 0%",
          transform: `translateY(${scrollY * 0.3}px)`,
          top: "-25%",
        }}
      />

      {/* White Overlay 40% */}
      <div className="absolute inset-0 bg-white opacity-40"></div>

      <div className="relative z-10 w-[600px] h-[151px]">
        <Image
          src="/images/wisevisory_logo.png"
          alt="Wisevisory Logo"
          fill
          sizes="600px"
          className="object-contain"
          quality={100}
          priority
        />
      </div>
    </section>
  );
}
