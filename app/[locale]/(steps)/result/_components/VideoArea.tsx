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
      className="h-fit max-h-full w-fit max-w-full rounded-2xl object-contain"
    />
  );
};

export default VideoArea;
