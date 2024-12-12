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
    character: "puppy",
    mainColor: "#F64435",
  },
  {
    id: 2,
    character: "penguin",
    mainColor: "#5B7F38",
  },
  {
    id: 3,
    character: "cat",
    mainColor: "#F64435",
  },
  {
    id: 4,
    character: "panda",
    mainColor: "#5B7F38",
  },
  {
    id: 5,
    character: "egg",
    mainColor: "#444E5C",
    subColor: "#FBF3EE",
  },
];

const frameSrcs = [
  "/_assets/frame/puppy.png",
  "/_assets/frame/penguin.png",
  "/_assets/frame/cat.png",
  "/_assets/frame/panda.png",
  "/_assets/frame/egg.png",
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
  const { character, mainColor, subColor } = CanvasPrepData[frameType - 1];
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

  const xPadding = (canvasSize.height * 37) / 543;
  const topIndex = (canvasSize.height * 110) / 543;

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center rounded-2xl p-4`}
    >
      <FrameStack
        frameType={frameType}
        handleClickBackground={handleClickBackground}
        onFrameStackLoad={onFrameStackLoad}
      />
      {/* 상단 Title */}
      <div className="absolute top-0 flex h-full w-full flex-col items-center gap-4 pt-4">
        <span
          className="relative z-30 flex flex-col items-center gap-2.5"
          style={{
            marginTop: canvasSize.height * 0.025,
          }}
        >
          <span className="z-30 flex flex-row items-center gap-1">
            <span
              style={{ color: frameType === 5 ? mainColor : "#ffffff" }}
              className="shifted-text text-lg font-bold"
            >
              {/* @{userData.partnerNickName}{님의}{" "} */}
              {dict.to_name.before}@{userData.partnerNickName}
              {dict.to_name.after}
            </span>
            {/* <TitleSvg fillColor="#f7807a" /> */}
            <MafooLogo
              width={78}
              fill={frameType === 5 ? mainColor : "#ffffff"}
            />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <SumoneLogo
            width={canvasSize.width / 4}
            height={27}
            fill={frameType === 5 ? mainColor : "#ffffff"}
          />
        </span>

        {images.length > 0 && (
          <div
            style={{
              backgroundColor: frameType === 5 ? subColor : mainColor,
              top: topIndex - 10,
              width: (canvasSize.height * 240) / 543 + 2 + "px",
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
          canvasSize={canvasSize}
          character={character}
          isAbleToChangeCharacter={frameType !== 5}
          dict={dict}
        />
        <span
          style={{
            left: xPadding,
          }}
          className="absolute bottom-6 z-30 flex flex-row items-center justify-center gap-1 rounded-full bg-[rgba(255,255,255,0.7)] px-4 py-2"
        >
          <DayHeartIcon width={28} />
          <span className="shifted-text text-lg leading-[140%] tracking-[0.36px]">
            {/* {userData.dDay} 일째 */}
            {dict.days.before} {userData.dDay} {dict.days.after}
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

    frameElements.find((el) => {
      const id = el.id;

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
    <div id="frame-stack">
      {frameSrcs.map((frameSrc, idx) => (
        <Image
          key={idx}
          id={`frame-${idx + 1}`}
          src={frameSrc}
          priority
          alt="frame"
          fill
          className="frame-element absolute top-0 z-20 h-full w-full object-contain bg-blend-overlay"
          onClick={handleClickBackground}
          onLoad={onLoad}
        />
      ))}
    </div>
  );
});

FrameStack.displayName = "FrameStack";

export default memo(Canvas);
