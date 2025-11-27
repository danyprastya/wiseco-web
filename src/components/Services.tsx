import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "wisevisory",
      logo: "/images/wisevisory.png",
      description:
        "We team-up with business owners and leaders to assess the overall health of the business, identify areas for improvement, and support the execution of the company's strategies and operation",
      link: "/services/wisevisory",
      icon: "1.png",
    },
    {
      title: "wisecubation",
      logo: "/images/wisecubation.png",
      description:
        "We educate business owners and leaders to enhance their capabilities in preparing and re-discovering their business blueprint.",
      link: "/services/wisecubation",
      icon: "2.png",
    },
  ];

  return (
    <section className="bg-white h-[677px]">
      <div
        className="w-full"
        style={{ paddingLeft: "485px", paddingRight: "485px" }}
      >
        <h2 className="section-title mb-16">Services</h2>

        <div className="flex items-start gap-0 relative">
          {/* Left Service - wisevisory */}
          <div className="flex-1 text-center flex flex-col items-center">
            {/* Image with decorative circles */}
            <Link
              href={services[0].link}
              className="relative mb-[55px] group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Outer circle border - in front */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border-[8px] border-[#2D2D2D] group-hover:border-[#D79C60] transition-colors duration-300 z-10"></div>

              {/* Inner container for image - behind circle */}
              <div className="w-[152px] h-[152px] rounded-full overflow-hidden relative z-0">
                <Image
                  src={services[0].logo}
                  alt="wisevisory"
                  width={152}
                  height={152}
                  className="w-full h-full object-cover group-hover:blur-[1px] transition-all duration-300"
                />
                {/* Learn More overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="text-[#E8E6E6] text-[14px] font-medium">
                    Learn More
                  </span>
                </div>
              </div>

              {/* Small filled circle - top left */}
              <div
                className="absolute w-[30px] h-[30px] rounded-full bg-[#D79C60] z-20"
                style={{
                  opacity: 0.75,
                  top: "10px",
                  left: "5px",
                }}
              ></div>

              {/* Medium border-only circle - bottom right */}
              <div
                className="absolute w-[55px] h-[55px] rounded-full border-[#D79C60] z-20"
                style={{
                  opacity: 0.75,
                  bottom: "5px",
                  right: "0px",
                  borderWidth: "3px",
                }}
              ></div>
            </Link>

            {/* Wisevisory Logo */}
            <div className="mb-[5px]">
              <Image
                src="/images/wisevisory_logo.png"
                alt="wisevisory logo"
                width={323}
                height={78}
                className="w-[323px] h-[78px]"
              />
            </div>

            {/* Description text box */}
            <div className="w-[310px] h-[134px] flex items-start justify-center">
              <p className="text-[#333333] text-[16px] leading-[1.4] text-center font-medium">
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
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-[1px] h-[100px] bg-[#333333] absolute left-1/2 top-0 mt-6 transform -translate-x-1/2"></div>

          {/* Right Service - wisecubation */}
          <div className="flex-1 text-center flex flex-col items-center">
            {/* Image with decorative circles */}
            <Link
              href={services[1].link}
              className="relative mb-[55px] group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Outer circle border - in front */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border-[8px] border-[#364DAF] group-hover:border-[#D79C60] transition-colors duration-300 z-10"></div>

              {/* Inner container for image - behind circle */}
              <div className="w-[152px] h-[152px] rounded-full overflow-hidden relative z-0">
                <Image
                  src={services[1].logo}
                  alt="wisecubation"
                  width={152}
                  height={152}
                  className="w-full h-full object-cover group-hover:blur-[1px] transition-all duration-300"
                />
                {/* Learn More overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="text-[#E8E6E6] text-[14px] font-medium">
                    Learn More
                  </span>
                </div>
              </div>

              {/* Small filled circle - top left */}
              <div
                className="absolute w-[30px] h-[30px] rounded-full bg-[#4A99F8] group-hover:bg-[#D79C60] transition-colors duration-300 z-20"
                style={{
                  opacity: 0.75,
                  top: "10px",
                  left: "5px",
                }}
              ></div>

              {/* Medium border-only circle - bottom right */}
              <div
                className="absolute w-[55px] h-[55px] rounded-full border-[#4A99F8] group-hover:border-[#D79C60] transition-colors duration-300 z-20"
                style={{
                  opacity: 0.75,
                  bottom: "5px",
                  right: "0px",
                  borderWidth: "3px",
                }}
              ></div>
            </Link>

            {/* Wisecubation Logo */}
            <div className="mb-[5px]">
              <Image
                src="/images/wisecubation_logo.png"
                alt="wisecubation logo"
                width={323}
                height={78}
                className="w-[323px] h-[78px]"
              />
            </div>

            {/* Description text box */}
            <div className="w-[310px] h-[134px] flex items-start justify-center">
              <p className="text-[#333333] text-[16px] leading-[1.4] text-center font-medium">
                We <span className="font-bold">educate</span> business owners
                and leaders to{" "}
                <span className="font-bold">enhance their capabilities</span> in
                preparing and re-discovering their{" "}
                <span className="font-bold">business blueprint</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
