"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function PortfolioStats() {
  const [hasAnimated, setHasAnimated] = useState(false);
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

  const clientLogos = [
    "Logo Aimono.png",
    "Logo Alkahf.png",
    "Logo Ann_s.png",
    "Logo Asta.png",
    "Logo Buanatama.png",
    "Logo Cara Florist.png",
    "Logo Cottoncut.png",
    "Logo Dassein.png",
    "Logo Dusdukduk.png",
    "Logo Fatih.png",
    "Logo Guresu.png",
    "Logo Hamada.png",
    "Logo Happy Play.png",
    "Logo Heart Troops.png",
    "Logo HGL.png",
    "Logo Hira.png",
    "Logo Iluminen.png",
    "Logo Karyatama.png",
    "Logo KemenkopUKM.png",
    "Logo Konner.png",
    "Logo Lawe.png",
    "Logo Masalinen.png",
    "Logo ONS.png",
    "Logo Oseanland.png",
    "Logo Papakibo.png",
    "Logo PLN Pusmanpro.png",
    "Logo Ria Miranda.png",
    "Logo STEM.png",
    "Logo Thenblank.png",
    "Logo Torch.png",
    "Logo Union Filter.png",
    "Logo Walking Drums.png",
  ];

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
      className="bg-white h-auto sm:h-[320px] md:h-[370px] lg:h-[430px] xl:h-[507px] py-[20px] sm:py-0"
    >
      <div className="w-full px-[20px] sm:px-4 md:px-8 lg:px-12 xl:px-[100px]">
        {/* Spacing from top */}
        <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

        <div className="h-[40px] sm:h-[42px] md:h-[48px] lg:h-[52px] xl:h-[56px] flex items-center justify-center">
          <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold text-[#D79C60] section-title">
            Portfolio
          </h2>
        </div>

        {/* Spacing to content */}
        <div className="h-[15px] sm:h-[18px] md:h-[20px] lg:h-[22px] xl:h-[25px]"></div>

        {/* Stats - vertical on mobile, horizontal on larger screens */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-[10px] sm:gap-[40px] md:gap-[60px] lg:gap-[80px] xl:gap-[100px] mb-[20px] sm:mb-[35px] md:mb-[50px] lg:mb-[70px] xl:mb-[90px]">
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
        <div className="w-full xl:max-w-[850px] xl:mx-auto">
          <Marquee speed={100} gradient={false} pauseOnHover={false}>
            {clientLogos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 h-[45px] sm:h-[32px] md:h-[38px] lg:h-[52px] xl:h-[52px] flex items-center mx-[20px] sm:mx-[22px] md:mx-[25px] lg:mx-[28px] xl:mx-[30px]"
              >
                <Image
                  src={`/images/logo marquee klien/${logo}`}
                  alt={`Client ${index + 1}`}
                  width={220}
                  height={52}
                  className="h-[45px] sm:h-[32px] md:h-[38px] lg:h-[52px] xl:h-[52px] w-auto object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
