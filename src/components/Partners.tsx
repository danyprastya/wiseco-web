"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { StrategicPartner, MediaReview } from "@/lib/db-types";

export default function Partners() {
  const [strategicPartners, setStrategicPartners] = useState<
    StrategicPartner[]
  >([]);
  const [mediaReviews, setMediaReviews] = useState<MediaReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partnersRes, mediaRes] = await Promise.all([
          fetch("/api/data/strategic-partners"),
          fetch("/api/data/media-reviews"),
        ]);
        const partnersData = await partnersRes.json();
        const mediaData = await mediaRes.json();

        if (partnersData.data) setStrategicPartners(partnersData.data);
        if (mediaData.data) setMediaReviews(mediaData.data);
      } catch (error) {
        console.error("Failed to fetch partners data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Split strategic partners: first 4, then the rest
  const strategicRow1 = strategicPartners.slice(0, 4);
  const strategicRow2 = strategicPartners.slice(4);

  // Split media reviews: 5, 5, rest
  const mediaRow1 = mediaReviews.slice(0, 5);
  const mediaRow2 = mediaReviews.slice(5, 10);
  const mediaRow3 = mediaReviews.slice(10);

  if (isLoading) {
    return (
      <section
        id="strategic-partners"
        className="h-auto sm:h-[480px] md:h-[520px] lg:h-[560px] xl:h-[600px] py-[20px] sm:py-0 bg-white"
      >
        <div className="h-full flex flex-col items-center justify-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
            <div className="flex gap-4 justify-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="strategic-partners"
      className="h-auto sm:h-[480px] md:h-[520px] lg:h-[560px] xl:h-[600px] py-[20px] sm:py-0 bg-white"
    >
      <div className="h-full flex flex-col items-center px-[20px] sm:px-0">
        {/* Strategic Partners */}
        <div className="flex flex-col items-center">
          {/* Spacing from top */}
          <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

          <div className="h-[40px] sm:h-[42px] md:h-[48px] lg:h-[52px] xl:h-[56px] flex items-center justify-center">
            <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold text-[#D79C60] section-title">
              Strategic Partners
            </h2>
          </div>

          {/* Spacing to content */}
          <div className="h-[15px] sm:h-[18px] md:h-[20px] lg:h-[22px] xl:h-[25px]"></div>

          {/* Mobile: flex-wrap, Desktop: rows */}
          <div className="flex flex-wrap items-center justify-center gap-[10px] sm:hidden">
            {strategicPartners.map((partner) => (
              <div key={partner.id} className="h-[25px] flex items-center">
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={100}
                  height={25}
                  className="h-[25px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: Row 1 - 4 logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {strategicRow1.map((partner) => (
              <div
                key={partner.id}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: 20px gap between rows */}
          <div className="hidden sm:block h-[20px]"></div>

          {/* Desktop: Row 2 - remaining logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {strategicRow2.map((partner) => (
              <div
                key={partner.id}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Media Reviews */}
        <div className="flex flex-col items-center mt-[25px] sm:mt-[30px] md:mt-[34px] lg:mt-[38px] xl:mt-[40px]">
          <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold text-[#D79C60] text-center">
            Media Reviews
          </h2>

          {/* Spacing */}
          <div className="h-[15px] sm:h-[20px] md:h-[24px] lg:h-[28px] xl:h-[30px]"></div>

          {/* Mobile: flex-wrap */}
          <div className="flex flex-wrap items-center justify-center gap-[10px] sm:hidden">
            {mediaReviews.map((media) => (
              <div key={media.id} className="h-[25px] flex items-center">
                <Image
                  src={media.logoUrl}
                  alt={media.name}
                  width={100}
                  height={25}
                  className="h-[25px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: Row 1 - 5 logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {mediaRow1.map((media) => (
              <div
                key={media.id}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={media.logoUrl}
                  alt={media.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: 20px gap between rows */}
          <div className="hidden sm:block h-[20px]"></div>

          {/* Desktop: Row 2 - 5 logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {mediaRow2.map((media) => (
              <div
                key={media.id}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={media.logoUrl}
                  alt={media.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: 20px gap between rows */}
          <div className="hidden sm:block h-[20px]"></div>

          {/* Desktop: Row 3 - remaining logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {mediaRow3.map((media) => (
              <div
                key={media.id}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={media.logoUrl}
                  alt={media.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
