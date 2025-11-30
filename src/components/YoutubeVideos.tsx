"use client";

import Image from "next/image";

interface VideoData {
  id: string;
  url: string;
}

const videos: VideoData[] = [
  {
    id: "8fe8vErMMkM",
    url: "https://www.youtube.com/watch?v=8fe8vErMMkM",
  },
  {
    id: "AcDYabC624U",
    url: "https://www.youtube.com/watch?v=AcDYabC624U",
  },
  {
    id: "PdHc3smH2jg",
    url: "https://www.youtube.com/watch?v=PdHc3smH2jg",
  },
  {
    id: "XQMDlAs7cdc",
    url: "https://www.youtube.com/watch?v=XQMDlAs7cdc",
  },
];

function VideoCard({ video }: { video: VideoData }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  const handleClick = () => {
    window.open(video.url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-[280px] h-[158px] sm:w-[240px] sm:h-[135px] md:w-[280px] md:h-[158px] lg:w-[320px] lg:h-[180px] xl:w-[355px] xl:h-[200px] overflow-hidden group cursor-pointer"
    >
      {/* Thumbnail */}
      <Image
        src={thumbnailUrl}
        alt="YouTube Video Thumbnail"
        fill
        sizes="(max-width: 640px) 280px, (max-width: 768px) 240px, (max-width: 1024px) 280px, (max-width: 1280px) 320px, 355px"
        className="object-cover"
        quality={100}
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[50px] h-[35px] sm:w-[48px] sm:h-[33px] md:w-[55px] md:h-[38px] lg:w-[62px] lg:h-[43px] xl:w-[68px] xl:h-[48px] bg-red-600 rounded-[8px] sm:rounded-[9px] md:rounded-[10px] lg:rounded-[11px] xl:rounded-[12px] flex items-center justify-center group-hover:bg-red-700 transition-colors">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] xl:w-6 xl:h-6"
          >
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export default function YoutubeVideos() {
  return (
    <section
      id="videos"
      className="h-auto sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[553px] py-[20px] sm:py-0 flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/images/bg-youtube.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Mobile: single column, Desktop: 2x2 grid */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-[10px] sm:gap-[12px] md:gap-[15px] lg:gap-[18px] xl:gap-[20px]">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
