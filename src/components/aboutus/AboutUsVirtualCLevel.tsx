import Image from "next/image";

export default function AboutUsVirtualCLevel() {
  return (
    <section
      id="virtual-c-level"
      className="h-[467px] bg-[#FFFFFF] flex flex-col items-center"
    >
      {/* 55px spacing from top */}
      <div className="h-[55px]"></div>

      <div className="h-[56px] flex items-center justify-center">
        <h2 className="section-title">Virtual C-Level</h2>
      </div>

      {/* 20px spacing */}
      <div className="h-[20px]"></div>

      {/* Virtual C-Level Image */}
      <div className="w-[634px] relative">
        <Image
          src="/images/aboutus/virtualCLevel.png"
          alt="Virtual C-Level"
          width={634}
          height={0}
          style={{ width: "634px", height: "auto" }}
          className="object-contain"
        />
      </div>
    </section>
  );
}
