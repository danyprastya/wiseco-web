"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { projectsData, type ProjectSlide } from "@/data/projects";

// Slide content component - renders based on layout type
function SlideContent({ slide }: { slide: ProjectSlide }) {
  // BISLAF Layout
  if (slide.layoutType === "bislaf") {
    return (
      <>
        {/* Title Image */}
        {slide.titleImage && (
          <div className="mb-[20px]">
            <Image
              src={slide.titleImage.src}
              alt={slide.titleImage.alt}
              width={slide.titleImage.width}
              height={slide.titleImage.height}
              className="w-[350px] h-[100px]"
            />
          </div>
        )}

        {/* Partner Logos */}
        {slide.partnerLogos && slide.partnerLogos.length > 0 && (
          <div className="flex items-center justify-center gap-6 mb-[20px]">
            {slide.partnerLogos.map((logo, idx) => (
              <Image
                key={idx}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={27}
                className="h-[27px] w-auto"
              />
            ))}
          </div>
        )}

        {/* Description */}
        <div className="w-[793px] h-[34px] mb-[20px] flex items-center justify-center">
          <p className="text-[#333333] text-[12px] font-medium leading-[1.4] text-center">
            {slide.description}
          </p>
        </div>

        {/* Main Image */}
        {slide.mainImage && (
          <div className="relative w-[937px] h-[226px] rounded-[20px] overflow-hidden">
            <Image
              src={slide.mainImage.src}
              alt={slide.mainImage.alt}
              fill
              sizes="937px"
              quality={100}
            />
          </div>
        )}
      </>
    );
  }

  // Ann's Bakery Layout
  if (slide.layoutType === "anns") {
    return (
      <>
        {/* Wisevisory Logo */}
        <div className=" relative z-10">
          {slide.titleImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={slide.titleImage.src}
              alt={slide.titleImage.alt}
              width={slide.titleImage.width}
              height={slide.titleImage.height}
              className="object-cover"
              style={{
                width: `${slide.titleImage.width}px`,
                height: `${slide.titleImage.height}px`,
              }}
            />
          ) : (
            <p className="text-black p-4">No titleImage</p>
          )}
        </div>

        {/* Client Logo (Ann's) */}
        {slide.clientLogo && (
          <div>
            <Image
              src={slide.clientLogo.src}
              alt={slide.clientLogo.alt}
              width={slide.clientLogo.width}
              height={slide.clientLogo.height}
              style={{
                width: `${slide.clientLogo.width}px`,
                height: `${slide.clientLogo.height}px`,
              }}
            />
          </div>
        )}

        {/* Description */}
        <div
          className="mb-[20px] flex items-center justify-center"
          style={{
            width: `${slide.descriptionSize?.width || 793}px`,
            height: `${slide.descriptionSize?.height || 50}px`,
          }}
        >
          <p className="text-[#333333] text-[12px] font-medium leading-[1.4] text-center">
            {slide.description}
          </p>
        </div>

        {/* Gallery Images */}
        {slide.galleryImages && slide.galleryImages.length > 0 && (
          <div className="flex items-center justify-center gap-[10px]">
            {slide.galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="relative rounded-[20px] overflow-hidden"
                style={{
                  width: `${image.width}px`,
                  height: `${image.height}px`,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={`${image.width}px`}
                  quality={100}
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  // Dusdukduk Layout (similar to anns but no spacing between logos)
  if (slide.layoutType === "dusdukduk") {
    return (
      <>
        {/* Wisevisory Logo + Client Logo (no spacing between them) */}
        <div className="flex flex-col items-center">
          {slide.titleImage && (
            <Image
              src={slide.titleImage.src}
              alt={slide.titleImage.alt}
              width={slide.titleImage.width}
              height={slide.titleImage.height}
              style={{
                width: `${slide.titleImage.width}px`,
                height: `${slide.titleImage.height}px`,
              }}
            />
          )}
          {slide.clientLogo && (
            <Image
              src={slide.clientLogo.src}
              alt={slide.clientLogo.alt}
              width={slide.clientLogo.width}
              height={slide.clientLogo.height}
              className="object-contain"
              style={{
                width: `${slide.clientLogo.width}px`,
                height: `${slide.clientLogo.height}px`,
              }}
            />
          )}
        </div>

        {/* Spacing 10px before description */}
        <div className="h-[10px]"></div>

        {/* Description */}
        <div
          className="mb-[20px] flex items-center justify-center"
          style={{
            width: `${slide.descriptionSize?.width || 793}px`,
            height: `${slide.descriptionSize?.height || 50}px`,
          }}
        >
          <p className="text-[#333333] text-[12px] font-medium leading-[1.4] text-center">
            {slide.description}
          </p>
        </div>

        {/* Gallery Images */}
        {slide.galleryImages && slide.galleryImages.length > 0 && (
          <div className="flex items-center justify-center gap-[10px]">
            {slide.galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="relative rounded-[20px] overflow-hidden"
                style={{
                  width: `${image.width}px`,
                  height: `${image.height}px`,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={`${image.width}px`}
                  quality={100}
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  // Default layout
  return (
    <>
      <div className="mb-2 md:mb-3 lg:mb-4 text-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] mb-0.5 md:mb-1">
          {slide.title}
        </h3>
        <p className="text-sm md:text-base lg:text-lg text-[#D79C60]">
          {slide.subtitle}
        </p>
      </div>
      {slide.logos && slide.logos.length > 0 && (
        <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3 lg:mb-4">
          {slide.logos.map((logo, idx) => (
            <div
              key={idx}
              className="text-xs md:text-sm text-[#333333] font-medium"
            >
              {logo}
            </div>
          ))}
        </div>
      )}
      <p className="text-[#333333] leading-relaxed mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm text-center">
        {slide.description}
      </p>
      {slide.mainImage && (
        <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={slide.mainImage.src}
            alt={slide.mainImage.alt}
            fill
            className="object-cover"
          />
        </div>
      )}
    </>
  );
}

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slides = projectsData;

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // Auto-play slider - DISABLED FOR DEBUGGING
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     nextSlide();
  //   }, 10000);

  //   return () => clearInterval(timer);
  // }, []);

  // Handle seamless loop transition
  useEffect(() => {
    if (!isTransitioning) return;

    if (currentSlide === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(slides.length);
      }, 500);
    } else if (currentSlide === slides.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(1);
      }, 500);
    }
  }, [currentSlide, slides.length, isTransitioning]);

  return (
    <section className="relative h-[500px] md:h-[650px] lg:h-[780px] overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#E8E6E6]"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/project-bg.png)" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* 55px spacing from top */}
        <div className="h-[55px]"></div>

        <div className="h-[56px] flex items-center justify-center">
          <h2 className="section-title">Projects</h2>
        </div>

        {/* 25px spacing to content */}
        <div className="h-[25px]"></div>

        {/* Slider Container */}
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[523px] flex items-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-[60px] top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity"
            aria-label="Previous slide"
          >
            <svg
              width="24"
              height="44"
              viewBox="0 0 24 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L4 22L22 42"
                stroke="#595959"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Slides */}
          <div className="w-full h-full overflow-hidden">
            <div
              className="flex h-full"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: isTransitioning
                  ? "transform 500ms ease-in-out"
                  : "none",
              }}
            >
              {/* Clone of last slide */}
              <div className="w-full h-full flex-shrink-0 px-4 md:px-12 lg:px-20">
                <div className="h-full flex flex-col items-center justify-start">
                  <SlideContent slide={slides[slides.length - 1]} />
                </div>
              </div>

              {/* Original slides */}
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full h-full flex-shrink-0 px-4 md:px-12 lg:px-20"
                >
                  <div className="h-full flex flex-col items-center justify-start">
                    <SlideContent slide={slide} />
                  </div>
                </div>
              ))}

              {/* Clone of first slide */}
              <div className="w-full h-full flex-shrink-0 px-4 md:px-12 lg:px-20">
                <div className="h-full flex flex-col items-center justify-start">
                  <SlideContent slide={slides[0]} />
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-[60px] top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity"
            aria-label="Next slide"
          >
            <svg
              width="24"
              height="44"
              viewBox="0 0 24 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L20 22L2 42"
                stroke="#595959"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
