import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { founders } from "@/data/aboutus";

export default function AboutUsFounders() {
  return (
    <section
      id="founders"
      className="h-[697px] bg-[#EFF0EB] flex flex-col items-center"
    >
      {/* 55px spacing from top */}
      <div className="h-[55px]"></div>

      <div className="h-[56px] flex items-center justify-center">
        <h2 className="section-title">Founders</h2>
      </div>

      {/* 45px spacing from title to founders */}
      <div className="h-[45px]"></div>

      {/* Founders Grid */}
      <div className="flex gap-[60px] justify-center">
        {founders.map((founder) => (
          <div
            key={founder.id}
            className="flex flex-col items-center w-[236px]"
          >
            {/* Profile Photo with LinkedIn Badge */}
            <div className="relative">
              {/* Photo Container - No circle, rectangular */}
              <div className="w-[158px] h-[188px] overflow-hidden">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={158}
                  height={188}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* LinkedIn Badge */}
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-7 right-1 hover:opacity-80 transition-opacity size-[25px] flex items-center justify-center bg-[#0A66C2] rounded-[4px]"
              >
                <FaLinkedinIn size={20} color="#FFFFFF" />
              </a>
            </div>

            {/* 15px spacing */}
            <div className="h-[15px]"></div>

            {/* Founder Name */}
            <p className="text-[14px] font-bold text-[#D79C60] text-center">
              {founder.name}
            </p>

            {/* Title (Jabatan) & Job (Specialization) */}
            <p className="text-[12px] text-[#333333] text-center leading-tight">
              <span className="font-bold whitespace-nowrap">
                {founder.title}
              </span>
              <br />
              <span className="font-medium">{founder.specialization}</span>
            </p>

            {/* 15px spacing */}
            <div className="h-[20px]"></div>

            {/* Description */}
            {founder.description && (
              <p className="text-[12px] font-medium text-[#333333] text-center leading-[1.4] w-[240px]">
                {founder.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Companies Logos - Single Image */}
      <div className="pb-[60px]">
        <Image
          src="/images/aboutus/companies/LOGO PARTNERS WISE.png"
          alt="Partner Companies"
          width={741}
          height={59}
          className="object-contain"
        />
      </div>
    </section>
  );
}
