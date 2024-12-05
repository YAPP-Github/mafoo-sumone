"use client";

import Image from "next/image";

import MainStar1 from "@/assets/MainStar.png";
import MainStar2 from "@/assets/MainStar2.png";
import MainStar3 from "@/assets/MainStar3.png";
import { useGetScreenSize } from "@/utils/useScreenSize";

const VideoArea = () => {
  const windowSize = useGetScreenSize();

  return (
    <div className="h-[calc(100%-360px)] w-full flex mb-7 relative">
      <div className="flex w-full h-full items-center justify-center mx-6 mb-7">
        <video
          src="/_assets/main_video.mp4"
          autoPlay
          playsInline
          loop
          muted
          className="flex w-full h-full rounded-lg"
        />
      </div>
      <Image
        src={MainStar1}
        height={28}
        alt="Main Star 1"
        className="absolute object-contain"
        style={{
          top: 28 + "px",
          left: ((windowSize.height - 360) / 476) * 276 + 24 + 30 + "px",
        }}
      />
      <Image
        src={MainStar2}
        height={28}
        alt="Main Star 2"
        className="absolute object-contain"
        style={{
          top: (windowSize.height - 360) * 0.4 - 28 + "px",
          // left: -40 + "px",
          left: 12 + "px",
        }}
      />
      <Image
        src={MainStar3}
        height={17}
        alt="Main Star 3"
        className="absolute object-contain"
        style={{
          top: (windowSize.height - 360) * 0.8 - 28 + "px",
          left: ((windowSize.height - 360) / 476) * 276 + 24 + 20 + "px",
        }}
      />
    </div>
  );
};

export default VideoArea;
