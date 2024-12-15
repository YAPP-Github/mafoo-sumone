/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DayHeartIcon from "@/assets/DayHeartIcon";
import MafooLogo from "@/assets/MafooLogo";
import { ObjectedParams } from "@/types/user";
import Image from "next/image";
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Character from "./Character";
import SumoneLogo from "@/assets/SumoneLogo";
// import TitleSvg from "@/app/assets/Logo";
// import SpriteImg from "../_assets/canvas/sprite.png";

const CanvasPrepData = [
  {
    id: 1,
    mainColor: "#F64435",
  },
  {
    id: 2,
    mainColor: "#5B7F38",
  },
  {
    id: 3,
    mainColor: "#F64435",
  },
  {
    id: 4,
    mainColor: "#5B7F38",
  },
  {
    id: 5,
    mainColor: "#444E5C",
    subColor: "#FBF3EE",
  },
];

const frameSrcs = [
  // Local 1x
  "/_assets/frame/puppy.png",
  "/_assets/frame/penguin.png",
  "/_assets/frame/cat.png",
  "/_assets/frame/panda.png",
  "/_assets/frame/egg.png",
  // CDN 1x
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/puppy.png",
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/penguin.png",
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/cat.png",
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/panda.png",
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/egg.png",
  // Local 3x
  // "/_assets/frame/3x/Frame.png",
  // "/_assets/frame/3x/Frame-1.png",
  // "/_assets/frame/3x/Frame-2.png",
  // "/_assets/frame/3x/Frame-3.png",
  // "/_assets/frame/3x/Frame-4.png",
  // CDN 3x
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/3x/Frame.png",
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/3x/Frame-1.png",
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/3x/Frame-2.png",
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/3x/Frame-3.png",
  // "https://mafoo-sumone-event.imgix.net/_assets/frame/3x/Frame-4.png",
] as const;

interface CanvasProps {
  frameType: number;
  images: File[];
  canvasSize: { width: number; height: number };
  imageIdx: number;
  setImageIdx: Dispatch<SetStateAction<number>>;
  userData: ObjectedParams;
  dict: Record<string, any>;
}

const Canvas = ({
  frameType,
  images,
  canvasSize,
  imageIdx,
  setImageIdx,
  userData,
  dict,
}: CanvasProps) => {
  const { mainColor, subColor } = CanvasPrepData[frameType - 1];
  const [isFrameStackLoaded, setIsFrameStackLoaded] = useState(false);

  const photoSrc = useMemo(() => {
    return URL.createObjectURL(images[imageIdx]);
  }, [images, imageIdx]);

  const handleClickBackground = useCallback(() => {
    setImageIdx((prev) => (prev + 1) % images.length);
  }, [images]);

  const onFrameStackLoad = useCallback(() => {
    setIsFrameStackLoaded(true);
  }, []);

  const xPadding = (canvasSize.height * 46) / 680;
  const topIndex = (canvasSize.height * 110) / 543;

  return (
    <div className={`relative flex h-full w-full flex-col items-center`}>
      <FrameStack
        frameType={frameType}
        handleClickBackground={handleClickBackground}
        onFrameStackLoad={onFrameStackLoad}
      />
      {/* 상단 Title */}
      <div className="absolute top-0 flex h-full w-full flex-col items-center gap-4 pt-4">
        <span
          className="relative z-30 flex flex-col items-center"
          style={{
            marginTop: canvasSize.height * 0.015,
          }}
        >
          <span
            className="z-30 flex flex-row items-center gap-1"
            style={{
              opacity: 0.8,
            }}
          >
            <span
              style={{ color: frameType === 5 ? mainColor : "#ffffff" }}
              className="shifted-text text-sm font-bold leading-[140%] tracking-[0.28px]"
            >
              {/* @{userData.partnerNickName}{님의}{" "} */}
              {dict.to_name.before}@{userData.partnerNickName}
              {dict.to_name.after}
            </span>
            {/* <TitleSvg fillColor="#f7807a" /> */}
            <MafooLogo
              width={62}
              fill={frameType === 5 ? mainColor : "#ffffff"}
            />
          </span>

          <SumoneLogo
            width={canvasSize.width / 3}
            height={30}
            fill={frameType === 5 ? mainColor : "#ffffff"}
          />
        </span>

        {images.length > 0 && (
          <div
            style={{
              backgroundColor: frameType === 5 ? subColor : mainColor,
              top: topIndex - 10,
              width: (canvasSize.height * 240) / 543 + 10 + "px",
              height: (canvasSize.height * 354) / 543 + 20 + "px",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              opacity: isFrameStackLoaded ? 1 : 0,
            }}
            className="z-10"
          >
            <Image
              id="targetImage"
              src={photoSrc}
              alt="image"
              width={(canvasSize.height * 240) / 543}
              height={(canvasSize.height * 354) / 543}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "16px",
              }}
            />
          </div>
        )}
        <Character
          frameType={frameType}
          canvasSize={canvasSize}
          dict={dict}
        />

        <span
          style={{
            left: xPadding,
            bottom: xPadding * 0.8,
          }}
          className="absolute z-30 flex flex-row items-center justify-center gap-1 rounded-full border border-white bg-[rgba(255,255,255,0.8)] py-1 pl-2 pr-2.5"
        >
          <DayHeartIcon
            width={24}
            height={24}
          />
          <span className="shifted-text text-center text-sm font-bold tracking-[0.36px]">
            {/* {userData.dDay} 일째 */}
            {dict.days.before}
            {userData.dDay}
            {dict.days.after}
          </span>
        </span>
      </div>
    </div>
  );
};

const FrameStack = memo(function ({
  frameType,
  handleClickBackground,
  onFrameStackLoad,
}: {
  frameType: number;
  handleClickBackground: () => void;
  onFrameStackLoad: () => void;
}) {
  const loadedCountRef = useRef(frameSrcs.length);

  const onLoad = () => {
    loadedCountRef.current--;
    if (loadedCountRef.current) return;

    onFrameStackLoad();
  };

  useEffect(() => {
    const frameStack = document.getElementById("frame-stack") as HTMLDivElement;
    if (!frameStack) return;

    const frameElements = Array.from(
      document.querySelectorAll(".frame-element")
    ).reverse() as HTMLImageElement[];

    console.log("frameType", frameType, frameElements);
    frameElements.find((el) => {
      const id = el.id;
      console.log(el);

      if (id === `frame-${frameType}`) {
        el.style.opacity = "1";
        return true;
      }
      el.remove();
      el.style.opacity = "0";
      frameStack.prepend(el);

      return false;
    });
  }, [frameType]);

  return (
    <div
      id="frame-stack"
      className="relative h-full w-full"
    >
      {frameSrcs.map((frameSrc, idx) => (
        <Image
          key={idx}
          id={`frame-${idx + 1}`}
          src={frameSrc}
          priority
          alt="frame"
          fill
          className={`frame-element absolute top-0 z-20 h-full w-full rounded-2xl object-contain bg-blend-overlay`}
          onClick={handleClickBackground}
          onLoad={onLoad}
        />
      ))}
    </div>
  );
});

FrameStack.displayName = "FrameStack";

export default memo(Canvas);
