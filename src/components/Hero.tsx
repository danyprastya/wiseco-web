"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { viewportSettings } from "@/lib/animations";

// Timing configuration for Hero
const TITLE_DURATION = 0.8;
const IMAGE_DELAY = 0.3;
const TEXT_DELAY = 0.9; // After image starts fading in
const BUTTON_DELAY = 1.4; // After text animation

// Title - slide from bottom
const titleAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TITLE_DURATION,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

// Image - fade in after title starts
const imageAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: IMAGE_DELAY,
      ease: "easeOut" as const,
    },
  },
};

// Text - fade in after image
const textAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: TEXT_DELAY,
      ease: "easeOut" as const,
    },
  },
};

// Button - slide from left after text
const buttonAnimation = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: BUTTON_DELAY,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-visible h-[400px] sm:h-[380px] md:h-[480px] lg:h-[580px] xl:h-[700px] mt-12 md:mt-14 lg:mt-16 xl:mt-20">
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

      {/* Content Container */}
      <div className="relative z-10 w-full h-full">
        {/* Mobile Layout */}
        <div className="sm:hidden relative w-full h-full px-[20px]">
          {/* Flex container with fixed gap between text and image */}
          <div className="flex items-start gap-[0px]">
            {/* Left Side - Text Content */}
            <div
              className="flex flex-col max-w-[179px] flex-shrink-0"
              style={{
                // Adjust text position independently
                marginTop: "45px", // Move text down from top
                marginLeft: "35px", // Move text from left edge (more = more to center)
              }}
            >
              {/* GROW YOUR BUSINESS - slide from bottom */}
              <motion.h1
                className="text-[#333333] mb-4 text-left text-[28px] leading-none font-medium"
                variants={titleAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
              >
                <div>GROW</div>
                <div>YOUR</div>
                <div>BUSINESS</div>
                <div className="text-[#D79C60]">WISELY</div>
              </motion.h1>

              {/* As a business... text - fade in after image */}
              <motion.p
                className="text-[#333333] mb-3 text-[12px] leading-[1.4]"
                variants={textAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
              >
                <span className="font-bold">
                  As a business and investment advisor
                </span>
                <br />
                we resolve the basics, prepare for growth
                <br />
                and build investable business
              </motion.p>

              {/* Ask wise button - slide from left */}
              <motion.div
                className="flex gap-3"
                variants={buttonAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
              >
                <Link
                  href="https://wa.me/+6281299981708"
                  target="_blank"
                  className="bg-[#2D2D2D] text-[#D79C60] hover:bg-[#D79C60] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 font-medium px-4 py-2 rounded-full text-[10px]"
                >
                  Ask wise
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Graph Image - fade in */}
            {/* Only top position adjustable, gap to text is fixed */}
            <motion.div
              className="relative flex-1"
              style={{
                // Adjust this value to move image up/down independently
                marginTop: "-10px", // negative = up, positive = down
                height: "420px", // Image height
                minWidth: "300px", // Minimum image width
              }}
              variants={imageAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <Image
                src="/images/graph-klien.png"
                alt="Client Graph"
                fill
                className="object-contain object-top"
              />
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout (sm and above) */}
        <div className="hidden sm:flex items-start justify-center h-full px-4 md:px-8 lg:px-12 xl:px-20">
          <div className="flex items-start gap-0 sm:gap-0 md:gap-0 lg:gap-[5px] xl:gap-[40px] sm:mt-[30px] md:mt-[40px] lg:mt-[20px] xl:mt-0 xl:items-center xl:h-full">
            {/* Left Side - Text Content */}
            <div className="flex flex-col sm:max-w-[280px] md:max-w-[350px] lg:max-w-[450px] xl:max-w-[600px]">
              {/* GROW YOUR BUSINESS - slide from bottom */}
              <motion.h1
                className="text-[#333333] mb-3 sm:mb-3 md:mb-5 lg:mb-7 xl:mb-10 text-left text-[28px] sm:text-[30px] md:text-[42px] lg:text-[56px] xl:text-[80px] leading-none font-medium"
                variants={titleAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
              >
                <div>GROW</div>
                <div>YOUR</div>
                <div>BUSINESS</div>
                <div className="text-[#D79C60]">WISELY</div>
              </motion.h1>

              {/* As a business... text - fade in after image */}
              <motion.p
                className="text-[#333333] mb-2 sm:mb-2 md:mb-3 lg:mb-5 xl:mb-8 text-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-lg leading-[1.4]"
                variants={textAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
              >
                <span className="font-bold">
                  As a business and investment advisor
                </span>
                <br />
                we resolve the basics, prepare for growth
                <br />
                and build investable business
              </motion.p>

              {/* Ask wise button - slide from left */}
              <motion.div
                className="flex gap-3 md:gap-3 lg:gap-4"
                variants={buttonAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
              >
                <Link
                  href="https://wa.me/+6281299981708"
                  target="_blank"
                  className="bg-[#2D2D2D] text-[#D79C60] hover:bg-[#D79C60] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 font-medium px-3 sm:px-3 md:px-4 lg:px-5 xl:px-8 py-1.5 sm:py-1.5 md:py-2 lg:py-2 xl:py-3 rounded-full text-[9px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm"
                >
                  Ask wise
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Graph Image - fade in */}
            <motion.div
              className="relative w-[200px] h-[290px] sm:w-[220px] sm:h-[320px] md:w-[300px] md:h-[380px] lg:w-[420px] lg:h-[480px] xl:w-[650px] xl:h-[550px] -mt-4 sm:-mt-6 md:-mt-12 lg:-mt-16z xl:-mt-24"
              variants={imageAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <Image
                src="/images/graph-klien.png"
                alt="Client Graph"
                fill
                className="object-contain object-top"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
