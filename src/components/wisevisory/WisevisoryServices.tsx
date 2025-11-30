"use client";

import { useState } from "react";
import Image from "next/image";
import { wisevisoryServices, WisevisoryService } from "@/data/wisevisory";

function ServiceCard({
  service,
  isMobileActive,
  onMobileClick,
}: {
  service: WisevisoryService;
  isMobileActive: boolean;
  onMobileClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Show description if hovered (desktop) or clicked (mobile)
  const showDescription = isHovered || isMobileActive;

  return (
    <div
      className="w-[185px] h-[185px] sm:w-[145px] sm:h-[190px] md:w-[165px] md:h-[215px] lg:w-[184px] lg:h-[240px] xl:w-[204px] xl:h-[266px] rounded-[20px] overflow-hidden relative cursor-pointer transition-transform duration-300 sm:hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onMobileClick}
    >
      {/* Background Image */}
      <Image
        src="/images/bg-box-service.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 640px) 185px, (max-width: 768px) 145px, (max-width: 1024px) 165px, (max-width: 1280px) 184px, 204px"
      />

      {/* Black Overlay - always visible */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Title - visible when not showing description */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
          showDescription ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-[18px] sm:text-[15px] md:text-[17px] lg:text-[20px] xl:text-[22px] text-white text-center leading-[1.2]">
          <strong>{service.title}</strong>
        </p>
        {/* Click to read more - mobile only */}
        <p className="sm:hidden text-[10px] text-white/70 text-center mt-2">
          click to read more
        </p>
      </div>

      {/* Description - shown on hover (desktop) or click (mobile) */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-[15px] sm:p-[12px] md:p-[14px] lg:p-[17px] xl:p-[20px] transition-opacity duration-300 ${
          showDescription ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-[11px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[13px] font-normal text-white text-center leading-[1.4]">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default function WisevisoryServices() {
  const [mobileActiveCard, setMobileActiveCard] = useState<number | null>(null);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleMobileClick = (id: number) => {
    // Only toggle on mobile (check window width)
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setMobileActiveCard(mobileActiveCard === id ? null : id);
    }
  };

  return (
    <section className="min-h-[869px] sm:min-h-[580px] md:min-h-[680px] lg:min-h-[780px] xl:min-h-[869px] sm:h-auto bg-[#E8E6E6] flex flex-col items-center py-[20px] sm:py-[35px] md:py-[42px] lg:py-[48px] xl:py-[55px]">
      <div className="h-auto sm:h-[42px] md:h-[46px] lg:h-[50px] xl:h-[56px] flex items-center justify-center">
        <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-[#D79C60] text-center font-bold">
          Services
        </h2>
      </div>

      {/* 25px spacing */}
      <div className="h-[15px] sm:h-[16px] md:h-[18px] lg:h-[22px] xl:h-[25px]"></div>

      {/* Services Grid - vertical on mobile, 4x2 on desktop */}
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-[10px] sm:gap-[18px] md:gap-[25px] lg:gap-[32px] xl:gap-[40px] px-[20px] sm:px-0">
        {wisevisoryServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isMobileActive={mobileActiveCard === service.id}
            onMobileClick={() => handleMobileClick(service.id)}
          />
        ))}
      </div>

      {/* 20px spacing on mobile, 40px on desktop */}
      <div className="h-[20px] sm:h-[26px] md:h-[30px] lg:h-[35px] xl:h-[40px]"></div>

      {/* Advisory Now Button */}
      <a
        href="http://advisory.wiseco.id"
        target="_blank"
        rel="noopener noreferrer"
        className={`w-[185px] h-[42px] sm:w-[140px] sm:h-[36px] md:w-[150px] md:h-[38px] lg:w-[160px] lg:h-[42px] xl:w-[170px] xl:h-[45px] rounded-[100px] text-[16px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px] font-bold flex items-center justify-center transition-colors duration-300 ${
          isButtonActive
            ? "bg-[#D79C60] text-[#333333]"
            : "bg-[#333333] text-[#D79C60] sm:hover:bg-[#D79C60] sm:hover:text-[#333333]"
        }`}
        onClick={() => setIsButtonActive(true)}
        onTouchStart={() => setIsButtonActive(true)}
        onTouchEnd={() => setTimeout(() => setIsButtonActive(false), 150)}
      >
        Advisory Now!
      </a>
    </section>
  );
}
