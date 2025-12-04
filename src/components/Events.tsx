"use client";

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
          <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold text-[#D79C60] section-title">
            Events
          </h2>
        </div>

        {/* Spacing */}
        <div className="h-[15px] sm:h-[18px] md:h-[20px] lg:h-[22px] xl:h-[25px]"></div>

        {/* Coming Soon 2026 */}
        <div className="flex justify-center items-center min-h-[300px]">
          <h3 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] xl:text-[72px] font-bold text-[#D79C60] text-center">
            COMING SOON 2026
          </h3>
        </div>
      </div>
    </section>
  );
}
