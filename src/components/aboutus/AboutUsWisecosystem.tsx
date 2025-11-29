import Image from "next/image";

export default function AboutUsWisecosystem() {
  return (
    <section
      id="wisecosystem"
      className="h-[697px] bg-[#FFFFFF] flex flex-col items-center"
    >
      {/* 55px spacing from top */}
      <div className="h-[55px]"></div>

      <div className="h-[56px] flex items-center justify-center">
        <h2 className="section-title">wisecosystem</h2>
      </div>

      {/* 20px spacing */}
      <div className="h-[20px]"></div>

      {/* Wisecosystem Image */}
      <div className="w-[620px] relative">
        <Image
          src="/images/aboutus/wisecosystem.png"
          alt="Wisecosystem"
          width={620}
          height={0}
          style={{ width: "620px", height: "auto" }}
          className="object-contain"
        />
      </div>
    </section>
  );
}
