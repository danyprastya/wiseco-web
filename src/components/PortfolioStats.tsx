"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PortfolioStats() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="bg-white h-[507px]">
      <div
        className="w-full"
        style={{ paddingLeft: "468px", paddingRight: "468px" }}
      >
        <h2 className="section-title mb-12">Portfolio</h2>

        <div className="flex justify-center gap-[20px] mb-[90px]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="w-[266px] flex flex-col items-center justify-center text-center"
            >
              <div
                id={`counter-${index}`}
                className="text-[80px] font-bold text-[#333333] leading-[1.4]"
              >
                0
              </div>
              <div className="text-[20px] text-[#333333] leading-[1.1]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logo Marquee */}
        <div className="w-[920px] h-[45px] mx-auto overflow-hidden relative">
          <div className="flex gap-[50px] animate-marquee">
            {/* First set of logos */}
            {clientLogos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="flex-shrink-0 h-[45px] flex items-center"
              >
                <Image
                  src={`/images/logo marquee klien/${logo}`}
                  alt={`Client ${index + 1}`}
                  width={200}
                  height={45}
                  className="h-[45px] w-auto object-contain"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {clientLogos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="flex-shrink-0 h-[45px] flex items-center"
              >
                <Image
                  src={`/images/logo marquee klien/${logo}`}
                  alt={`Client ${index + 1}`}
                  width={200}
                  height={45}
                  className="h-[45px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
