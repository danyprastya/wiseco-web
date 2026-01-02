"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Project } from "@/lib/db-types";
import { motion, AnimatePresence } from "framer-motion";

// Timing configuration for Projects - content appears AFTER slide transition
const SLIDE_TRANSITION_DURATION = 0.6; // Duration of slide animation
const CONTENT_START_DELAY = 0.3; // Delay before content starts appearing (after slide is mostly visible)
const LOGO_DELAY = CONTENT_START_DELAY; // Logo fades in first
const DESC_DELAY = CONTENT_START_DELAY + 0.2; // Description fades in after logo
const IMAGES_DELAY = CONTENT_START_DELAY + 0.5; // Images fade in last

// Fade in animation for content (no slide effect)
const contentFadeIn = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: "easeOut" as const,
    },
  },
});

// Slide from bottom animation for text
const slideFromBottom = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
});

// Slide animation variants for navigation - uses custom direction
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: SLIDE_TRANSITION_DURATION,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 1,
    transition: {
      duration: SLIDE_TRANSITION_DURATION,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

// Image loader component with skeleton
function ImageWithLoader({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  sizes,
  quality = 100,
  onLoad,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-inherit" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        sizes={sizes}
        quality={quality}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
      />
    </>
  );
}

// Slide content component - renders based on layout type (bislaf, anns, dusdukduk, iluminen, default)
function SlideContent({
  slide,
  slideKey,
}: {
  slide: Project;
  slideKey: number;
}) {
  // BISLAF Layout
  if (slide.layoutType === "bislaf") {
    return (
      <motion.div
        key={slideKey}
        className="h-full flex flex-col items-center justify-start"
        initial="hidden"
        animate="visible"
      >
        {/* Title Image - fade in */}
        {slide.titleImageUrl && (
          <motion.div
            className="mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px]"
            variants={contentFadeIn(LOGO_DELAY)}
          >
            <Image
              src={slide.titleImageUrl}
              alt="Title"
              width={350}
              height={100}
              className="w-[240px] h-[69px] sm:w-[220px] sm:h-[63px] md:w-[260px] md:h-[75px] lg:w-[300px] lg:h-[86px] xl:w-[350px] xl:h-[100px] object-contain"
            />
          </motion.div>
        )}

        {/* Partner Logos - fade in */}
        {slide.partnerLogos && slide.partnerLogos.length > 0 && (
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-4 md:gap-5 lg:gap-6 mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px]"
            variants={contentFadeIn(LOGO_DELAY + 0.1)}
          >
            {slide.partnerLogos.map((logoUrl, idx) => (
              <Image
                key={idx}
                src={logoUrl}
                alt={`Partner ${idx + 1}`}
                width={120}
                height={27}
                className="h-[18px] sm:h-[18px] md:h-[22px] lg:h-[25px] xl:h-[27px] w-auto object-contain"
              />
            ))}
          </motion.div>
        )}

        {/* Description - slide from bottom */}
        <motion.div
          className="min-w-[380px] w-full px-[10px] sm:px-0 sm:w-[450px] md:w-[550px] lg:w-[680px] xl:w-[793px] h-auto sm:h-[30px] md:h-[32px] lg:h-[34px] mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px] flex items-center justify-center"
          variants={slideFromBottom(DESC_DELAY)}
        >
          <p className="text-[#333333] text-[10px] sm:text-[10px] md:text-[11px] lg:text-[11px] xl:text-[12px] font-medium leading-[1.4] text-center">
            {slide.description}
          </p>
        </motion.div>

        {/* Images Section */}
        <>
          {/* Mobile: Two images stacked vertically - uses galleryImages */}
          <motion.div
            className="flex sm:hidden flex-col items-center gap-[10px]"
            variants={contentFadeIn(IMAGES_DELAY)}
          >
            {slide.galleryImages && slide.galleryImages.length >= 2 ? (
              <>
                <div className="relative w-[280px] h-[120px] rounded-[10px] overflow-hidden">
                  <ImageWithLoader
                    src={slide.galleryImages[0]}
                    alt="Gallery 1"
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-[280px] h-[120px] rounded-[10px] overflow-hidden">
                  <ImageWithLoader
                    src={slide.galleryImages[1]}
                    alt="Gallery 2"
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              </>
            ) : slide.mainImageUrl ? (
              <div className="relative w-[280px] h-[120px] rounded-[10px] overflow-hidden">
                <ImageWithLoader
                  src={slide.mainImageUrl}
                  alt="Main"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            ) : null}
          </motion.div>

          {/* Tablet/Desktop: Main image + Gallery below - fade in */}
          <motion.div
            className="hidden sm:flex flex-col items-center gap-[10px] md:gap-[12px] lg:gap-[15px]"
            variants={contentFadeIn(IMAGES_DELAY)}
          >
            {/* Main large image */}
            {slide.mainImageUrl && (
              <div className="relative w-[500px] h-[125px] md:w-[600px] md:h-[150px] lg:w-[750px] lg:h-[185px] xl:w-[937px] xl:h-[180px] rounded-[15px] md:rounded-[18px] lg:rounded-[20px] overflow-hidden">
                <ImageWithLoader
                  src={slide.mainImageUrl}
                  alt="Main"
                  fill
                  sizes="(max-width: 768px) 500px, (max-width: 1024px) 600px, (max-width: 1280px) 750px, 937px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Gallery images row */}
            {slide.galleryImages && slide.galleryImages.length >= 3 && (
              <div className="flex items-center justify-center gap-[8px] md:gap-[10px]">
                {slide.galleryImages.slice(0, 3).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-[12px] md:rounded-[15px] lg:rounded-[18px] overflow-hidden"
                    style={{
                      width:
                        idx === 1 ? "calc(500px * 0.55)" : "calc(500px * 0.22)",
                      height: "80px",
                    }}
                  >
                    <ImageWithLoader
                      src={imgUrl}
                      alt={`Gallery ${idx + 1}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      </motion.div>
    );
  }

  // Ann's Bakery Layout
  if (slide.layoutType === "anns") {
    return (
      <motion.div
        key={slideKey}
        className="h-full flex flex-col items-center justify-start"
        initial="hidden"
        animate="visible"
      >
        {/* Wisevisory Logo - fade in */}
        <motion.div
          className="relative z-10"
          variants={contentFadeIn(LOGO_DELAY)}
        >
          {slide.titleImageUrl ? (
            <Image
              src={slide.titleImageUrl}
              alt="Title"
              width={240}
              height={50}
              className="object-contain w-[160px] h-auto sm:w-[150px] md:w-[180px] lg:w-[210px] xl:w-[240px]"
            />
          ) : (
            <p className="text-black p-4">No titleImage</p>
          )}
        </motion.div>

        {/* Partner Logos - fade in */}
        {slide.partnerLogos && slide.partnerLogos.length > 0 && (
          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-[5px]"
            variants={contentFadeIn(LOGO_DELAY + 0.1)}
          >
            {slide.partnerLogos.map((logoUrl, idx) => (
              <Image
                key={idx}
                src={logoUrl}
                alt={`Partner ${idx + 1}`}
                width={126}
                height={100}
                className="object-contain w-[70px] h-auto sm:w-[65px] md:w-[80px] lg:w-[95px] xl:w-[110px]"
              />
            ))}
          </motion.div>
        )}

        {/* Description - slide from bottom */}
        <motion.div
          className="min-w-[380px] w-full px-[10px] sm:px-0 sm:w-[450px] md:w-[550px] lg:w-[680px] xl:w-[793px] h-auto sm:h-[40px] md:h-[44px] lg:h-[48px] xl:h-[50px] mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px] flex items-center justify-center"
          variants={slideFromBottom(DESC_DELAY)}
        >
          <p className="text-[#333333] text-[10px] sm:text-[10px] md:text-[11px] lg:text-[11px] xl:text-[12px] font-medium leading-[1.4] text-center">
            {slide.description}
          </p>
        </motion.div>

        {/* Gallery Images - fade in */}
        {slide.galleryImages && slide.galleryImages.length > 0 && (
          <>
            {/* Mobile Layout - fade in */}
            <motion.div
              className="flex sm:hidden flex-col items-center gap-[10px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              <div className="flex items-center justify-center gap-[10px]">
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <ImageWithLoader
                    src={slide.galleryImages[0] || ""}
                    alt="Gallery 1"
                    fill
                    sizes="135px"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <ImageWithLoader
                    src={slide.galleryImages[2] || slide.galleryImages[0] || ""}
                    alt="Gallery 3"
                    fill
                    sizes="135px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative rounded-[10px] overflow-hidden w-[280px] h-[100px]">
                <ImageWithLoader
                  src={slide.galleryImages[1] || slide.galleryImages[0] || ""}
                  alt="Gallery 2"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Tablet Layout (sm to lg) - fade in */}
            <motion.div
              className="hidden sm:flex lg:hidden items-center justify-center gap-[8px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.slice(0, 3).map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[15px] overflow-hidden"
                  style={{
                    width: idx === 1 ? "362px" : "139px",
                    height: "158px",
                  }}
                >
                  <ImageWithLoader
                    src={imageUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes={idx === 1 ? "362px" : "139px"}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>

            {/* Desktop Layout (lg to xl) - fade in */}
            <motion.div
              className="hidden lg:flex xl:hidden items-center justify-center gap-[8px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.slice(0, 3).map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[18px] overflow-hidden"
                  style={{
                    width: idx === 1 ? "440px" : "168px",
                    height: "192px",
                  }}
                >
                  <ImageWithLoader
                    src={imageUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes={idx === 1 ? "440px" : "168px"}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>

            {/* Desktop Layout (xl+) - Ann's - fade in */}
            <motion.div
              className="hidden xl:flex items-center justify-center gap-[10px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.slice(0, 3).map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[20px] overflow-hidden"
                  style={{
                    width: idx === 1 ? "517px" : "198px",
                    height: "226px",
                  }}
                >
                  <ImageWithLoader
                    src={imageUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes={idx === 1 ? "517px" : "198px"}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    );
  }

  // Dusdukduk Layout (similar to anns but no spacing between logos)
  if (slide.layoutType === "dusdukduk") {
    return (
      <motion.div
        key={slideKey}
        className="h-full flex flex-col items-center justify-start"
        initial="hidden"
        animate="visible"
      >
        {/* Wisevisory Logo + Partner Logos - fade in */}
        <motion.div
          className="flex flex-col items-center"
          variants={contentFadeIn(LOGO_DELAY)}
        >
          {slide.titleImageUrl && (
            <Image
              src={slide.titleImageUrl}
              alt="Title"
              width={200}
              height={50}
              className="object-contain w-[130px] h-auto sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[200px]"
            />
          )}
          {slide.partnerLogos && slide.partnerLogos.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-[5px]">
              {slide.partnerLogos.map((logoUrl, idx) => (
                <Image
                  key={idx}
                  src={logoUrl}
                  alt={`Partner ${idx + 1}`}
                  width={106}
                  height={80}
                  className="object-contain w-[60px] h-auto sm:w-[55px] md:w-[70px] lg:w-[85px] xl:w-[75px]"
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Spacing 10px before description */}
        <div className="h-[10px]"></div>

        {/* Description - slide from bottom */}
        <motion.div
          className="min-w-[380px] w-full px-[10px] sm:px-0 sm:w-[450px] md:w-[550px] lg:w-[680px] xl:w-[793px] h-auto sm:h-[40px] md:h-[44px] lg:h-[48px] xl:h-[50px] mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px] flex items-center justify-center"
          variants={slideFromBottom(DESC_DELAY)}
        >
          <p className="text-[#333333] text-[10px] sm:text-[10px] md:text-[11px] lg:text-[11px] xl:text-[12px] font-medium leading-[1.4] text-center">
            {slide.description}
          </p>
        </motion.div>

        {/* Gallery Images - fade in */}
        {slide.galleryImages && slide.galleryImages.length > 0 && (
          <>
            {/* Mobile Layout - fade in */}
            <motion.div
              className="flex sm:hidden flex-col items-center gap-[10px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              <div className="flex items-center justify-center gap-[10px]">
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <ImageWithLoader
                    src={slide.galleryImages[0] || ""}
                    alt="Gallery 1"
                    fill
                    sizes="135px"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <ImageWithLoader
                    src={slide.galleryImages[2] || slide.galleryImages[0] || ""}
                    alt="Gallery 3"
                    fill
                    sizes="135px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative rounded-[10px] overflow-hidden w-[280px] h-[100px]">
                <ImageWithLoader
                  src={slide.galleryImages[1] || slide.galleryImages[0] || ""}
                  alt="Gallery 2"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Tablet Layout (sm to xl) - Dusdukduk - fade in */}
            <motion.div
              className="hidden sm:flex xl:hidden items-center justify-center gap-[6px] md:gap-[8px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.slice(0, 3).map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[12px] md:rounded-[15px] overflow-hidden"
                  style={{
                    width: idx === 1 ? "222px" : "141px",
                    height: "124px",
                  }}
                >
                  <ImageWithLoader
                    src={imageUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes={idx === 1 ? "222px" : "141px"}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>

            {/* Desktop Layout (xl+) - Dusdukduk - fade in */}
            <motion.div
              className="hidden xl:flex items-center justify-center gap-[10px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.slice(0, 3).map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[20px] overflow-hidden"
                  style={{
                    width: idx === 1 ? "403px" : "256px",
                    height: "226px",
                  }}
                >
                  <ImageWithLoader
                    src={imageUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes={idx === 1 ? "403px" : "256px"}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    );
  }

  // Iluminen Layout (similar to dusdukduk but with larger logo)
  if (slide.layoutType === "iluminen") {
    return (
      <motion.div
        key={slideKey}
        className="h-full flex flex-col items-center justify-start"
        initial="hidden"
        animate="visible"
      >
        {/* Wisevisory Logo + Partner Logos - fade in */}
        <motion.div
          className="flex flex-col items-center"
          variants={contentFadeIn(LOGO_DELAY)}
        >
          {slide.titleImageUrl && (
            <Image
              src={slide.titleImageUrl}
              alt="Title"
              width={200}
              height={50}
              className="object-contain w-[130px] h-auto sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[200px]"
            />
          )}
          {slide.partnerLogos && slide.partnerLogos.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-[5px]">
              {slide.partnerLogos.map((logoUrl, idx) => (
                <Image
                  key={idx}
                  src={logoUrl}
                  alt={`Partner ${idx + 1}`}
                  width={130}
                  height={100}
                  className="object-contain w-[90px] h-auto sm:w-[85px] md:w-[100px] lg:w-[120px] xl:w-[130px]"
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Spacing 10px before description */}
        <div className="h-[10px]"></div>

        {/* Description - slide from bottom */}
        <motion.div
          className="min-w-[380px] w-full px-[10px] sm:px-0 sm:w-[450px] md:w-[550px] lg:w-[680px] xl:w-[793px] h-auto sm:h-[40px] md:h-[44px] lg:h-[48px] xl:h-[50px] mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px] flex items-center justify-center"
          variants={slideFromBottom(DESC_DELAY)}
        >
          <p className="text-[#333333] text-[10px] sm:text-[10px] md:text-[11px] lg:text-[11px] xl:text-[12px] font-medium leading-[1.4] text-center">
            {slide.description}
          </p>
        </motion.div>

        {/* Gallery Images - fade in */}
        {slide.galleryImages && slide.galleryImages.length > 0 && (
          <>
            {/* Mobile Layout - fade in */}
            <motion.div
              className="flex sm:hidden flex-col items-center gap-[10px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              <div className="flex items-center justify-center gap-[10px]">
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <ImageWithLoader
                    src={slide.galleryImages[0] || ""}
                    alt="Gallery 1"
                    fill
                    sizes="135px"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <ImageWithLoader
                    src={slide.galleryImages[2] || slide.galleryImages[0] || ""}
                    alt="Gallery 3"
                    fill
                    sizes="135px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative rounded-[10px] overflow-hidden w-[280px] h-[100px]">
                <ImageWithLoader
                  src={slide.galleryImages[1] || slide.galleryImages[0] || ""}
                  alt="Gallery 2"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Tablet Layout (sm to xl) - Iluminen - fade in */}
            <motion.div
              className="hidden sm:flex xl:hidden items-center justify-center gap-[6px] md:gap-[8px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.slice(0, 3).map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[12px] md:rounded-[15px] overflow-hidden"
                  style={{
                    width: idx === 1 ? "222px" : "141px",
                    height: "124px",
                  }}
                >
                  <ImageWithLoader
                    src={imageUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes={idx === 1 ? "222px" : "141px"}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>

            {/* Desktop Layout (xl+) - Iluminen - fade in */}
            <motion.div
              className="hidden xl:flex items-center justify-center gap-[10px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.slice(0, 3).map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[20px] overflow-hidden"
                  style={{
                    width: idx === 1 ? "403px" : "256px",
                    height: "226px",
                  }}
                >
                  <ImageWithLoader
                    src={imageUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes={idx === 1 ? "403px" : "256px"}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    );
  }

  // Default layout
  return (
    <motion.div
      key={slideKey}
      className="h-full flex flex-col items-center justify-start"
      initial="hidden"
      animate="visible"
    >
      <div className="mb-2 md:mb-3 lg:mb-4 text-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] mb-0.5 md:mb-1">
          {slide.title}
        </h3>
        <p className="text-sm md:text-base lg:text-lg text-[#D79C60]">
          {slide.subtitle}
        </p>
      </div>
      <p className="text-[#333333] leading-relaxed mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm text-center max-w-[793px]">
        {slide.description}
      </p>
      {slide.mainImageUrl && (
        <div className="relative w-[500px] h-[200px] md:w-[600px] md:h-[250px] lg:w-[750px] lg:h-[300px] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={slide.mainImageUrl}
            alt="Main"
            fill
            className="object-cover"
          />
        </div>
      )}
    </motion.div>
  );
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="h-full flex flex-col items-center justify-start gap-4">
      <div className="w-[200px] h-[50px] bg-gray-300 animate-pulse rounded" />
      <div className="w-[100px] h-[40px] bg-gray-300 animate-pulse rounded" />
      <div className="w-[600px] h-[40px] bg-gray-300 animate-pulse rounded" />
      <div className="flex gap-[10px]">
        <div className="w-[198px] h-[226px] bg-gray-300 animate-pulse rounded-[20px]" />
        <div className="w-[517px] h-[226px] bg-gray-300 animate-pulse rounded-[20px]" />
        <div className="w-[198px] h-[226px] bg-gray-300 animate-pulse rounded-[20px]" />
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/data/projects");
        const data = await response.json();
        if (data.data) setProjects(data.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    if (projects.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = () => {
    if (projects.length === 0) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-advance slides every 10 seconds
  useEffect(() => {
    if (projects.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentSlide, nextSlide, projects.length]);

  return (
    <section
      id="projects"
      className="relative h-auto sm:h-[480px] md:h-[540px] lg:h-[640px] xl:h-[780px] py-[20px] pb-[50px] sm:pb-0 sm:py-0 sm:overflow-hidden flex items-start"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#E8E6E6]"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/project-bg.png)" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Spacing from top */}
        <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[50px] xl:h-[55px]"></div>

        <div className="h-[40px] sm:h-[42px] md:h-[48px] lg:h-[52px] xl:h-[56px] flex items-center justify-center">
          <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold text-[#D79C60] section-title">
            Projects
          </h2>
        </div>

        {/* Spacing to content */}
        <div className="h-[15px] sm:h-[16px] md:h-[20px] lg:h-[22px] xl:h-[25px]"></div>

        {/* Slider Container */}
        <div className="relative w-full h-auto sm:h-[340px] md:h-[380px] lg:h-[450px] xl:h-[523px] flex items-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="hidden lg:block absolute left-[40px] lg:left-[40px] xl:left-[60px] top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity"
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
          <div
            className="w-full h-full overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {isLoading ? (
              <div className="w-full h-full px-[20px] sm:px-4 md:px-12 lg:px-20">
                <LoadingSkeleton />
              </div>
            ) : projects.length > 0 ? (
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full px-[20px] sm:px-4 md:px-12 lg:px-20"
                >
                  <SlideContent
                    slide={projects[currentSlide]}
                    slideKey={currentSlide}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">No projects available</p>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="hidden lg:block absolute right-[40px] lg:right-[40px] xl:right-[60px] top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity"
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

        {/* Dot Indicators */}
        {projects.length > 0 && (
          <div className="flex justify-center mt-[20px] gap-[8px]">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-[8px] h-[8px] rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-[#D79C60]"
                    : "bg-[#D79C60]/40 hover:bg-[#D79C60]/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
