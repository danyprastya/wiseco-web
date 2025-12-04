"use client";

// import Image from "next/image"; // Uncomment when images are ready
import { useRef, useState, useEffect } from "react";
import { wisecubationGalleryImages } from "@/data/wisecubation";

export default function WisecubationGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicate images for infinite scroll effect
  const duplicatedImages = [
    ...wisecubationGalleryImages,
    ...wisecubationGalleryImages,
    ...wisecubationGalleryImages,
  ];

  // Reset scroll position for infinite effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const singleSetWidth = (150 + 10) * wisecubationGalleryImages.length; // image width + gap
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft = singleSetWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = singleSetWidth;
      }
    };

    container.addEventListener("scroll", handleScroll);
    // Set initial position to middle set
    container.scrollLeft = (150 + 10) * wisecubationGalleryImages.length;

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="h-[279px] sm:h-[420px] md:h-[480px] lg:h-[550px] xl:h-[623px] bg-white flex flex-col items-center py-[20px] sm:py-0">
      {/* 55px spacing from top - desktop only */}
      <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

      <div className="h-auto sm:h-[42px] md:h-[46px] lg:h-[50px] xl:h-[56px] flex items-center justify-center">
        <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-[#364DAF] text-center font-bold">
          Gallery
        </h2>
      </div>

      {/* 25px spacing */}
      <div className="h-[15px] sm:h-[16px] md:h-[18px] lg:h-[22px] xl:h-[25px]"></div>

      {/* Mobile Carousel */}
      <div
        ref={scrollRef}
        className="sm:hidden w-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="flex gap-[10px] px-[20px]"
          style={{ width: "max-content" }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="relative w-[150px] h-[150px] rounded-[15px] overflow-hidden bg-[#364DAF]/20 flex-shrink-0 flex items-center justify-center"
            >
              {/* Placeholder - shows blue tinted box until image is added */}
              <div className="absolute inset-0 bg-[#364DAF]/10 flex items-center justify-center">
                <span className="text-[#364DAF]/40 text-[12px] font-medium">
                  Coming Soon
                </span>
              </div>
              {/* Uncomment below when images are ready */}
              {/* <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="150px"
                className="object-cover"
                quality={100}
                draggable={false}
              /> */}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Gallery Grid - 4x2 */}
      <div className="hidden sm:grid grid-cols-4 gap-[3px] md:gap-[4px] lg:gap-[4px] xl:gap-[5px]">
        {wisecubationGalleryImages.map((image) => (
          <div
            key={image.id}
            className="relative w-[135px] h-[135px] md:w-[155px] md:h-[155px] lg:w-[178px] lg:h-[178px] xl:w-[205px] xl:h-[205px] rounded-[14px] md:rounded-[16px] lg:rounded-[18px] xl:rounded-[20px] overflow-hidden bg-[#364DAF]/10 flex items-center justify-center"
          >
            {/* Placeholder - shows blue tinted box until image is added */}
            <span className="text-[#364DAF]/40 text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium">
              Coming Soon
            </span>
            {/* Uncomment below when images are ready */}
            {/* <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 135px, (max-width: 1024px) 155px, (max-width: 1280px) 178px, 205px"
              className="object-cover"
              quality={100}
            /> */}
          </div>
        ))}
      </div>
    </section>
  );
}
