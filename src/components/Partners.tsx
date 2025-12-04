import Image from "next/image";

interface PartnerLogo {
  name: string;
  logo: string;
}

// Strategic Partners data
const strategicPartners: PartnerLogo[] = [
  { name: "Al Kahf", logo: "/images/strategic partner/alkahf.png" },
  { name: "CMA", logo: "/images/strategic partner/Logo CMA.png" },
  {
    name: "Enjoy Bekasi",
    logo: "/images/strategic partner/Logo Enjoy Bekasi.png",
  },
  { name: "Jurnal", logo: "/images/strategic partner/Logo Jurnal.png" },
  { name: "Modestalk", logo: "/images/strategic partner/Logo Modestalk.png" },
  { name: "PCA", logo: "/images/strategic partner/Logo PCA.png" },
  {
    name: "Scarf Media",
    logo: "/images/strategic partner/Logo Scarfmedia.png",
  },
  { name: "Urun RI", logo: "/images/strategic partner/Logo Urun RI.png" },
  { name: "Kompeten", logo: "/images/strategic partner/Logo Kompeten.png" },
];

// Media Reviews data
const mediaReviews: PartnerLogo[] = [
  { name: "Gatra", logo: "/images/media review/Logo Gatra.png" },
  { name: "IDX Channel", logo: "/images/media review/Logo IDX Channel.png" },
  { name: "Liputan 6", logo: "/images/media review/Logo Liputan 6.png" },
  {
    name: "Investor Trust",
    logo: "/images/media review/Logo Investor Trust.png",
  },
  { name: "Radar Banten", logo: "/images/media review/Logo Radar Banten.png" },
  {
    name: "Suara Merdeka",
    logo: "/images/media review/Logo Suara Merdeka.png",
  },
  {
    name: "UMKM Indonesia",
    logo: "/images/media review/Logo UMKMIndonesia.png",
  },
  { name: "TVRI", logo: "/images/media review/Logo TVRI.png" },
  { name: "Scarf Media", logo: "/images/media review/Logo Scarfmedia.png" },
  { name: "Solopos", logo: "/images/media review/Logo Solopos.png" },
  { name: "Indo Times", logo: "/images/media review/Logo Indo Times.png" },
  { name: "Sokoguru", logo: "/images/media review/Logo Sokoguru.png" },
  {
    name: "Jurnal Indonesia",
    logo: "/images/media review/Logo Jurnal Indonesia.png",
  },
  { name: "VOI", logo: "/images/media review/Logo VOI.png" },
];

export default function Partners() {
  // Split strategic partners: first 4, then the rest
  const strategicRow1 = strategicPartners.slice(0, 4);
  const strategicRow2 = strategicPartners.slice(4);

  // Split media reviews: 5, 5, rest
  const mediaRow1 = mediaReviews.slice(0, 5);
  const mediaRow2 = mediaReviews.slice(5, 10);
  const mediaRow3 = mediaReviews.slice(10);

  return (
    <section
      id="strategic-partners"
      className="h-auto sm:h-[480px] md:h-[520px] lg:h-[560px] xl:h-[600px] py-[20px] sm:py-0 bg-white"
    >
      <div className="h-full flex flex-col items-center px-[20px] sm:px-0">
        {/* Strategic Partners */}
        <div className="flex flex-col items-center">
          {/* Spacing from top */}
          <div className="hidden sm:block h-[35px] md:h-[42px] lg:h-[48px] xl:h-[55px]"></div>

          <div className="h-[40px] sm:h-[42px] md:h-[48px] lg:h-[52px] xl:h-[56px] flex items-center justify-center">
            <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold text-[#D79C60] section-title">
              Strategic Partners
            </h2>
          </div>

          {/* Spacing to content */}
          <div className="h-[15px] sm:h-[18px] md:h-[20px] lg:h-[22px] xl:h-[25px]"></div>

          {/* Mobile: flex-wrap, Desktop: rows */}
          <div className="flex flex-wrap items-center justify-center gap-[10px] sm:hidden">
            {strategicPartners.map((partner, index) => (
              <div key={index} className="h-[25px] flex items-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={100}
                  height={25}
                  className="h-[25px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: Row 1 - 4 logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {strategicRow1.map((partner, index) => (
              <div
                key={index}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: 20px gap between rows */}
          <div className="hidden sm:block h-[20px]"></div>

          {/* Desktop: Row 2 - remaining logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {strategicRow2.map((partner, index) => (
              <div
                key={index}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Media Reviews */}
        <div className="flex flex-col items-center mt-[25px] sm:mt-[30px] md:mt-[34px] lg:mt-[38px] xl:mt-[40px]">
          <h2 className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold text-[#D79C60] text-center">
            Media Reviews
          </h2>

          {/* Spacing */}
          <div className="h-[15px] sm:h-[20px] md:h-[24px] lg:h-[28px] xl:h-[30px]"></div>

          {/* Mobile: flex-wrap */}
          <div className="flex flex-wrap items-center justify-center gap-[10px] sm:hidden">
            {mediaReviews.map((media, index) => (
              <div key={index} className="h-[25px] flex items-center">
                <Image
                  src={media.logo}
                  alt={media.name}
                  width={100}
                  height={25}
                  className="h-[25px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: Row 1 - 5 logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {mediaRow1.map((media, index) => (
              <div
                key={index}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={media.logo}
                  alt={media.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: 20px gap between rows */}
          <div className="hidden sm:block h-[20px]"></div>

          {/* Desktop: Row 2 - 5 logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {mediaRow2.map((media, index) => (
              <div
                key={index}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={media.logo}
                  alt={media.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>

          {/* Desktop: 20px gap between rows */}
          <div className="hidden sm:block h-[20px]"></div>

          {/* Desktop: Row 3 - remaining logos */}
          <div className="hidden sm:flex items-center justify-center gap-[20px]">
            {mediaRow3.map((media, index) => (
              <div
                key={index}
                className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] flex items-center"
              >
                <Image
                  src={media.logo}
                  alt={media.name}
                  width={120}
                  height={40}
                  className="h-[28px] md:h-[32px] lg:h-[36px] xl:h-[40px] w-auto object-contain"
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
