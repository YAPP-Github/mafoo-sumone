"use client";

import { useGetScreenSize } from "@/utils/useScreenSize";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ExampleImageSrcs = new Array(10)
  .fill(0)
  .map((_, idx) => `/_assets/mainpage/${idx}.png`);

const ImageSection = ({ onLoadFinish }: { onLoadFinish: () => void }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const loadedCountRef = useRef(10);

  const onLoad = () => {
    loadedCountRef.current--;
    if (loadedCountRef.current) return;

    onLoadFinish();
  };

  useEffect(() => {
    const imageStack = document.getElementById("image-stack") as HTMLDivElement;
    if (!imageStack) return;

    const imageElements = Array.from(
      document.querySelectorAll(".image-element")
    ).reverse() as HTMLImageElement[];

    imageElements.find((el) => {
      const id = el.id;

      if (id === `image-${imgIdx}`) {
        el.style.opacity = "1";
        return true;
      }

      el.remove();
      el.style.opacity = "0";
      imageStack.prepend(el);

      return false;
    });
  }, [imgIdx]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % 10);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return ExampleImageSrcs.map((src, idx) => (
    <Image
      key={idx}
      id={`image-${idx}`}
      src={src}
      priority
      quality={100}
      alt="image"
      fill
      sizes="100vw"
      onLoad={onLoad}
      className="image-element object-contain"
    />
  ));
};

const VideoArea = () => {
  const windowSize = useGetScreenSize();
  const [isFinishLoading, setIsFinishLoading] = useState(false);
  const [startImage, setStartImage] = useState(false);

  const onLoadFinish = () => {
    console.log("loaded");
    setIsFinishLoading(true);
  };

  const startImageLoad = () => {
    setStartImage(true);
  };
  return (
    <div className="relative mb-7 flex h-[calc(100%-360px)] w-full">
      <div
        id="image-stack"
        className="relative mx-6 mb-7 flex h-full w-full items-center justify-center"
      >
        <div
          className="h-full w-full"
          style={{
            opacity: isFinishLoading ? 1 : 0,
          }}
        >
          {startImage && <ImageSection onLoadFinish={onLoadFinish} />}
        </div>
        {!isFinishLoading && (
          <div className="h-full w-full">
            <Image
              src="/_assets/mainpage/0.png"
              priority
              fill
              sizes="100vw"
              alt="loading"
              onLoad={startImageLoad}
              className="object-contain"
            />
          </div>
        )}
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
