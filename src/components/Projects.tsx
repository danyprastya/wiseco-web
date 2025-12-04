"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { projectsData, type ProjectSlide } from "@/data/projects";
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

// Slide content component - renders based on layout type
function SlideContent({
  slide,
  slideKey,
}: {
  slide: ProjectSlide;
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
        {slide.titleImage && (
          <motion.div
            className="mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px]"
            variants={contentFadeIn(LOGO_DELAY)}
          >
            <Image
              src={slide.titleImage.src}
              alt={slide.titleImage.alt}
              width={slide.titleImage.width}
              height={slide.titleImage.height}
              className="w-[240px] h-[69px] sm:w-[220px] sm:h-[63px] md:w-[260px] md:h-[75px] lg:w-[300px] lg:h-[86px] xl:w-[350px] xl:h-[100px]"
            />
          </motion.div>
        )}

        {/* Partner Logos - fade in */}
        {slide.partnerLogos && slide.partnerLogos.length > 0 && (
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-4 md:gap-5 lg:gap-6 mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px]"
            variants={contentFadeIn(LOGO_DELAY + 0.1)}
          >
            {slide.partnerLogos.map((logo, idx) => (
              <Image
                key={idx}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={27}
                className="h-[18px] sm:h-[18px] md:h-[22px] lg:h-[25px] xl:h-[27px] w-auto"
              />
            ))}
          </motion.div>
        )}

        {/* Description - fade in */}
        <motion.div
          className="w-[280px] sm:w-[450px] md:w-[550px] lg:w-[680px] xl:w-[793px] h-auto sm:h-[30px] md:h-[32px] lg:h-[34px] mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px] flex items-center justify-center"
          variants={contentFadeIn(DESC_DELAY)}
        >
          <p className="text-[#333333] text-[10px] sm:text-[10px] md:text-[11px] lg:text-[11px] xl:text-[12px] font-medium leading-[1.4] text-center">
            {slide.description}
          </p>
        </motion.div>

        {/* Main Images - fade in */}
        {slide.mainImage && (
          <>
            {/* Mobile: Two images stacked */}
            <motion.div
              className="flex sm:hidden flex-col items-center gap-[10px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              <div className="relative w-[280px] h-[120px] rounded-[10px] overflow-hidden">
                <Image
                  src={slide.mainImage.src}
                  alt={slide.mainImage.alt}
                  fill
                  sizes="280px"
                  quality={100}
                  className="object-cover"
                />
              </div>
              <div className="relative w-[280px] h-[120px] rounded-[10px] overflow-hidden">
                <Image
                  src="/images/projects/bislaf/JATENG.png"
                  alt="JATENG"
                  fill
                  sizes="280px"
                  quality={100}
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Tablet/Desktop: Single large image - fade in */}
            <motion.div
              className="hidden sm:block relative w-[500px] h-[125px] md:w-[600px] md:h-[150px] lg:w-[750px] lg:h-[185px] xl:w-[937px] xl:h-[226px] rounded-[15px] md:rounded-[18px] lg:rounded-[20px] overflow-hidden"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              <Image
                src={slide.mainImage.src}
                alt={slide.mainImage.alt}
                fill
                sizes="(max-width: 768px) 500px, (max-width: 1024px) 600px, (max-width: 1280px) 750px, 937px"
                quality={100}
                className="object-cover"
              />
            </motion.div>
          </>
        )}
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
          {slide.titleImage ? (
            <Image
              src={slide.titleImage.src}
              alt={slide.titleImage.alt}
              width={slide.titleImage.width}
              height={slide.titleImage.height}
              className="object-contain w-[160px] h-auto sm:w-[150px] md:w-[180px] lg:w-[210px] xl:w-[240px]"
            />
          ) : (
            <p className="text-black p-4">No titleImage</p>
          )}
        </motion.div>

        {/* Client Logo (Ann's) - fade in */}
        {slide.clientLogo && (
          <motion.div variants={contentFadeIn(LOGO_DELAY + 0.15)}>
            <Image
              src={slide.clientLogo.src}
              alt={slide.clientLogo.alt}
              width={slide.clientLogo.width}
              height={slide.clientLogo.height}
              className="object-contain w-[84px] h-auto sm:w-[80px] md:w-[95px] lg:w-[110px] xl:w-[126px]"
            />
          </motion.div>
        )}

        {/* Description - fade in */}
        <motion.div
          className="w-[280px] sm:w-[450px] md:w-[550px] lg:w-[680px] xl:w-[793px] h-auto sm:h-[40px] md:h-[44px] lg:h-[48px] xl:h-[50px] mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px] flex items-center justify-center"
          variants={contentFadeIn(DESC_DELAY)}
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
                  <Image
                    src={slide.galleryImages[0].src}
                    alt={slide.galleryImages[0].alt}
                    fill
                    sizes="135px"
                    quality={100}
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <Image
                    src={slide.galleryImages[2].src}
                    alt={slide.galleryImages[2].alt}
                    fill
                    sizes="135px"
                    quality={100}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative rounded-[10px] overflow-hidden w-[280px] h-[100px]">
                <Image
                  src={slide.galleryImages[1].src}
                  alt={slide.galleryImages[1].alt}
                  fill
                  sizes="280px"
                  quality={100}
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Tablet Layout (sm to lg) - fade in */}
            <motion.div
              className="hidden sm:flex lg:hidden items-center justify-center gap-[8px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[15px] overflow-hidden"
                  style={{
                    width: `${Math.round(image.width * 0.7)}px`,
                    height: `${Math.round(image.height * 0.7)}px`,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={`${Math.round(image.width * 0.7)}px`}
                    quality={100}
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
        {/* Wisevisory Logo + Client Logo - fade in */}
        <motion.div
          className="flex flex-col items-center"
          variants={contentFadeIn(LOGO_DELAY)}
        >
          {slide.titleImage && (
            <Image
              src={slide.titleImage.src}
              alt={slide.titleImage.alt}
              width={slide.titleImage.width}
              height={slide.titleImage.height}
              className="object-contain w-[130px] h-auto sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[200px]"
            />
          )}
          {slide.clientLogo && (
            <Image
              src={slide.clientLogo.src}
              alt={slide.clientLogo.alt}
              width={slide.clientLogo.width}
              height={slide.clientLogo.height}
              className="object-contain w-[60px] h-auto sm:w-[55px] md:w-[70px] lg:w-[85px] xl:w-[75px]"
            />
          )}
        </motion.div>

        {/* Spacing 10px before description */}
        <div className="h-[10px]"></div>

        {/* Description - fade in */}
        <motion.div
          className="w-[280px] sm:w-[450px] md:w-[550px] lg:w-[680px] xl:w-[793px] h-auto sm:h-[40px] md:h-[44px] lg:h-[48px] xl:h-[50px] mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px] flex items-center justify-center"
          variants={contentFadeIn(DESC_DELAY)}
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
                  <Image
                    src={slide.galleryImages[0].src}
                    alt={slide.galleryImages[0].alt}
                    fill
                    sizes="135px"
                    quality={100}
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <Image
                    src={slide.galleryImages[2].src}
                    alt={slide.galleryImages[2].alt}
                    fill
                    sizes="135px"
                    quality={100}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative rounded-[10px] overflow-hidden w-[280px] h-[100px]">
                <Image
                  src={slide.galleryImages[1].src}
                  alt={slide.galleryImages[1].alt}
                  fill
                  sizes="280px"
                  quality={100}
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Tablet Layout (sm to xl) - Dusdukduk - fade in */}
            <motion.div
              className="hidden sm:flex xl:hidden items-center justify-center gap-[6px] md:gap-[8px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[12px] md:rounded-[15px] overflow-hidden"
                  style={{
                    width: `${Math.round(image.width * 0.55)}px`,
                    height: `${Math.round(image.height * 0.55)}px`,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={`${Math.round(image.width * 0.55)}px`}
                    quality={100}
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
        {/* Wisevisory Logo + Client Logo - fade in */}
        <motion.div
          className="flex flex-col items-center"
          variants={contentFadeIn(LOGO_DELAY)}
        >
          {slide.titleImage && (
            <Image
              src={slide.titleImage.src}
              alt={slide.titleImage.alt}
              width={slide.titleImage.width}
              height={slide.titleImage.height}
              className="object-contain w-[130px] h-auto sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[200px]"
            />
          )}
          {slide.clientLogo && (
            <Image
              src={slide.clientLogo.src}
              alt={slide.clientLogo.alt}
              width={slide.clientLogo.width}
              height={slide.clientLogo.height}
              className="object-contain w-[90px] h-auto sm:w-[85px] md:w-[100px] lg:w-[120px] xl:w-[130px]"
            />
          )}
        </motion.div>

        {/* Spacing 10px before description */}
        <div className="h-[10px]"></div>

        {/* Description - fade in */}
        <motion.div
          className="w-[280px] sm:w-[450px] md:w-[550px] lg:w-[680px] xl:w-[793px] h-auto sm:h-[40px] md:h-[44px] lg:h-[48px] xl:h-[50px] mb-[15px] sm:mb-[16px] md:mb-[18px] lg:mb-[20px] flex items-center justify-center"
          variants={contentFadeIn(DESC_DELAY)}
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
                  <Image
                    src={slide.galleryImages[0].src}
                    alt={slide.galleryImages[0].alt}
                    fill
                    sizes="135px"
                    quality={100}
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-[10px] overflow-hidden w-[135px] h-[100px]">
                  <Image
                    src={slide.galleryImages[2].src}
                    alt={slide.galleryImages[2].alt}
                    fill
                    sizes="135px"
                    quality={100}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative rounded-[10px] overflow-hidden w-[280px] h-[100px]">
                <Image
                  src={slide.galleryImages[1].src}
                  alt={slide.galleryImages[1].alt}
                  fill
                  sizes="280px"
                  quality={100}
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Tablet Layout (sm to xl) - Iluminen - fade in */}
            <motion.div
              className="hidden sm:flex xl:hidden items-center justify-center gap-[6px] md:gap-[8px]"
              variants={contentFadeIn(IMAGES_DELAY)}
            >
              {slide.galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[12px] md:rounded-[15px] overflow-hidden"
                  style={{
                    width: `${Math.round(image.width * 0.55)}px`,
                    height: `${Math.round(image.height * 0.55)}px`,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={`${Math.round(image.width * 0.55)}px`}
                    quality={100}
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides = projectsData;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Touch handlers for swipe
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

  // Auto-advance slides every 10 seconds - resets when slide changes
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentSlide, nextSlide]);

  return (
    <section
      id="projects"
      className="relative h-auto sm:h-[480px] md:h-[540px] lg:h-[640px] xl:h-[780px] py-[20px] sm:py-0 overflow-hidden flex items-start"
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
          {/* Previous Button - Only visible on desktop (lg+) */}
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

          {/* Slides with AnimatePresence for slide animation */}
          <div
            className="w-full h-full overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
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
                  slide={slides[currentSlide]}
                  slideKey={currentSlide}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button - Only visible on desktop (lg+) */}
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

          {/* Dot Indicators */}
          <div className="absolute bottom-[-30px] sm:bottom-[-25px] md:bottom-[-28px] lg:bottom-[-32px] xl:bottom-[-35px] left-1/2 -translate-x-1/2 z-20 flex gap-[8px]">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-[#D79C60]"
                    : "bg-[#D79C60]/40 hover:bg-[#D79C60]/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
