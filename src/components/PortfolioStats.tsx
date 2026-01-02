"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Marquee from "react-fast-marquee";
import { PortfolioLogo } from "@/lib/db-types";

export default function PortfolioStats() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [clientLogos, setClientLogos] = useState<PortfolioLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      startValue: 50,
      endValue: 400,
      suffix: "+",
      label: "Indonesian Brands",
    },
    {
      startValue: 5,
      endValue: 50,
      suffix: "+",
      label: "Industry Fields",
    },
    {
      startValue: 5,
      endValue: 20,
      suffix: "+",
      label: "Countries",
    },
  ];

  // Fetch portfolio logos from API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch("/api/data/portfolio-logos");
        const data = await response.json();
        if (data.data) {
          setClientLogos(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio logos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogos();
  }, []);

  // Preload all images before showing marquee
  const handleImageLoad = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (
      !isLoading &&
      clientLogos.length > 0 &&
      loadedCount >= clientLogos.length
    ) {
      // Small delay to ensure smooth animation start
      const timer = setTimeout(() => {
        setImagesLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, clientLogos.length, loadedCount]);

  const countElement = (
    elementId: string,
    startValue: number,
    endValue: number,
    prefix: string = "",
    suffix: string = ""
  ) => {
    const duration = 2000;
    const increment = (endValue - startValue) / (duration / 20);
    let currentValue = startValue;

    const timer = setInterval(() => {
      currentValue += increment;
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent =
          prefix +
          `${Math.round(currentValue).toLocaleString("en-US")}${suffix}`;
      }

      if (currentValue >= endValue) {
        clearInterval(timer);
      }
    }, 20);
  };

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      countElement(
        `counter-${index}`,
        stat.startValue,
        stat.endValue,
        "",
        stat.suffix
      );
    });
  };

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="bg-[#F5F5F5] h-auto sm:h-[320px] md:h-[370px] lg:h-[430px] xl:h-[507px] py-[20px] sm:py-0"
    >
      <div className="w-full px-[20px] sm:px-4 md:px-8 lg:px-12 xl:px-[100px]">
        {/* Spacing from top */}
        <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

        <div className="h-[40px] sm:h-[42px] md:h-[48px] lg:h-[52px] xl:h-[56px] flex items-center justify-center">
          <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold text-[#D79C60] section-title">
            Portfolio
          </h2>
        </div>

        {/* Spacing to content */}
        <div className="h-[15px] sm:h-[18px] md:h-[20px] lg:h-[22px] xl:h-[25px]"></div>

        {/* Stats - vertical on mobile, horizontal on larger screens */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-[8px] sm:gap-[30px] md:gap-[45px] lg:gap-[60px] xl:gap-[100px] mb-[20px] sm:mb-[35px] md:mb-[50px] lg:mb-[70px] xl:mb-[90px]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <div
                id={`counter-${index}`}
                className="text-[26px] sm:text-[35px] md:text-[48px] lg:text-[64px] xl:text-[80px] font-bold text-[#333333] leading-[1.2] sm:leading-[1.4]"
              >
                0
              </div>
              <div className="text-[16px] sm:text-[11px] md:text-[14px] lg:text-[17px] xl:text-[20px] text-[#333333] leading-[1.1] mt-[10px] sm:mt-0 lg:mt-[8px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logo Marquee */}
        <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:max-w-[750px] mx-auto">
          {isLoading || !imagesLoaded ? (
            <div className="h-[48px] flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 h-8 w-full rounded"></div>
            </div>
          ) : clientLogos.length > 0 ? (
            <Marquee speed={50} gradient={false} pauseOnHover={false}>
              {clientLogos.map((logo, index) => (
                <div
                  key={`logo-${logo.id}-${index}`}
                  className="flex-shrink-0 flex items-center mx-[10px] sm:mx-[10px] md:mx-[12px] lg:mx-[14px] xl:mx-[20px] h-[32px] sm:h-[34px] md:h-[38px] lg:h-[42px] xl:h-[48px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.imageUrl}
                    alt={logo.name}
                    loading="eager"
                    className="object-contain h-full w-auto"
                  />
                </div>
              ))}
            </Marquee>
          ) : null}

          {/* Hidden preloader for images */}
          {!isLoading && !imagesLoaded && clientLogos.length > 0 && (
            <div className="hidden">
              {clientLogos.map((logo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`preload-${logo.id}`}
                  src={logo.imageUrl}
                  alt=""
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
