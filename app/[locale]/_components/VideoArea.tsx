"use client";

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
