"use client";

import { useEffect, useRef, useState } from "react";
import Canvas from "./_component/canvas";
import html2canvas from "html2canvas";
import Header from "@/components/Header";
import HeartIcon from "@/assets/HeartIcon";
import { useRouter } from "next/navigation";
import { useGetCanvasSize } from "@/utils/useScreenSize";
import Image from "next/image";
import { usePhotoStore } from "@/atom/photo";
import SumoneButton from "@/assets/SumoneButton";

const FramePage = () => {
  const { partner } = {
    partner: "영지",
  };
  const navigation = useRouter();
  const canvasSize = useGetCanvasSize();
  const [frameType, setFrameType] = useState<number>(1);
  const { photos } = usePhotoStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("photos", photos);
    if (!photos.length) {
      navigation.push("/pickphoto");
    }
  }, [photos, navigation]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectFrame = async () => {
    if (!canvasRef.current || !canvasSize.width) return;

    canvasRef.current.style.width = canvasSize.width + "px";
    canvasRef.current.style.height = canvasSize.height + "px";

    try {
      const canvas = await html2canvas(canvasRef.current, {
        onclone: (el) => {
          const elementsWithShiftedDownwardText =
            el.querySelectorAll(".shifted-text");
          elementsWithShiftedDownwardText.forEach((element) => {
            const htmlElement = element as HTMLElement;
            // adjust styles or do whatever you want here
            htmlElement.style.transform = "translateY(-40%)";
          });
        },
      });

      const dataUrl = canvas.toDataURL("image/jpeg");
      console.log(dataUrl);
      setIsLoading(true);

      // const link = document.createElement("a");
      // link.href = dataUrl;
      // link.download = "canvas_frame.jpeg";
      // link.click();
      setTimeout(() => {
        setIsLoading(false);
        navigation.push("/result");
      }, 5000);
    } catch (error) {
      console.error("Failed to capture the frame:", error);
    }
  };

  return (
    <div
      className={`${
        isLoading && "dark-overlay"
      } w-full h-full bg-black flex-col items-center flex justify-center`}
    >
      <Header
        titleComponent={
          <div className="flex flex-row gap-1 items-center  text-lg tracking-[0.36px] leading-[140%]">
            프레임 선택
          </div>
        }
      />
      <div className="flex flex-col items-center justify-center w-full h-full gap-6">
        {/* Canvas Component Wrapper */}
        <div
          ref={canvasRef}
          style={{ width: canvasSize.width, height: canvasSize.height }}
        >
          {photos.length > 0 && (
            <Canvas
              frameType={frameType}
              images={photos}
              canvasSize={canvasSize}
            />
          )}
        </div>

        <div className="flex flex-col w-full gap-3 px-6">
          <div className="flex flex-row justify-between w-full overflow-x-scroll">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setFrameType(index + 1)}
                className={`w-14 h-14 rounded-full bg-white flex items-center justify-center relative`}
              >
                <Image
                  src={`/_assets/canvas/selectBtn/${index + 1}.png`}
                  alt="frameChip"
                  fill
                  sizes="14"
                  className={`${
                    index + 1 === frameType
                      ? "border-2 border-white rounded-full"
                      : "opacity-40"
                  } object-contain w-full h-full`}
                />
              </button>
            ))}
          </div>
          <div className="w-full flex">
            <SumoneButton
              width="100%"
              height={48}
              fill="#ff9092"
              text="이 프레임으로 만들게요"
              textClass="text-white text-sm tracking-[0.28px] leading-[150%]"
              onClick={handleSelectFrame}
            />
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="fixed w-[calc(100%-48px)] h-[500px] bg-image z-50 mx-6 flex flex-col">
          <div className="w-full h-full flex flex-col gap-2.5 pt-12 pb-14">
            <div className="flex flex-col items-center pb-12 gap-7">
              <HeartIcon width={28} />
              <span className="text-center text-lg text-gray-800 tracking-[0.36px] leading-[160%]">
                지금 만든 추억
                <br />
                마푸에서 한 달간 다시 볼 수 있어요
              </span>
              <span className="text-center text-sm text-gray-600 tracking-[0.28px] leading-[150%]">
                {partner}님을 사랑하는 마음을
                <br />
                가득 담아 만들고 있어요!
              </span>
            </div>
            {/* Carousel */}
            <div className="w-full h-[150px] bg-pastelpink">캐러셀~~~</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FramePage;
