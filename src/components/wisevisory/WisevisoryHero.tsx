import Image from "next/image";

export default function WisevisoryHero() {
  return (
    <section className="h-[351px] bg-gray-300 flex items-center justify-center">
      <div className="relative w-[600px] h-[151px]">
        <Image
          src="/images/wisevisory_logo.png"
          alt="Wisevisory Logo"
          fill
          sizes="600px"
          className="object-contain"
          quality={100}
          priority
        />
      </div>
    </section>
  );
}
