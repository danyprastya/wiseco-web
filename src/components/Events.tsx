"use client";

import Image from "next/image";

export default function Events() {
  return (
    <section className="relative h-[669px] bg-white overflow-hidden">
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
      <div className="relative z-10">
        {/* 55px spacing from top */}
        <div className="h-[55px]"></div>

        <div className="h-[56px] flex items-center justify-center">
          <h2 className="section-title">Events</h2>
        </div>

        {/* 25px spacing to content */}
        <div className="h-[25px]"></div>

        {/* Archipreneur Title */}
        <div className="flex justify-center">
          <h3 className="text-[40px] font-semibold text-[#333333]">
            Archipreneur
          </h3>
        </div>

        {/* 15px spacing */}
        <div className="h-[15px]"></div>

        {/* Image and Text Component */}
        <div className="flex justify-center">
          <div className="flex items-start gap-[45px]">
            {/* Image */}
            <div className="relative w-[324px] h-[406px] overflow-hidden flex-shrink-0">
              <Image
                src="/images/event/Archipreneur.jpg"
                alt="Archipreneur Event"
                fill
                sizes="324px"
                quality={100}
              />
            </div>

            {/* Text */}
            <div className="w-[425px]">
              <p className="text-[12px] font-medium leading-[1.4] text-[#333333] whitespace-pre-line">
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
