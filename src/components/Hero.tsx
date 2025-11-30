import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-visible h-[400px] sm:h-[380px] md:h-[480px] lg:h-[580px] xl:h-[700px] mt-12 md:mt-14 lg:mt-16 xl:mt-20">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white opacity-65"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full">
        {/* Mobile Layout */}
        <div className="sm:hidden relative w-full h-full px-[20px]">
          {/* Left Side - Text Content (Fixed Position) */}
          <div className="flex flex-col max-w-[179px] pt-8">
            <h1 className="text-[#333333] mb-4 text-left text-[28px] leading-none font-medium">
              <div>GROW</div>
              <div>YOUR</div>
              <div>BUSINESS</div>
              <div className="text-[#D79C60]">WISELY</div>
            </h1>

            <p className="text-[#333333] mb-3 text-[12px] leading-[1.4]">
              <span className="font-bold">
                As a business and investment advisor
              </span>
              <br />
              we resolve the basics, prepare for growth
              <br />
              and build investable business
            </p>

            <div className="flex gap-3">
              <Link
                href="https://wa.me/+6281299981708"
                target="_blank"
                className="bg-[#2D2D2D] text-[#D79C60] hover:bg-[#D79C60] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 font-medium px-4 py-2 rounded-full text-[10px]"
              >
                Ask wise
              </Link>
            </div>
          </div>

          {/* Right Side - Graph Image (Absolute/Floating) */}
          <div className="absolute right-0 top-0 w-[200px] h-[360px]">
            <Image
              src="/images/graph-klien.png"
              alt="Client Graph"
              fill
              className="object-contain object-top"
            />
          </div>
        </div>

        {/* Desktop Layout (sm and above) */}
        <div className="hidden sm:flex items-center justify-center h-full px-4 md:px-20">
          <div className="flex items-start gap-[30px] md:gap-[50px] lg:gap-[60px] xl:gap-[70px]">
            {/* Left Side - Text Content */}
            <div className="flex flex-col md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]">
              <h1 className="text-[#333333] mb-4 md:mb-6 lg:mb-8 xl:mb-10 text-left text-[32px] md:text-[48px] lg:text-[64px] xl:text-[80px] leading-none font-medium">
                <div>GROW</div>
                <div>YOUR</div>
                <div>BUSINESS</div>
                <div className="text-[#D79C60]">WISELY</div>
              </h1>

              <p className="text-[#333333] mb-3 md:mb-4 lg:mb-6 xl:mb-8 text-[11px] md:text-[13px] lg:text-[15px] xl:text-lg leading-[1.4]">
                <span className="font-bold">
                  As a business and investment advisor
                </span>
                <br />
                we resolve the basics, prepare for growth
                <br />
                and build investable business
              </p>

              <div className="flex gap-3 md:gap-3 lg:gap-4">
                <Link
                  href="https://wa.me/+6281299981708"
                  target="_blank"
                  className="bg-[#2D2D2D] text-[#D79C60] hover:bg-[#D79C60] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 font-medium px-4 md:px-5 lg:px-6 xl:px-8 py-2 md:py-2 lg:py-2.5 xl:py-3 rounded-full text-[10px] md:text-xs lg:text-sm"
                >
                  Ask wise
                </Link>
              </div>
            </div>

            {/* Right Side - Graph Image */}
            <div className="relative w-[180px] h-[260px] md:w-[280px] md:h-[340px] lg:w-[400px] lg:h-[400px] xl:w-[650px] xl:h-[550px] -mt-8 md:-mt-12 lg:-mt-18 xl:-mt-24">
              <Image
                src="/images/graph-klien.png"
                alt="Client Graph"
                fill
                className="object-contain object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
