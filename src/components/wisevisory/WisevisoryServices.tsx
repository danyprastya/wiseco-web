"use client";

import { useState } from "react";
import { wisevisoryServices, WisevisoryService } from "@/data/wisevisory";

function ServiceCard({ service }: { service: WisevisoryService }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-[204px] h-[266px] rounded-[20px] bg-white border border-gray-200 flex items-center justify-center p-4 cursor-pointer transition-transform duration-300 hover:scale-110 shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="text-[16px] font-semibold text-[#333333] text-center leading-[1.4]">
        {isHovered ? service.description : service.title}
      </p>
    </div>
  );
}

export default function WisevisoryServices() {
  return (
    <section className="h-[869px] bg-[#E8E6E6] flex flex-col items-center">
      {/* 55px spacing from top */}
      <div className="h-[55px]"></div>

      <div className="h-[56px] flex items-center justify-center">
        <h2 className="section-title">Services</h2>
      </div>

      {/* 25px spacing */}
      <div className="h-[25px]"></div>

      {/* Services Grid - 4x2 */}
      <div className="grid grid-cols-4 gap-[40px]">
        {wisevisoryServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* 40px spacing */}
      <div className="h-[40px]"></div>

      {/* Advisory Now Button */}
      <a
        href="http://advisory.wiseco.id"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[170px] h-[45px] rounded-[100px] bg-[#333333] text-[#D79C60] text-[16px] font-bold flex items-center justify-center transition-colors duration-300 hover:bg-[#D79C60] hover:text-[#333333]"
      >
        Advisory Now!
      </a>
    </section>
  );
}
