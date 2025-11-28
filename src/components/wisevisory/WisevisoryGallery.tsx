import Image from "next/image";
import { wisevisoryGalleryImages } from "@/data/wisevisory";

export default function WisevisoryGallery() {
  return (
    <section className="h-[623px] bg-white flex flex-col items-center">
      {/* 55px spacing from top */}
      <div className="h-[55px]"></div>

      <div className="h-[56px] flex items-center justify-center">
        <h2 className="section-title">Gallery</h2>
      </div>

      {/* 25px spacing */}
      <div className="h-[25px]"></div>

      {/* Gallery Grid - 4x2 */}
      <div className="grid grid-cols-4 gap-[5px]">
        {wisevisoryGalleryImages.map((image) => (
          <div
            key={image.id}
            className="relative w-[205px] h-[205px] rounded-[20px] overflow-hidden bg-gray-200"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="205px"
              className="object-cover"
              quality={100}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
