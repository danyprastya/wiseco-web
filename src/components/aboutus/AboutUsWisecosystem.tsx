"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, viewportSettings, withDelay } from "@/lib/animations";

export default function AboutUsWisecosystem() {
  return (
    <section
      id="wisecosystem"
      className="h-auto bg-[#FFFFFF] flex flex-col items-center py-[20px] sm:py-[40px] md:py-[48px] lg:py-[55px] xl:py-[60px] px-[20px] sm:px-0"
    >
      <motion.div
        className="h-auto lg:h-[52px] xl:h-[56px] flex items-center justify-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-[#D79C60] text-center font-bold">
          wisecosystem
        </h2>
      </motion.div>

      {/* 20px spacing */}
      <div className="h-[15px] sm:h-[16px] md:h-[18px] lg:h-[20px] xl:h-[25px]"></div>

      {/* Wisecosystem Image - fade in with delay */}
      <motion.div
        className="w-full sm:w-[260px] md:w-[310px] lg:w-[370px] xl:w-[430px] relative flex justify-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        transition={withDelay(0.2)}
      >
        <Image
          src="/images/aboutus/Bagan wisecosystem.png"
          alt="Wisecosystem"
          width={430}
          height={0}
          className="object-contain w-full sm:w-[260px] md:w-[310px] lg:w-[370px] xl:w-[430px] h-auto max-h-[140px] sm:max-h-none"
        />
      </motion.div>
    </section>
  );
}
