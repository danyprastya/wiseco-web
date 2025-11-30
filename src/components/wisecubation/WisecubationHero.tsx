import Image from "next/image";

export default function WisecubationHero() {
  return (
    <section
      className="h-[200px] sm:h-[380px] md:h-[480px] lg:h-[580px] xl:h-[701px] mt-[54px] sm:mt-[65px] lg:mt-[70px] xl:mt-[80px] relative flex flex-col items-center justify-center px-[20px] sm:px-0"
      style={{
        backgroundImage: "url('/images/bg-wisecubation.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* White Overlay 80% */}
      <div className="absolute inset-0 bg-white opacity-80"></div>

      {/* Logo */}
      <div className="relative z-10 w-[200px] h-[50px] sm:w-[340px] sm:h-[86px] md:w-[420px] md:h-[106px] lg:w-[510px] lg:h-[129px] xl:w-[600px] xl:h-[151px]">
        <Image
          src="/images/wisecubation_logo.png"
          alt="Wisecubation Logo"
          fill
          sizes="(max-width: 640px) 200px, (max-width: 768px) 340px, (max-width: 1024px) 420px, (max-width: 1280px) 510px, 600px"
          className="object-contain"
          quality={100}
          priority
        />
      </div>

      {/* Coming Soon Text */}
      <div
        className="relative z-10 w-auto sm:w-auto md:w-auto lg:w-auto xl:w-[304px] text-center mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8"
        style={{
          fontFamily: "Avenir, sans-serif",
          letterSpacing: "1px",
          color: "#333333",
        }}
      >
        <span className="text-[10px] sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[38px]">
          COMING SOON
        </span>
      </div>
    </section>
  );
}
