"use client";

import Image from "next/image";
import { useState } from "react";
import { testimonialsData, TestimonialSlide } from "@/data/testimonials";

// Function to render text with bold phrases
function renderTestimonialText(text: string, boldPhrases: string[]) {
  let result = text;
  const parts: { text: string; bold: boolean }[] = [];

  // Create a regex pattern to match any of the bold phrases
  const pattern = new RegExp(
    `(${boldPhrases
      .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "gi"
  );

  const splitParts = result.split(pattern);

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
function SlideContent({ slide }: { slide: TestimonialSlide }) {
  return (
    <div className="relative h-[721px] w-full overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center">
        {/* 65px spacing from top */}
        <div className="h-[65px]"></div>

        {/* Owner photo, line, and company logo row */}
        <div className="flex items-center">
          {/* Owner Photo */}
          <div className="relative w-[135px] h-[135px] rounded-full overflow-hidden">
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

          {/* 30px gap */}
          <div className="w-[30px]"></div>

          {/* Vertical line */}
          <div className="w-[1px] h-[100px] bg-white"></div>

          {/* 30px gap */}
          <div className="w-[30px]"></div>

          {/* Company Logo */}
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
              className="object-cover"
              quality={100}
            />
          </div>
        </div>

        {/* 15px spacing */}
        <div className="h-[15px]"></div>

        {/* Owner Name */}
        <h3
          className="text-[30px] text-center"
          style={{
            color: slide.ownerNameColor,
            fontFamily: "Avenir, sans-serif",
          }}
        >
          <strong>{slide.ownerName}</strong>
        </h3>

        {/* Position */}
        <p className="text-[18px] font-normal text-white text-center">
          {slide.position}
        </p>

        {/* 25px spacing */}
        <div className="h-[25px]"></div>

        {/* Testimonial Text */}
        <div className="w-[860px] h-[90px] flex items-center justify-center px-4">
          <p className="text-[15px] font-medium text-white text-center leading-[1.5]">
            {renderTestimonialText(slide.testimonialText, slide.boldPhrases)}
          </p>
        </div>

        {/* 30px spacing */}
        <div className="h-[30px]"></div>

        {/* Activity Photo */}
        <div className="relative w-[505px] h-[222px] rounded-[20px] overflow-hidden">
          <Image
            src={slide.activityImage}
            alt="Activity"
            fill
            sizes="505px"
            className="object-cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonialsData.length;

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="h-[721px] overflow-hidden relative">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {testimonialsData.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <SlideContent slide={slide} />
          </div>
        ))}
      </div>

      {/* Left Navigation Button */}
      <button
        onClick={goToPrevious}
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
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-20 flex gap-[8px]">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-[6px] h-[6px] rounded-full transition-colors ${
              index === currentSlide
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
