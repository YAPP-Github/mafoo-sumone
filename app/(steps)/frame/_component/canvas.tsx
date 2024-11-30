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
}: {
  frameType: number;
  bgImage: string;
}) => {
  const [characterState, setCharacterState] = useState(0);
  const { date } = { date: 200 };

  const { frameSrc, character1, character2, mainColor, subColor } =
    CanvasPrepData[frameType - 1];

  const handleClickImage = () => {
    setCharacterState((prev) => 1 - prev);
  };

  return (
    <div
      className={`w-full h-full rounded-2xl relative flex items-center flex-col p-4`}
    >
      <img
        src={frameSrc}
        alt="frame"
        className="w-full h-full object-contain absolute top-0 z-20"
      />
      {/* 상단 Title */}
      <div className="absolute top-0 pt-4 h-full w-full flex flex-col gap-4 items-center">
        <span className="flex flex-col gap-2.5 items-center z-30 pt-6 relative">
          <span className="flex flex-row gap-1 items-center z-30">
            <span
              style={{ color: mainColor }}
              className="font-bold text-sm shifted-text"
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
          <img
            src={"/_assets/SumoneLogo.png"}
            alt="SumoneLogo"
            width={115}
            height={22}
          />
        </span>

        {bgImage && (
          <img
            src={bgImage}
            alt="image"
            className="w-full object-cover z-10 px-10 pt-4"
          />
        )}
        <span
          className="absolute right-0 bottom-0 w-[200px] h-[200px] grow-0 z-30"
          onClick={handleClickImage}
        >
          <Image
            src={characterState === 0 ? character1 : character2 || character1}
            fill
            className="w-full"
            alt="character"
          />
        </span>
        <span className="absolute bottom-4 left-10 flex flex-row gap-1 z-30 bg-[rgba(255,255,255,0.7)] px-4 rounded-full py-2 items-center justify-center">
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
