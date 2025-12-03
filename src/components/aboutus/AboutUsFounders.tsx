"use client";

import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { founders } from "@/data/aboutus";
import { motion } from "framer-motion";
import { fadeIn, viewportSettings } from "@/lib/animations";

// Timing configuration
const PHOTO_DURATION = 0.8; // Duration for each photo animation
const PHOTO_STAGGER = 0.4; // Delay between each photo
const TEXT_DELAY = 0.3; // Text appears after photo starts
const TOTAL_FOUNDERS = founders.length;

// Calculate when all photos are done (for LinkedIn badges)
const ALL_PHOTOS_DONE = (TOTAL_FOUNDERS - 1) * PHOTO_STAGGER + PHOTO_DURATION;

// Photo animation - slide from bottom
const getPhotoVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: PHOTO_DURATION,
      delay: index * PHOTO_STAGGER,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
});

// Text animation - fade in after corresponding photo
const getTextVariants = (index: number) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: index * PHOTO_STAGGER + TEXT_DELAY,
      ease: "easeOut" as const,
    },
  },
});

// LinkedIn badge - all appear together after ALL photos are done
const linkedinBadge = {
  hidden: {
    opacity: 0,
    x: 25,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: ALL_PHOTOS_DONE + 0.2, // After all photos done + small buffer
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function AboutUsFounders() {
  return (
    <section
      id="founders"
      className="h-auto bg-[#EFF0EB] flex flex-col items-center py-[20px] lg:py-[55px] xl:py-[55px]"
    >
      <motion.div
        className="h-auto lg:h-[52px] xl:h-[56px] flex items-center justify-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-[#D79C60] text-center font-bold">
          Founders
        </h2>
      </motion.div>

      {/* 45px spacing from title to founders */}
      <div className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[38px] xl:h-[45px]"></div>

      {/* Founders Grid */}
      <motion.div
        className="flex flex-col lg:flex-row gap-[20px] sm:gap-[25px] md:gap-[30px] lg:gap-[48px] xl:gap-[60px] justify-center px-[20px] lg:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {founders.map((founder, index) => (
          <div
            key={founder.id}
            className="flex flex-col items-center w-[226px] sm:w-[240px] md:w-[260px] lg:w-[218px] xl:w-[236px]"
          >
            {/* Profile Photo with LinkedIn Badge */}
            <div className="relative">
              {/* Photo Container - staggered slide from bottom */}
              <motion.div
                className="w-[158px] h-[158px] sm:w-[170px] sm:h-[190px] md:w-[180px] md:h-[210px] lg:w-[150px] lg:h-[175px] xl:w-[158px] xl:h-[188px] overflow-hidden"
                variants={getPhotoVariants(index)}
              >
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={158}
                  height={188}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* LinkedIn Badge - all appear together after all photos done */}
              <motion.a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-7 right-1 hover:opacity-80 transition-opacity size-[27px] sm:size-[26px] md:size-[26px] lg:size-[24px] xl:size-[25px] flex items-center justify-center bg-[#0A66C2] rounded-[4px]"
                variants={linkedinBadge}
              >
                <FaLinkedinIn
                  className="w-5 h-5 sm:w-[18px] sm:h-[18px] md:w-[18px] md:h-[18px] lg:w-[18px] lg:h-[18px] xl:w-5 xl:h-5"
                  color="#FFFFFF"
                />
              </motion.a>
            </div>

            {/* 15px spacing */}
            <div className="h-[10px] sm:h-[12px] md:h-[14px] lg:h-[14px] xl:h-[15px]"></div>

            {/* Founder Name - fade in after corresponding photo */}
            <motion.p
              className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] font-bold text-[#D79C60] text-center"
              variants={getTextVariants(index)}
            >
              {founder.name}
            </motion.p>

            {/* Title (Jabatan) & Job (Specialization) */}
            <motion.p
              className="text-[12px] sm:text-[12px] md:text-[13px] lg:text-[11px] xl:text-[12px] text-[#333333] text-center leading-tight"
              variants={getTextVariants(index)}
            >
              <span className="font-bold whitespace-nowrap">
                {founder.title}
              </span>
              <br />
              <span className="font-medium">{founder.specialization}</span>
            </motion.p>

            {/* 15px spacing */}
            <div className="h-[10px] sm:h-[14px] md:h-[17px] lg:h-[17px] xl:h-[20px]"></div>

            {/* Description */}
            {founder.description && (
              <motion.p
                className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[11px] xl:text-[12px] font-medium text-[#333333] text-center leading-[1.4] w-[226px] sm:w-[240px] md:w-[260px] lg:w-[220px] xl:w-[240px]"
                variants={getTextVariants(index)}
              >
                {founder.description}
              </motion.p>
            )}
          </div>
        ))}
      </motion.div>

      {/* 20px spacing */}
      <div className="h-[20px] sm:h-[30px] md:h-[40px] lg:h-[50px] xl:h-[60px]"></div>

      {/* Companies Logos - Single Image */}
      <div className="pb-[20px] lg:pb-0">
        <Image
          src="/images/aboutus/Logo Partners wise.png"
          alt="Partner Companies"
          width={741}
          height={59}
          className="object-contain w-[308px] sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[741px] h-auto"
        />
      </div>
    </section>
  );
}
