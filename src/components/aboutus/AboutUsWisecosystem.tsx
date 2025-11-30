import Image from "next/image";

export default function AboutUsWisecosystem() {
  return (
    <section
      id="wisecosystem"
      className="h-auto bg-[#FFFFFF] flex flex-col items-center py-[20px] sm:py-[40px] md:py-[48px] lg:py-[55px] xl:py-[60px] px-[20px] sm:px-0"
    >
      <div className="h-auto lg:h-[52px] xl:h-[56px] flex items-center justify-center">
        <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-[#D79C60] text-center font-bold">
          wisecosystem
        </h2>
      </div>

      {/* 20px spacing */}
      <div className="h-[15px] sm:h-[16px] md:h-[18px] lg:h-[20px] xl:h-[25px]"></div>

      {/* Wisecosystem Image */}
      <div className="w-full sm:w-[400px] md:w-[480px] lg:w-[545px] xl:w-[620px] relative flex justify-center">
        <Image
          src="/images/aboutus/wisecosystem.png"
          alt="Wisecosystem"
          width={620}
          height={0}
          className="object-contain w-full sm:w-[400px] md:w-[480px] lg:w-[545px] xl:w-[620px] h-auto max-h-[180px] sm:max-h-none"
        />
      </div>
    </section>
  );
}
