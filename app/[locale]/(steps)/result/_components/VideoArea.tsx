"use client";

import { useEffect, useRef } from "react";

const VideoArea = ({ videoSrc }: { videoSrc: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.play();
  }, [videoSrc]);

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      autoPlay={true}
      loop
      playsInline
      muted
      className="h-fit w-fit rounded-2xl object-contain"
    />
  );
};

export default VideoArea;
