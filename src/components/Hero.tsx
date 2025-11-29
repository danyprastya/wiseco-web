import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-visible h-[400px] md:h-[550px] lg:h-[700px] mt-12 md:mt-16 lg:mt-20">
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

      {/* Content Container - Centered with gap */}
      <div className="relative z-10 w-full flex items-center justify-center px-4 md:px-20">
        <div className="flex items-start gap-[70px]">
          {/* Left Side - Text Content */}
          <div className="flex flex-col max-w-full md:max-w-[500px] lg:max-w-[600px]">
            <h1 className="text-[#333333] mb-6 md:mb-8 lg:mb-10 text-left text-[40px] md:text-[60px] lg:text-[80px] leading-none font-medium">
              <div>GROW</div>
              <div>YOUR</div>
              <div>BUSINESS</div>
              <div className="text-[#D79C60]">WISELY</div>
            </h1>

            <p className="text-[#333333] mb-4 md:mb-6 lg:mb-8 text-sm md:text-base lg:text-lg leading-[1.4]">
              <span className="font-bold">
                As a business and investment advisor
              </span>
              <br />
              we resolve the basics, prepare for growth
              <br />
              and build investable business
            </p>

            <div className="flex gap-3 md:gap-4">
              <Link
                href="https://wa.me/+6281299981708"
                target="_blank"
                className="bg-[#2D2D2D] text-[#D79C60] hover:bg-[#D79C60] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 font-medium px-5 md:px-6 lg:px-8 py-2 md:py-2.5 lg:py-3 rounded-full text-xs md:text-sm"
              >
                Ask wise
              </Link>
            </div>
          </div>

          {/* Right Side - Graph Image - Starts from top */}
          <div className="hidden lg:block relative w-[500px] xl:w-[650px] h-[450px] xl:h-[550px] -mt-24">
            <Image
              src="/images/graph-klien.png"
              alt="Client Graph"
              fill
              className="object-contain object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
