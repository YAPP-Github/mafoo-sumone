"use client";

import { useRef, useState, useEffect } from "react";
import Canvas from "./_component/canvas";
import html2canvas from "html2canvas";
import Header from "@/components/Header";
import HeartIcon from "@/assets/HeartIcon";
import { useRouter } from "next/navigation";

const FramePage = () => {
  const navigation = useRouter();
  const [frameType, setFrameType] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState<string>("");
  const canvasRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // 세션 스토리지에서 이미지 데이터 가져오기
    const image = sessionStorage.getItem("selectedImage");
    if (image) {
      setImageSrc(image);
    }
  }, []);

  const handleSelectFrame = async () => {
    if (!canvasRef.current) return;

    canvasRef.current.style.width = "353px";
    canvasRef.current.style.height = "612px";

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
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        navigation.push("/result");
      }, 5000);

      // const link = document.createElement("a");
      // link.href = dataUrl;
      // link.download = "canvas_frame.jpeg";
      // link.click();
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
      <div className="w-[353px] h-full flex flex-col gap-6 items-center justify-center">
        {/* Canvas Component Wrapper */}
        <div
          ref={canvasRef}
          style={{ width: "353px", height: "612px" }}
        >
          <Canvas
            frameType={frameType}
            bgImage={imageSrc}
          />
        </div>

        <div className="flex flex-row w-full gap-4 overflow-x-scroll">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setFrameType(index + 1)}
              className={`w-14 h-14 rounded-full bg-white flex items-center justify-center`}
            >
              <img
                src={`/_assets/canvas/selectBtn/${index + 1}.png`}
                alt="frameChip"
                className="w-14 h-14 object-contain"
              />
            </button>
          ))}
        </div>
        <div className="flex-row w-full gap-2">
          <button
            onClick={handleSelectFrame}
            className="w-full h-12 bg-pink text-sm tracking-[0.28px] leading-[150%] text-white"
          >
            이 프레임으로 만들게요
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="fixed w-[calc(100%-48px)] h-[500px] bg-image z-50 mx-6 flex flex-col">
          <div className="w-full h-full flex flex-col gap-2.5 pt-12 pb-14">
            <div className="flex flex-col gap-7 items-center pb-12">
              <HeartIcon width={28} />
              <span className="text-center text-lg text-gray-800 tracking-[0.36px] leading-[160%]">
                지금 만든 추억
                <br />
                마푸에서 한 달간 다시 볼 수 있어요
              </span>
              <span className="text-center text-sm text-gray-600 tracking-[0.28px] leading-[150%]">
                {`상대방`}님을 사랑하는 마음을
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
