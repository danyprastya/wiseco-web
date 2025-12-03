"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, viewportSettings, withDelay } from "@/lib/animations";

export default function AboutUsVirtualCLevel() {
  return (
    <section
      id="virtual-c-level"
      className="h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] xl:h-[467px] bg-[#FFFFFF] flex flex-col items-center py-[20px] sm:py-0 px-[20px] sm:px-0"
    >
      {/* 55px spacing from top - desktop only */}
      <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

      <motion.div
        className="h-auto sm:h-[42px] md:h-[46px] lg:h-[50px] xl:h-[56px] flex items-center justify-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
      >
        <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] text-[#D79C60] text-center font-bold">
          Virtual C-Level
        </h2>
      </motion.div>

      {/* 20px spacing */}
      <div className="h-[15px] sm:h-[14px] md:h-[16px] lg:h-[18px] xl:h-[20px]"></div>

      {/* Virtual C-Level Image - fade in with delay */}
      <motion.div
        className="w-full sm:w-[420px] md:w-[490px] lg:w-[560px] xl:w-[634px] relative flex justify-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        transition={withDelay(0.2)}
      >
        <Image
          src="/images/aboutus/Bagan Virtual C-Level.png"
          alt="Virtual C-Level"
          width={634}
          height={0}
          className="object-contain w-full sm:w-[420px] md:w-[490px] lg:w-[560px] xl:w-[634px] h-auto max-h-[180px] sm:max-h-none"
        />
      </motion.div>
    </section>
  );
}
