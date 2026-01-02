"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Testimonial } from "@/lib/db-types";
import { motion, AnimatePresence } from "framer-motion";

// Timing configuration for Testimonials
const SLIDE_TRANSITION_DURATION = 0.5;
const CONTENT_START_DELAY = 0.3;
const PHOTO_LOGO_DELAY = CONTENT_START_DELAY;
const NAME_POSITION_DELAY = CONTENT_START_DELAY + 0.2;
const TESTIMONIAL_DELAY = CONTENT_START_DELAY + 0.4;
const ACTIVITY_DELAY = CONTENT_START_DELAY + 0.6;

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

// Slide animation variants for navigation
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
  if (!boldPhrases || boldPhrases.length === 0) {
    return <span>{text}</span>;
  }

  const parts: { text: string; bold: boolean }[] = [];
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
  slide: Testimonial;
  slideKey: number;
}) {
  // Get owner image position or defaults
  const ownerImgPos = slide.ownerImagePosition || { x: 50, y: 50, scale: 1 };

  return (
    <motion.div
      key={slideKey}
      className="relative h-[580px] sm:h-[580px] md:h-[680px] lg:h-[750px] xl:h-[820px] w-full overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${slide.backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Overlay - fixed color */}
      <div className="absolute inset-0 bg-[#333333]/80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center py-[15px] sm:py-0">
        {/* 65px spacing from top - hidden on mobile */}
        <div className="hidden sm:block sm:h-[40px] md:h-[45px] lg:h-[55px] xl:h-[65px]"></div>

        {/* Mobile: Vertical layout */}
        <motion.div
          className="flex sm:hidden flex-col items-center gap-[8px]"
          variants={contentFadeIn(PHOTO_LOGO_DELAY)}
        >
          <div
            className="relative w-[100px] h-[100px] rounded-full overflow-hidden"
            style={{
              transform: `scale(${ownerImgPos.scale})`,
            }}
          >
            <Image
              src={slide.ownerImageUrl}
              alt={slide.ownerName}
              fill
              sizes="100px"
              className="object-cover"
              style={{
                objectPosition: `${ownerImgPos.x}% ${ownerImgPos.y}%`,
              }}
              quality={100}
            />
          </div>
          <div className="relative w-[80px] h-[40px]">
            <Image
              src={slide.companyLogoUrl}
              alt="Company Logo"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </motion.div>

        {/* Desktop: Owner photo, line, and company logo row - Equal spacing */}
        <motion.div
          className="hidden sm:flex items-center justify-center"
          variants={contentFadeIn(PHOTO_LOGO_DELAY)}
        >
          {/* Owner photo - gap to divider = mx value */}
          <div className="relative w-[100px] h-[100px] md:w-[115px] md:h-[115px] lg:w-[130px] lg:h-[130px] xl:w-[145px] xl:h-[145px] rounded-full overflow-hidden">
            <Image
              src={slide.ownerImageUrl}
              alt={slide.ownerName}
              fill
              sizes="145px"
              className="object-cover"
              style={{
                objectPosition: `${ownerImgPos.x}% ${ownerImgPos.y}%`,
                transform: `scale(${ownerImgPos.scale})`,
              }}
              quality={100}
            />
          </div>

          {/* Divider Line - equal gap on both sides */}
          <div className="mx-[20px] md:mx-[25px] lg:mx-[30px] xl:mx-[35px] w-[2px] h-[100px] md:h-[115px] lg:h-[130px] xl:h-[145px] bg-white rounded-full"></div>

          {/* Company Logo - gap to divider = mx value (same as photo) */}
          <div className="relative w-[130px] h-[65px] md:w-[150px] md:h-[75px] lg:w-[170px] lg:h-[85px] xl:w-[190px] xl:h-[95px] flex items-center">
            <Image
              src={slide.companyLogoUrl}
              alt="Company Logo"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </motion.div>

        {/* Owner Name - slide from bottom */}
        <motion.div
          className="mt-[12px] sm:mt-[18px] md:mt-[22px] lg:mt-[26px] xl:mt-[30px]"
          variants={slideFromBottom(NAME_POSITION_DELAY)}
        >
          <p className="text-[#D79C60] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] xl:text-[34px] font-bold text-center">
            {slide.ownerName}
          </p>
        </motion.div>

        {/* Position - slide from bottom */}
        <motion.p
          className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-normal text-white text-center"
          variants={slideFromBottom(NAME_POSITION_DELAY + 0.1)}
        >
          {slide.position}
        </motion.p>

        {/* Testimonial Text - slide from bottom, increased font weight, tighter line height */}
        <motion.div
          className="mt-[12px] sm:mt-[16px] md:mt-[18px] lg:mt-[22px] xl:mt-[26px] w-[320px] sm:w-[520px] md:w-[620px] lg:w-[720px] xl:w-[850px] px-[10px] sm:px-0"
          variants={slideFromBottom(TESTIMONIAL_DELAY)}
        >
          <p className="text-white text-[12px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px] font-medium text-center leading-[1.5] sm:leading-[1.6]">
            &ldquo;
            {renderTestimonialText(slide.testimonialText, slide.boldPhrases)}
            &rdquo;
          </p>
        </motion.div>

        {/* Activity Image - fade in */}
        <motion.div
          className="mt-[18px] sm:mt-[22px] md:mt-[26px] lg:mt-[32px] xl:mt-[38px]"
          variants={contentFadeIn(ACTIVITY_DELAY)}
        >
          <div className="relative w-[240px] h-[60px] sm:w-[320px] sm:h-[108px] md:w-[380px] md:h-[144px] lg:w-[400px] lg:h-[168px] xl:w-[460px] xl:h-[204px] rounded-[10px] sm:rounded-[15px] md:rounded-[18px] lg:rounded-[20px] overflow-hidden">
            <Image
              src={slide.activityImageUrl}
              alt="Activity"
              fill
              sizes="(max-width: 640px) 220px, (max-width: 768px) 320px, (max-width: 1024px) 380px, (max-width: 1280px) 440px, 520px"
              className="object-cover"
              quality={100}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="relative h-[580px] sm:h-[580px] md:h-[680px] lg:h-[750px] xl:h-[820px] w-full bg-[#333333] flex flex-col items-center py-[15px] sm:py-0">
      <div className="hidden sm:block sm:h-[40px] md:h-[45px] lg:h-[55px] xl:h-[65px]"></div>
      <div className="flex items-center gap-4">
        <div className="w-[100px] h-[100px] rounded-full bg-gray-600 animate-pulse"></div>
        <div className="w-[2px] h-[100px] bg-gray-600"></div>
        <div className="w-[130px] h-[65px] bg-gray-600 animate-pulse rounded"></div>
      </div>
      <div className="mt-[20px] w-[200px] h-[34px] bg-gray-600 animate-pulse rounded"></div>
      <div className="mt-[10px] w-[150px] h-[20px] bg-gray-600 animate-pulse rounded"></div>
      <div className="mt-[20px] w-[700px] h-[100px] bg-gray-600 animate-pulse rounded"></div>
      <div className="mt-[30px] w-[380px] h-[228px] bg-gray-600 animate-pulse rounded-[20px]"></div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/data/testimonials");
        const data = await response.json();
        if (data.data) setTestimonials(data.data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const totalSlides = testimonials.length;
  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    if (totalSlides === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrevious = () => {
    if (totalSlides === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
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
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Auto-advance slides every 10 seconds
  useEffect(() => {
    if (totalSlides === 0) return;
    const timer = setInterval(() => {
      goToNext();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext, totalSlides]);

  return (
    <section
      id="testimonies"
      className="h-[580px] sm:h-[580px] md:h-[680px] lg:h-[750px] xl:h-[820px] overflow-hidden relative bg-[#333333]"
    >
      {/* Slides Container */}
      <div
        className="w-full h-full touch-pan-y overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isLoading ? (
          <LoadingSkeleton />
        ) : testimonials.length > 0 ? (
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
                slide={testimonials[currentIndex]}
                slideKey={currentIndex}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">No testimonials available</p>
          </div>
        )}
      </div>

      {/* Left Navigation Button */}
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

      {/* Right Navigation Button */}
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
      {testimonials.length > 0 && (
        <div className="absolute bottom-[20px] sm:bottom-[25px] md:bottom-[30px] lg:bottom-[35px] xl:bottom-[40px] left-1/2 -translate-x-1/2 z-20 flex gap-[8px]">
          {testimonials.map((_, index) => (
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
      )}
    </section>
  );
}
