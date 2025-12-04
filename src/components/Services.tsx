"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { viewportSettings } from "@/lib/animations";

// Timing configuration for Services
const WISEVISORY_DELAY = 0; // First: wisevisory logo + image slide from bottom
const WISECUBATION_DELAY = 0.6; // After wisevisory finishes
const DESCRIPTION_DELAY = 1.2; // After both logo/images finish
const SEPARATOR_DELAY = 1.6; // Last: separator line

// Slide from bottom animation
const slideFromBottom = (delay: number) => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
});

// Slide from top animation (for descriptions)
const slideFromTop = (delay: number) => ({
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
});

export default function Services() {
  const services = [
    {
      title: "wisevisory",
      logo: "/images/wisevisory.png",
      description:
        "We team-up with business owners and leaders to assess the overall health of the business, identify areas for improvement, and support the execution of the company's strategies and operation",
      link: "/wisevisory",
      icon: "1.png",
    },
    {
      title: "wisecubation",
      logo: "/images/wisecubation.png",
      description:
        "We educate business owners and leaders to enhance their capabilities in preparing and re-discovering their business blueprint.",
      link: "/wisecubation",
      icon: "2.png",
    },
  ];

  return (
    <section
      id="services"
      className="bg-white h-auto sm:h-[420px] md:h-[480px] lg:h-[560px] xl:h-[677px] py-[20px] sm:py-0"
    >
      <div className="w-full px-[20px] sm:px-8 md:px-16 lg:px-[200px] xl:px-[200px]">
        {/* Spacing from top */}
        <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[50px] xl:h-[55px]"></div>

        <div className="h-[40px] sm:h-[42px] md:h-[48px] lg:h-[52px] xl:h-[56px] flex items-center justify-center">
          <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold text-[#D79C60] section-title">
            Services
          </h2>
        </div>

        {/* Spacing to content */}
        <div className="h-[15px] sm:h-[16px] md:h-[20px] lg:h-[22px] xl:h-[25px]"></div>

        {/* Mobile: vertical stack, Desktop: horizontal */}
        <motion.div
          className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-0 xl:gap-[80px] relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Service - wisevisory */}
          <div className="flex-1 text-center flex flex-col items-center">
            {/* Image with decorative circles - slide from bottom first */}
            <motion.div variants={slideFromBottom(WISEVISORY_DELAY)}>
              <Link
                href={services[0].link}
                className="relative mb-[20px] sm:mb-[25px] md:mb-[32px] lg:mb-[42px] xl:mb-[55px] group cursor-pointer transition-transform duration-300 hover:scale-105 block"
              >
                {/* Outer circle border - in front */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[169px] sm:w-[110px] md:w-[125px] lg:w-[145px] xl:w-[169px] h-[169px] sm:h-[110px] md:h-[125px] lg:h-[145px] xl:h-[169px] rounded-full border-[6px] sm:border-[5px] md:border-[5px] lg:border-[6px] xl:border-[8px] border-[#2D2D2D] group-hover:border-[#D79C60] transition-colors duration-300 z-10"></div>

                {/* Inner container for image - behind circle */}
                <div className="w-[160px] sm:w-[105px] md:w-[118px] lg:w-[138px] xl:w-[160px] h-[160px] sm:h-[105px] md:h-[118px] lg:h-[138px] xl:h-[160px] rounded-full overflow-hidden relative z-0">
                  <Image
                    src={services[0].logo}
                    alt="wisevisory"
                    width={169}
                    height={169}
                    className="w-full h-full object-cover group-hover:blur-[1px] transition-all duration-300"
                  />
                  {/* Learn More overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="text-[#E8E6E6] text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] font-medium">
                      Learn More
                    </span>
                  </div>
                </div>

                {/* Small filled circle - top left */}
                <div
                  className="absolute w-[30px] sm:w-[18px] md:w-[22px] lg:w-[26px] xl:w-[30px] h-[30px] sm:h-[18px] md:h-[22px] lg:h-[26px] xl:h-[30px] rounded-full bg-[#D79C60] z-20"
                  style={{
                    opacity: 0.75,
                    top: "7px",
                    left: "3px",
                  }}
                ></div>

                {/* Medium border-only circle - bottom right */}
                <div
                  className="absolute w-[55px] sm:w-[32px] md:w-[40px] lg:w-[48px] xl:w-[55px] h-[55px] sm:h-[32px] md:h-[40px] lg:h-[48px] xl:h-[55px] rounded-full border-[#D79C60] z-20"
                  style={{
                    opacity: 0.75,
                    bottom: "3px",
                    right: "0px",
                    borderWidth: "2px",
                  }}
                ></div>
              </Link>
            </motion.div>

            {/* Wisevisory Logo - slide from bottom together with image */}
            <motion.div
              className="mb-[3px] md:mb-[4px] lg:mb-[5px]"
              variants={slideFromBottom(WISEVISORY_DELAY + 0.1)}
            >
              <Image
                src="/images/wisevisory_logo.png"
                alt="wisevisory logo"
                width={323}
                height={78}
                className="w-[230px] sm:w-[160px] md:w-[200px] lg:w-[260px] xl:w-[323px] h-auto"
              />
            </motion.div>

            {/* Description text box - slide from top after both images finish */}
            <motion.div
              className="w-[280px] sm:w-full sm:max-w-[180px] md:max-w-[220px] lg:max-w-[300px] xl:max-w-[310px] h-auto lg:h-[110px] xl:h-[134px] flex items-start justify-center"
              variants={slideFromTop(DESCRIPTION_DELAY)}
            >
              <p className="text-[#333333] text-[13px] sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] leading-[1.4] text-center font-medium">
                We <span className="font-bold">team-up</span> with business
                owners and leaders to{" "}
                <span className="font-bold">assess the overall health</span> of
                the business,{" "}
                <span className="font-bold">
                  identify areas for improvement
                </span>
                , and <span className="font-bold">support the execution</span>{" "}
                of the company&apos;s strategies and operation
              </p>
            </motion.div>
          </div>

          {/* Horizontal Separator - Mobile only */}
          <div className="block sm:hidden w-[230px] h-[1px] bg-[#333333] my-[25px]"></div>

          {/* Vertical Separator - Desktop only - slide from bottom last */}
          <motion.div
            className="hidden sm:block w-[1px] h-[55px] md:h-[65px] lg:h-[95px] xl:h-[100px] bg-[#333333] absolute left-1/2 top-0 mt-4 md:mt-5 lg:mt-6 transform -translate-x-1/2"
            variants={slideFromBottom(SEPARATOR_DELAY)}
          ></motion.div>

          {/* Right Service - wisecubation */}
          <div className="flex-1 text-center flex flex-col items-center">
            {/* Image with decorative circles - slide from bottom after wisevisory */}
            <motion.div variants={slideFromBottom(WISECUBATION_DELAY)}>
              <Link
                href={services[1].link}
                className="relative mb-[20px] sm:mb-[25px] md:mb-[32px] lg:mb-[42px] xl:mb-[55px] group cursor-pointer transition-transform duration-300 hover:scale-105 block"
              >
                {/* Outer circle border - in front */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[169px] sm:w-[110px] md:w-[125px] lg:w-[145px] xl:w-[169px] h-[169px] sm:h-[110px] md:h-[125px] lg:h-[145px] xl:h-[169px] rounded-full border-[6px] sm:border-[5px] md:border-[5px] lg:border-[6px] xl:border-[8px] border-[#364DAF] group-hover:border-[#D79C60] transition-colors duration-300 z-10"></div>

                {/* Inner container for image - behind circle */}
                <div className="w-[160px] sm:w-[105px] md:w-[118px] lg:w-[138px] xl:w-[160px] h-[160px] sm:h-[105px] md:h-[118px] lg:h-[138px] xl:h-[160px] rounded-full overflow-hidden relative z-0">
                  <Image
                    src={services[1].logo}
                    alt="wisecubation"
                    width={169}
                    height={169}
                    className="w-full h-full object-cover group-hover:blur-[1px] transition-all duration-300"
                  />
                  {/* Learn More overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="text-[#E8E6E6] text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] font-medium">
                      Learn More
                    </span>
                  </div>
                </div>

                {/* Small filled circle - top left */}
                <div
                  className="absolute w-[30px] sm:w-[18px] md:w-[22px] lg:w-[26px] xl:w-[30px] h-[30px] sm:h-[18px] md:h-[22px] lg:h-[26px] xl:h-[30px] rounded-full bg-[#4A99F8] group-hover:bg-[#D79C60] transition-colors duration-300 z-20"
                  style={{
                    opacity: 0.75,
                    top: "7px",
                    left: "3px",
                  }}
                ></div>

                {/* Medium border-only circle - bottom right */}
                <div
                  className="absolute w-[55px] sm:w-[32px] md:w-[40px] lg:w-[48px] xl:w-[55px] h-[55px] sm:h-[32px] md:h-[40px] lg:h-[48px] xl:h-[55px] rounded-full border-[#4A99F8] group-hover:border-[#D79C60] transition-colors duration-300 z-20"
                  style={{
                    opacity: 0.75,
                    bottom: "3px",
                    right: "0px",
                    borderWidth: "2px",
                  }}
                ></div>
              </Link>
            </motion.div>

            {/* Wisecubation Logo - slide from bottom together with image */}
            <motion.div
              className="mb-[3px] md:mb-[4px] lg:mb-[5px]"
              variants={slideFromBottom(WISECUBATION_DELAY + 0.1)}
            >
              <Image
                src="/images/wisecubation_logo.png"
                alt="wisecubation logo"
                width={323}
                height={78}
                className="w-[230px] sm:w-[160px] md:w-[200px] lg:w-[260px] xl:w-[323px] h-auto"
              />
            </motion.div>

            {/* Description text box - slide from top after both images finish */}
            <motion.div
              className="w-[280px] sm:w-full sm:max-w-[180px] md:max-w-[220px] lg:max-w-[300px] xl:max-w-[310px] h-auto lg:h-[110px] xl:h-[134px] flex items-start justify-center"
              variants={slideFromTop(DESCRIPTION_DELAY + 0.15)}
            >
              <p className="text-[#333333] text-[13px] sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] leading-[1.4] text-center font-medium">
                We <span className="font-bold">educate</span> business owners
                and leaders to{" "}
                <span className="font-bold">enhance their capabilities</span> in
                preparing and re-discovering their{" "}
                <span className="font-bold">business blueprint</span>.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
