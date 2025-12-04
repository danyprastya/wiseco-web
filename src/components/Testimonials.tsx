"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { testimonialsData, TestimonialSlide } from "@/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";

// Timing configuration for Testimonials
const SLIDE_TRANSITION_DURATION = 0.5; // Duration of slide animation
const CONTENT_START_DELAY = 0.3; // Delay before content starts appearing
const PHOTO_LOGO_DELAY = CONTENT_START_DELAY; // Photo and logo fade in first
const NAME_POSITION_DELAY = CONTENT_START_DELAY + 0.2; // Name and position slide from top
const TESTIMONIAL_DELAY = CONTENT_START_DELAY + 0.4; // Testimonial text slides from top
const ACTIVITY_DELAY = CONTENT_START_DELAY + 0.6; // Activity image fades in last

// Fade in animation for content
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

// Slide from top animation
const slideFromTop = (delay: number) => ({
  hidden: { opacity: 0, y: -30 },
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

// Slide animation variants for navigation - slides "stick" together
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
    transition: {
      x: {
        type: "tween" as const,
        duration: SLIDE_TRANSITION_DURATION,
        ease: "linear" as const,
      },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    transition: {
      x: {
        type: "tween" as const,
        duration: SLIDE_TRANSITION_DURATION,
        ease: "linear" as const,
      },
    },
  }),
};

// Function to render text with bold phrases
function renderTestimonialText(text: string, boldPhrases: string[]) {
  const parts: { text: string; bold: boolean }[] = [];

  // Create a regex pattern to match any of the bold phrases
  const pattern = new RegExp(
    `(${boldPhrases
      .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "gi"
  );

  const splitParts = text.split(pattern);

  splitParts.forEach((part) => {
    if (part) {
      const isBold = boldPhrases.some(
        (phrase) => phrase.toLowerCase() === part.toLowerCase()
      );
      parts.push({ text: part, bold: isBold });
    }
  });

  return parts.map((part, index) =>
    part.bold ? (
      <strong key={index} className="font-bold">
        {part.text}
      </strong>
    ) : (
      <span key={index}>{part.text}</span>
    )
  );
}

// Slide Content Component
function SlideContent({
  slide,
  slideKey,
}: {
  slide: TestimonialSlide;
  slideKey: number;
}) {
  return (
    <motion.div
      key={slideKey}
      className="relative h-auto sm:h-[520px] md:h-[600px] lg:h-[660px] xl:h-[721px] w-full overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${slide.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
        }}
      ></div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: slide.overlayColor,
          opacity: 0.8,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center py-[30px] sm:py-0">
        {/* 65px spacing from top - hidden on mobile */}
        <div className="hidden sm:block h-[65px]"></div>

        {/* Mobile: Vertical layout (photo on top, logo below) - fade in */}
        <motion.div
          className="flex sm:hidden flex-col items-center gap-[15px]"
          variants={contentFadeIn(PHOTO_LOGO_DELAY)}
        >
          {/* Owner Photo */}
          <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
            <Image
              src={slide.ownerImage}
              alt={slide.ownerName}
              fill
              sizes="100px"
              className="object-cover"
              style={{
                objectPosition: slide.ownerImagePosition || "center",
                transform: `scale(${slide.ownerImageScale || 1})`,
              }}
              quality={100}
            />
          </div>

          {/* Company Logo - Mobile */}
          <div
            className="relative"
            style={{
              width:
                slide.mobileCompanyLogoWidth ||
                Math.round(slide.companyLogoWidth * 0.6),
              height:
                slide.mobileCompanyLogoHeight ||
                Math.round(slide.companyLogoHeight * 0.6),
            }}
          >
            <Image
              src={slide.companyLogo}
              alt="Company Logo"
              fill
              quality={100}
            />
          </div>
        </motion.div>

        {/* Desktop: Owner photo, line, and company logo row - fade in */}
        <motion.div
          className="hidden sm:flex items-center"
          variants={contentFadeIn(PHOTO_LOGO_DELAY)}
        >
          {/* Owner Photo Container - fixed width to match logo container */}
          <div className="w-[180px] md:w-[210px] lg:w-[230px] xl:w-[250px] flex justify-end">
            <div className="relative w-[100px] h-[100px] md:w-[115px] md:h-[115px] lg:w-[125px] lg:h-[125px] xl:w-[135px] xl:h-[135px] rounded-full overflow-hidden">
              <Image
                src={slide.ownerImage}
                alt={slide.ownerName}
                fill
                sizes="135px"
                className="object-cover"
                style={{
                  objectPosition: slide.ownerImagePosition || "center",
                  transform: `scale(${slide.ownerImageScale || 1})`,
                }}
                quality={100}
              />
            </div>
          </div>

          {/* 30px gap */}
          <div className="w-[20px] md:w-[24px] lg:w-[27px] xl:w-[30px]"></div>

          {/* Vertical line */}
          <div className="w-[1px] h-[75px] md:h-[85px] lg:h-[92px] xl:h-[100px] bg-white"></div>

          {/* 30px gap */}
          <div className="w-[20px] md:w-[24px] lg:w-[27px] xl:w-[30px]"></div>

          {/* Company Logo Container - fixed width to match owner container */}
          <div className="w-[180px] md:w-[210px] lg:w-[230px] xl:w-[250px] flex justify-start items-center">
            <div
              className="relative"
              style={{
                width: slide.companyLogoWidth,
                height: slide.companyLogoHeight,
              }}
            >
              <Image
                src={slide.companyLogo}
                alt="Company Logo"
                fill
                quality={100}
              />
            </div>
          </div>
        </motion.div>

        {/* 15px spacing */}
        <div className="h-[10px] sm:h-[15px]"></div>

        {/* Owner Name - slide from top */}
        <motion.h3
          className="text-[18px] sm:text-[22px] md:text-[25px] lg:text-[27px] xl:text-[30px] text-center"
          style={{
            color: slide.ownerNameColor,
            fontFamily: "Avenir, sans-serif",
          }}
          variants={slideFromTop(NAME_POSITION_DELAY)}
        >
          <strong>{slide.ownerName}</strong>
        </motion.h3>

        {/* Position - slide from top with delay */}
        <motion.p
          className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-normal text-white text-center"
          variants={slideFromTop(NAME_POSITION_DELAY + 0.1)}
        >
          {slide.position}
        </motion.p>

        {/* 25px spacing - reduced on mobile */}
        <div className="h-[15px] sm:h-[25px]"></div>

        {/* Testimonial Text - slide from top with delay */}
        <motion.div
          className="w-[280px] sm:w-[600px] md:w-[720px] lg:w-[800px] xl:w-[860px] h-auto sm:h-[70px] md:h-[78px] lg:h-[84px] xl:h-[90px] flex items-center justify-center px-4"
          variants={slideFromTop(TESTIMONIAL_DELAY)}
        >
          <p className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[15px] font-medium text-white text-center leading-[1.5]">
            {renderTestimonialText(slide.testimonialText, slide.boldPhrases)}
          </p>
        </motion.div>

        {/* 30px spacing - reduced on mobile */}
        <div className="h-[15px] sm:h-[30px]"></div>

        {/* Activity Photo - fade in last */}
        <motion.div
          className="relative w-[240px] h-[105px] sm:w-[360px] sm:h-[160px] md:w-[420px] md:h-[185px] lg:w-[465px] lg:h-[205px] xl:w-[505px] xl:h-[222px] rounded-[10px] sm:rounded-[15px] md:rounded-[18px] lg:rounded-[20px] xl:rounded-[20px] overflow-hidden"
          variants={contentFadeIn(ACTIVITY_DELAY)}
        >
          <Image
            src={slide.activityImage}
            alt="Activity"
            fill
            sizes="(max-width: 640px) 240px, 505px"
            className="object-cover"
            quality={100}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const totalSlides = testimonialsData.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
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
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Auto-advance slides every 10 seconds - resets when slide changes
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  return (
    <section
      id="testimonies"
      className="h-auto sm:h-[520px] md:h-[600px] lg:h-[660px] xl:h-[721px] overflow-hidden relative bg-[#333333]"
    >
      {/* Slides Container with slide transition */}
      <div
        className="w-full h-full touch-pan-y overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full absolute inset-0"
          >
            <SlideContent
              slide={testimonialsData[currentIndex]}
              slideKey={currentIndex}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Navigation Button - Only visible on desktop (lg+) */}
      <button
        onClick={goToPrevious}
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
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Right Navigation Button - Only visible on desktop (lg+) */}
      <button
        onClick={goToNext}
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
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-[20px] sm:bottom-[25px] md:bottom-[30px] lg:bottom-[35px] xl:bottom-[40px] left-1/2 -translate-x-1/2 z-20 flex gap-[8px]">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full transition-colors ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
