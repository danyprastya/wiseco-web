"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slides = [
    {
      id: 1,
      title: "BISLAF",
      subtitle: "Bisnis Layak Funding",
      logos: ["KemenkopUKM", "wise.co"],
      description:
        "2024 - A collaboration between KemenkopUKM RI and wiseco.id to prepare Indonesian SMEs to become fundable businesses. This program was conducted in 6 regions of Indonesia and concluded with pitching to funders at the end of each regional event.",
      image: "/images/bislaf-1.jpg",
    },
    {
      id: 2,
      title: "Project 2",
      subtitle: "Subtitle 2",
      logos: ["Logo 1", "Logo 2"],
      description: "Description for project 2",
      image: "/images/project-2.jpg",
    },
    {
      id: 3,
      title: "Project 3",
      subtitle: "Subtitle 3",
      logos: ["Logo 1", "Logo 2"],
      description: "Description for project 3",
      image: "/images/project-3.jpg",
    },
    {
      id: 4,
      title: "Project 4",
      subtitle: "Subtitle 4",
      logos: ["Logo 1", "Logo 2"],
      description: "Description for project 4",
      image: "/images/project-4.jpg",
    },
  ];

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(timer);
  }, []);

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
        <h2 className="section-title mb-6 md:mb-10 lg:mb-16">Projects</h2>

        {/* Slider Container */}
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[523px] flex items-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 lg:left-8 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#333333]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
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
                <div className="h-full bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden flex flex-col p-4 md:p-6 lg:p-8 items-center">
                  {/* Title */}
                  <div className="mb-2 md:mb-3 lg:mb-4 text-center">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] mb-0.5 md:mb-1">
                      {slides[slides.length - 1].title}
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg text-[#D79C60]">
                      {slides[slides.length - 1].subtitle}
                    </p>
                  </div>

                  {/* Logos */}
                  <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3 lg:mb-4">
                    {slides[slides.length - 1].logos.map((logo, idx) => (
                      <div
                        key={idx}
                        className="text-xs md:text-sm text-[#333333] font-medium"
                      >
                        {logo}
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[#333333] leading-relaxed mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm text-center">
                    {slides[slides.length - 1].description}
                  </p>

                  {/* Image Section - Landscape */}
                  <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={slides[slides.length - 1].image}
                      alt={slides[slides.length - 1].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Original slides */}
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full h-full flex-shrink-0 px-4 md:px-12 lg:px-20"
                >
                  <div className="h-full bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden flex flex-col p-4 md:p-6 lg:p-8 items-center">
                    {/* Title */}
                    <div className="mb-2 md:mb-3 lg:mb-4 text-center">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] mb-0.5 md:mb-1">
                        {slide.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-[#D79C60]">
                        {slide.subtitle}
                      </p>
                    </div>

                    {/* Logos */}
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

                    {/* Description */}
                    <p className="text-[#333333] leading-relaxed mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm text-center">
                      {slide.description}
                    </p>

                    {/* Image Section - Landscape */}
                    <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Clone of first slide */}
              <div className="w-full h-full flex-shrink-0 px-4 md:px-12 lg:px-20">
                <div className="h-full bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden flex flex-col p-4 md:p-6 lg:p-8 items-center">
                  {/* Title */}
                  <div className="mb-2 md:mb-3 lg:mb-4 text-center">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] mb-0.5 md:mb-1">
                      {slides[0].title}
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg text-[#D79C60]">
                      {slides[0].subtitle}
                    </p>
                  </div>

                  {/* Logos */}
                  <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3 lg:mb-4">
                    {slides[0].logos.map((logo, idx) => (
                      <div
                        key={idx}
                        className="text-xs md:text-sm text-[#333333] font-medium"
                      >
                        {logo}
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[#333333] leading-relaxed mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm text-center">
                    {slides[0].description}
                  </p>

                  {/* Image Section - Landscape */}
                  <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={slides[0].image}
                      alt={slides[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 lg:right-8 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#333333]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
