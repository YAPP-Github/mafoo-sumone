"use client";

import DayHeartIcon from "@/assets/DayHeartIcon";
import MafooLogo from "@/assets/MafooLogo";
import Image from "next/image";
import { useState } from "react";
// import TitleSvg from "@/app/assets/Logo";
// import SpriteImg from "../_assets/canvas/sprite.png";

const CanvasPrepData = [
  {
    id: 1,
    frameSrc: "/_assets/canvas/frame/1.png",
    character1: "/_assets/canvas/character/puppy1.png",
    character2: "/_assets/canvas/character/puppy2.png",
    mainColor: "#F56965",
    subColor: "#FFDCD2",
  },
  {
    id: 2,
    frameSrc: "/_assets/canvas/frame/2.png",
    character1: "/_assets/canvas/character/panda1.png",
    character2: "/_assets/canvas/character/panda2.png",
    mainColor: "#65B5FF",
    subColor: "#BBE8FF",
  },
  {
    id: 3,
    frameSrc: "/_assets/canvas/frame/3.png",
    character1: "/_assets/canvas/character/cat1.png",
    character2: "/_assets/canvas/character/cat2.png",
    mainColor: "#B862EB",
    subColor: "#EADAFF",
  },
  {
    id: 4,
    frameSrc: "/_assets/canvas/frame/4.png",
    character1: "/_assets/canvas/character/panda1.png",
    character2: "/_assets/canvas/character/panda2.png",
    mainColor: "#C88F00",
    subColor: "#F3D78B",
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
  bgImage,
  canvasSize,
}: {
  frameType: number;
  bgImage: string;
  canvasSize: { width: number; height: number };
}) => {
  const [characterState, setCharacterState] = useState(0);
  const { date } = { date: 200 };

  const { frameSrc, character1, character2, mainColor, subColor } =
    CanvasPrepData[frameType - 1];

  const handleClickImage = () => {
    setCharacterState((prev) => 1 - prev);
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
        className="absolute top-0 z-20 object-contain w-full h-full"
      />
      {/* 상단 Title */}
      <div className="absolute top-0 flex flex-col items-center w-full h-full gap-4 pt-4">
        <span className="flex flex-col gap-2.5 items-center z-30 pt-6 relative">
          <span className="z-30 flex flex-row items-center gap-1">
            <span
              style={{ color: mainColor }}
              className="text-sm font-bold shifted-text"
            >
              @수연님의{" "}
            </span>
            {/* <TitleSvg fillColor="#f7807a" /> */}
            <MafooLogo
              width={78}
              fill={mainColor}
              subColor={subColor}
            />
          </span>
          {/* <Image
            src={SumoneLogo}
            alt="SumoneLogo"
            width={115}
            height={22}
          /> */}
          <Image
            src={"/_assets/SumoneLogo.png"}
            alt="SumoneLogo"
            width={115}
            height={22}
          />
        </span>

        {bgImage && (
          <div
            style={{
              backgroundColor: subColor,
              top: topIndex,
              width: (canvasSize.height * 240) / 543 + 2 + "px",
              height: (canvasSize.height * 354) / 543 + 2 + "px",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
            className="z-10"
          >
            <Image
              src={bgImage}
              alt="image"
              width={(canvasSize.height * 240) / 543}
              height={(canvasSize.height * 354) / 543}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
        )}

        <span
          style={{
            width: (canvasSize.height * 144) / 543 + "px",
            height: (canvasSize.height * 144) / 543 + "px",
          }}
          className="absolute bottom-0 right-0 z-30 grow-0"
          onClick={handleClickImage}
        >
          <Image
            src={characterState === 0 ? character1 : character2 || character1}
            fill
            className="w-full"
            alt="character"
            sizes={`${(canvasSize.height * 144) / 543}px`}
          />
          {character2 && (
            <span
              className="relative z-30 flex transform -translate-x-1/3 bottom-10 w-fit left-1/2"
              data-html2canvas-ignore="true"
            >
              <div className="w-fit bg-white py-2.5 px-3 rounded-lg shadow-sm z-20 whitespace-pre text-xs tracking-[0.24px] leading-[150%]">
                저 포즈도 바꿀 수 있어요!
                <span className="absolute w-4 h-4 rotate-45 -translate-x-1/2 bg-white rounded-sm left-1/2 -bottom-2" />
              </div>
            </span>
          )}
        </span>
        <span
          style={{
            left: xPadding,
          }}
          className="absolute bottom-4 flex flex-row gap-1 z-30 bg-[rgba(255,255,255,0.7)] px-4 rounded-full py-2 items-center justify-center"
        >
          <DayHeartIcon width={28} />
          <span className="text-lg tracking-[0.36px] leading-[140%] shifted-text">
            {date} 일째
          </span>
        </span>
      </div>
    </div>
  );
};

export default Canvas;
