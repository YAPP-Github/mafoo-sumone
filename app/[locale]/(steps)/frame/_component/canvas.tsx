"use client";

import DayHeartIcon from "@/assets/DayHeartIcon";
import MafooLogo from "@/assets/MafooLogo";
import { ObjectedParams } from "@/types/user";
import Image from "next/image";
import { Dispatch, SetStateAction, memo } from "react";
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
  const { character, mainColor, subColor } = CanvasPrepData[frameType - 1];

  const handleClickBackground = () => {
    setImageIdx((prev) => (prev + 1) % images.length);
  };

  const xPadding = (canvasSize.height * 37) / 543;
  const topIndex = (canvasSize.height * 110) / 543;

  return (
    <div
      className={`w-full h-full rounded-2xl relative flex items-center flex-col p-4`}
    >
      {/* <Image
        src={frameSrc}
        alt="frame"
        fill
        className="absolute top-0 z-20 object-contain w-full h-full bg-blend-overlay"
        onClick={handleClickBackground}
      /> */}
      <span
        className={`absolute top-0 z-20 w-full h-full bg-blend-overlay sprite frame frame_${character}`}
        style={{
          zoom: canvasSize.height / 680,
        }}
        onClick={handleClickBackground}
      />
      {/* 상단 Title */}
      <div className="absolute top-0 flex flex-col items-center w-full h-full gap-4 pt-4">
        <span
          className="flex flex-col gap-2.5 items-center z-30 relative"
          style={{
            marginTop: canvasSize.height * 0.025,
          }}
        >
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
          canvasSize={canvasSize}
          character={character}
          isAbleToChangeCharacter={frameType !== 5}
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
