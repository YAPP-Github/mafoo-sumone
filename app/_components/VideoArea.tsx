"use client";

import Image from "next/image";

import MainStar1 from "@/assets/MainStar.png";
import MainStar2 from "@/assets/MainStar2.png";
import MainStar3 from "@/assets/MainStar3.png";
import { useGetScreenSize } from "@/utils/useScreenSize";

const VideoArea = () => {
  const windowSize = useGetScreenSize();

  return (
    <div className="flex-grow h-[calc(100%-360px)] aspect-[276/476] bg-gray-700 rounded-lg mx-[60px] mb-7">
      <Image
        src={MainStar1}
        height={28}
        alt="Main Star 1"
        className={`relative`}
        style={{
          top: 14 + "px",
          left: ((windowSize.height - 360) / 476) * 276 + 12 + "px",
        }}
      />
      <Image
        src={MainStar2}
        height={28}
        alt="Main Star 2"
        className={`relative`}
        style={{
          top: (windowSize.height - 360) * 0.4 - 28 + "px",
          left: -40 + "px",
        }}
      />
      <Image
        src={MainStar3}
        height={17}
        alt="Main Star 3"
        className={`relative`}
        style={{
          top: (windowSize.height - 360) * 0.8 - 28 + "px",
          left: ((windowSize.height - 360) / 476) * 276 + 20 + "px",
        }}
      />
    </div>
  );
};

export default VideoArea;
