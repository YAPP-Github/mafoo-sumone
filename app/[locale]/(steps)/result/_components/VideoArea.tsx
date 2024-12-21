"use client";

const VideoArea = ({ videoSrc }: { videoSrc: string }) => {
  return (
    <video
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
