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
      className="rounded-2xl"
      style={{
        objectFit: "contain",
        width: "fit-content",
        height: "100%",
      }}
    />
  );
};

export default VideoArea;
