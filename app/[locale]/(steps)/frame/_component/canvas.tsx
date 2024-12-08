"use client";

import DayHeartIcon from "@/assets/DayHeartIcon";
import MafooLogo from "@/assets/MafooLogo";
import { ObjectedParams } from "@/types/user";
import Image from "next/image";
import { Dispatch, SetStateAction, memo } from "react";
import Character from "./Character";
// import TitleSvg from "@/app/assets/Logo";
// import SpriteImg from "../_assets/canvas/sprite.png";

const CanvasPrepData = [
  {
    id: 1,
    frameSrc: "/_assets/canvas/frame/1.png",
    character1: "/_assets/canvas/character/puppy1.png",
    character2: "/_assets/canvas/character/puppy2.png",
    mainColor: "#F64435",
    subColor: "#ffffff",
  },
  {
    id: 2,
    frameSrc: "/_assets/canvas/frame/2.png",
    character1: "/_assets/canvas/character/penguin1.png",
    character2: "/_assets/canvas/character/penguin2.png",
    mainColor: "#5B7F38",
    subColor: "#ffffff",
  },
  {
    id: 3,
    frameSrc: "/_assets/canvas/frame/3.png",
    character1: "/_assets/canvas/character/cat1.png",
    character2: "/_assets/canvas/character/cat2.png",
    mainColor: "#F64435",
    subColor: "#ffffff",
  },
  {
    id: 4,
    frameSrc: "/_assets/canvas/frame/4.png",
    character1: "/_assets/canvas/character/panda1.png",
    character2: "/_assets/canvas/character/panda2.png",
    mainColor: "#5B7F38",
    subColor: "#ffffff",
  },
  {
    id: 5,
    frameSrc: "/_assets/canvas/frame/5.png",
    character1: "/_assets/canvas/character/egg1.png",
    mainColor: "#444E5C",
    subColor: "#FBF3EE",
  },
];

const Canvas = ({
  frameType,
  images,
  canvasSize,
  imageIdx,
  setImageIdx,
  userData,
}: {
  frameType: number;
  images: File[];
  canvasSize: { width: number; height: number };
  imageIdx: number;
  setImageIdx: Dispatch<SetStateAction<number>>;
  userData: ObjectedParams;
}) => {
  const { frameSrc, character1, character2, mainColor, subColor } =
    CanvasPrepData[frameType - 1];

  const handleClickBackground = () => {
    setImageIdx((prev) => (prev + 1) % images.length);
  };

  const xPadding = (canvasSize.height * 37) / 543;
  const topIndex = (canvasSize.height * 110) / 543;

  return (
    <div
      className={`w-full h-full rounded-2xl relative flex items-center flex-col p-4`}
    >
      <Image
        src={frameSrc}
        alt="frame"
        fill
        className="absolute top-0 z-20 object-contain w-full h-full bg-blend-overlay"
        onClick={handleClickBackground}
      />
      {/* 상단 Title */}
      <div className="absolute top-0 flex flex-col items-center w-full h-full gap-4 pt-4">
        <span className="flex flex-col gap-2.5 items-center z-30 pt-8 relative">
          <span className="z-30 flex flex-row items-center gap-1">
            <span
              style={{ color: frameType === 5 ? mainColor : "#ffffff" }}
              className="text-lg font-bold shifted-text"
            >
              @{userData.partnerNickName}님의{" "}
            </span>
            {/* <TitleSvg fillColor="#f7807a" /> */}
            <MafooLogo
              width={78}
              fill={frameType === 5 ? mainColor : "#ffffff"}
            />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/_assets/SumoneLogo.png"}
            alt="SumoneLogo"
            width={canvasSize.width / 4}
            height={27}
          />
        </span>

        {images.length > 0 && (
          <div
            style={{
              backgroundColor: frameType === 5 ? subColor : mainColor,
              top: topIndex - 2,
              width: (canvasSize.height * 240) / 543 + 2 + "px",
              height: (canvasSize.height * 354) / 543 + 4 + "px",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
            className="z-10"
          >
            <Image
              id="targetImage"
              src={URL.createObjectURL(images[imageIdx])}
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
          character1={character1}
          character2={character2}
          canvasSize={canvasSize}
        />
        <span
          style={{
            left: xPadding,
          }}
          className="absolute bottom-6 flex flex-row gap-1 z-30 bg-[rgba(255,255,255,0.7)] px-4 rounded-full py-2 items-center justify-center"
        >
          <DayHeartIcon width={28} />
          <span className="text-lg tracking-[0.36px] leading-[140%] shifted-text">
            {userData.dDay} 일째
          </span>
        </span>
      </div>
    </div>
  );
};

export default memo(Canvas);
