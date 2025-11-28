export default function AboutUsVisionMission() {
  return (
    <section
      id="vision-mission"
      className="h-[415px] bg-[#E8E6E6] flex flex-col items-center"
    >
      {/* Container for both Vision and Mission */}
      <div className="flex gap-[80px] h-full">
        {/* Vision */}
        <div className="flex flex-col items-center">
          {/* 55px spacing from top */}
          <div className="h-[55px]"></div>

          <div className="h-[56px] flex items-center justify-center">
            <h2 className="section-title">Our Vision</h2>
          </div>

          {/* 20px spacing */}
          <div className="h-[20px]"></div>

          {/* Vision Text */}
          <div className="w-[340px]">
            <p className="text-[18px] font-medium text-[#333333] text-center leading-[1.5]">
              Becoming the preferred business advisory company for Indonesian
              entrepreneurs to grow investable businesses.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="flex flex-col items-center">
          {/* 55px spacing from top */}
          <div className="h-[55px]"></div>

          <div className="h-[56px] flex items-center justify-center">
            <h2 className="section-title">Our Mission</h2>
          </div>

          {/* 20px spacing */}
          <div className="h-[20px]"></div>

          {/* Mission Text */}
          <div className="w-[340px]">
            <p className="text-[18px] font-medium text-[#333333] text-center leading-[1.5]">
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
