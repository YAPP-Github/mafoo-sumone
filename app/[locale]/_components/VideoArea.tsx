"use client";

import { useGetScreenSize } from "@/utils/useScreenSize";
import Image from "next/image";
import { useEffect, useState } from "react";

const VideoArea = () => {
  const windowSize = useGetScreenSize();
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % 10);
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <div className="relative mb-7 flex h-[calc(100%-360px)] w-full">
      <div className="relative mx-6 mb-7 flex h-full w-full items-center justify-center">
        <Image
          priority
          src={`/_assets/mainpage/${imgIdx}.png`}
          alt={`video image ${imgIdx}`}
          fill
          className="w-fit object-contain"
        />
      </div>
      <span
        className="sprite star yellow absolute"
        style={{
          top: 28 + "px",
          left: ((windowSize.height - 360) / 476) * 276 + 24 + 30 + "px",
        }}
      />
      <span
        className="sprite star green absolute"
        style={{
          top: (windowSize.height - 360) * 0.4 - 28 + "px",
          left: 12 + "px",
        }}
      />
      <span
        className="sprite red absolute"
        style={{
          top: (windowSize.height - 360) * 0.6 - 28 + "px",
          left: ((windowSize.height - 360) / 476) * 276 + 24 + 20 + "px",
        }}
      />
    </div>
  );
};

export default VideoArea;
