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
      className="relative w-[355px] h-[200px] overflow-hidden group cursor-pointer"
    >
      {/* Thumbnail */}
      <Image
        src={thumbnailUrl}
        alt="YouTube Video Thumbnail"
        fill
        sizes="355px"
        className="object-cover"
        quality={100}
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[68px] h-[48px] bg-red-600 rounded-[12px] flex items-center justify-center group-hover:bg-red-700 transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
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
    <section className="h-[553px] bg-[#E8E8E8] flex items-center justify-center">
      <div className="grid grid-cols-2 gap-[20px]">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
