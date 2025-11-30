"use client";

import Image from "next/image";

export default function Events() {
  return (
    <section
      id="events"
      className="relative h-auto sm:h-[480px] md:h-[540px] lg:h-[600px] xl:h-[669px] py-[20px] sm:py-0 bg-white overflow-hidden"
    >
      {/* Background image - parallax effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          backgroundAttachment: "fixed",
        }}
      ></div>
      <div className="absolute inset-0 bg-white/[0.65]"></div>

      {/* Content */}
      <div className="relative z-10 px-[20px] sm:px-0">
        {/* Spacing from top */}
        <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

        <div className="h-[40px] sm:h-[42px] md:h-[48px] lg:h-[52px] xl:h-[56px] flex items-center justify-center">
          <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold text-[#D79C60] section-title">
            Events
          </h2>
        </div>

        {/* Spacing */}
        <div className="h-[15px] sm:h-[18px] md:h-[20px] lg:h-[22px] xl:h-[25px]"></div>

        {/* Archipreneur Title */}
        <div className="flex justify-center">
          <h3 className="text-[21px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-semibold text-[#333333]">
            Archipreneur
          </h3>
        </div>

        {/* Spacing */}
        <div className="h-[10px] sm:h-[12px] md:h-[15px]"></div>

        {/* Image and Text Component */}
        <div className="flex justify-center">
          {/* Mobile: vertical stack, Desktop: horizontal */}
          <div className="flex flex-col sm:flex-row items-center gap-[15px] sm:gap-[25px] md:gap-[32px] lg:gap-[38px] xl:gap-[45px]">
            {/* Image */}
            <div className="relative w-[190px] h-[238px] sm:w-[220px] sm:h-[275px] md:w-[260px] md:h-[325px] lg:w-[295px] lg:h-[370px] xl:w-[324px] xl:h-[406px] overflow-hidden flex-shrink-0">
              <Image
                src="/images/event/Archipreneur.jpg"
                alt="Archipreneur Event"
                fill
                sizes="(max-width: 640px) 190px, (max-width: 768px) 220px, (max-width: 1024px) 260px, (max-width: 1280px) 295px, 324px"
                quality={100}
              />
            </div>

            {/* Text */}
            <div className="w-[280px] sm:w-[280px] md:w-[340px] lg:w-[385px] xl:w-[425px]">
              <p className="text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] font-medium leading-[1.4] text-[#333333] whitespace-pre-line text-left">
                {`ARSWOW TALKSHOW : ARCHIPRENEUR 2025
Exhibition and Talkshow Architects with:

Ar. Novriansyah Yakub, IAI | Founder Atelier Riri
Rega Poetra | Founder KONARS+
Rizky Wihardi | CEO wiseco.id
Meizan Nataadiningrat | Co-founder KEUKEN
Dendi Adhitya | Incinerator Center

Moderator : Wyra Tarigan - Founder & CEO Polux Cabin

🗓 Date: Sabtu, 29 November 2025
🕒 Time: 09.00 -14.00 WIB

📍Where: Nerd Laboratory Laswi Heritage Bandung | Jl Sukabumi No.20 Bandung

Organized by ARSWOW
For More Info RSVP
CP : Miftah - 089672182558`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
