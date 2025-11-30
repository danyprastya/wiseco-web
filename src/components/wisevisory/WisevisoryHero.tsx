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
    <section className="h-[110px] sm:h-[240px] md:h-[290px] lg:h-[345px] xl:h-[401px] mt-[54px] sm:mt-[65px] lg:mt-[70px] xl:mt-[80px] relative flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 w-[280px] h-[70px] sm:w-[360px] sm:h-[91px] md:w-[440px] md:h-[111px] lg:w-[520px] lg:h-[131px] xl:w-[600px] xl:h-[151px]">
        <Image
          src="/images/wisevisory_logo.png"
          alt="Wisevisory Logo"
          fill
          sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 440px, (max-width: 1280px) 520px, 600px"
          className="object-contain"
          quality={100}
          priority
        />
      </div>
    </section>
  );
}
