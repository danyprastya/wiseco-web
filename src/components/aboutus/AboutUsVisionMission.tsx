export default function AboutUsVisionMission() {
  return (
    <section
      id="vision-mission"
      className="h-auto sm:h-[310px] md:h-[340px] lg:h-[375px] xl:h-[415px] flex flex-col items-center py-[20px] sm:py-0 relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/bg-VisiMisi.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Container for both Vision and Mission */}
      <div className="flex flex-col sm:flex-row gap-[30px] sm:gap-[40px] md:gap-[52px] lg:gap-[65px] xl:gap-[80px] h-full px-[20px] sm:px-0 relative z-10">
        {/* Vision */}
        <div className="flex flex-col items-center">
          {/* 55px spacing from top - desktop only */}
          <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

          <div className="h-auto sm:h-[42px] md:h-[46px] lg:h-[50px] xl:h-[56px] flex items-center justify-center">
            <h2
              className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-[#D79C60] text-center font-bold"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Vision
            </h2>
          </div>

          {/* 20px spacing */}
          <div className="h-[15px] sm:h-[14px] md:h-[16px] lg:h-[18px] xl:h-[20px]"></div>

          {/* Vision Text */}
          <div className="w-[280px] sm:w-[250px] md:w-[280px] lg:w-[310px] xl:w-[340px]">
            <p className="text-[14px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-medium text-[#333333] text-center leading-[1.5]">
              Becoming the preferred business advisory company for Indonesian
              entrepreneurs to grow investable businesses.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="flex flex-col items-center">
          {/* 55px spacing from top - desktop only */}
          <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

          <div className="h-auto sm:h-[42px] md:h-[46px] lg:h-[50px] xl:h-[56px] flex items-center justify-center">
            <h2
              className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-[#D79C60] text-center font-bold"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Mission
            </h2>
          </div>

          {/* 20px spacing */}
          <div className="h-[15px] sm:h-[14px] md:h-[16px] lg:h-[18px] xl:h-[20px]"></div>

          {/* Mission Text */}
          <div className="w-[280px] sm:w-[250px] md:w-[280px] lg:w-[310px] xl:w-[340px]">
            <p className="text-[14px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-medium text-[#333333] text-center leading-[1.5]">
              Providing in-depth, comprehensive, and applicable business
              advisory for our clients to strengthen the business fundamentals
              as the foundation for growing sustainably.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
