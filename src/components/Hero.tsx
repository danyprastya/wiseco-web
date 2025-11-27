import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden h-[700px] mt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      >
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white opacity-65"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex items-center justify-between px-[385px]">
        {/* Left Side - Text Content */}
        <div className="flex flex-col max-w-[600px]">
          <h1 className="text-[#333333] mb-10 text-left text-[80px] leading-none font-semibold">
            <div>GROW</div>
            <div>YOUR</div>
            <div>BUSINESS</div>
            <div className="text-[#D79C60]">WISELY</div>
          </h1>

          <p className="text-[#333333] mb-8 text-lg leading-[1.4]">
            <span className="font-bold">
              As a business and investment advisor
            </span>
            <br />
            we resolve the basics, prepare for growth
            <br />
            and build investable business
          </p>

          <div className="flex gap-4">
            <Link
              href="https://wa.me/+6281299981708"
              target="_blank"
              className="bg-[#2D2D2D] text-[#D79C60] hover:bg-[#D79C60] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 font-medium px-8 py-3 rounded-full text-sm"
            >
              Ask wise
            </Link>
          </div>
        </div>

        {/* Right Side - Network Image */}
        <div className="hidden lg:block relative w-[500px] h-[400px]">
          <Image
            src="/images/hero-network.png"
            alt="Network"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
