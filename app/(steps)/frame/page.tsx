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
import { getPresignedUrls } from "../api";

const FramePage = () => {
  const { partner } = {
    partner: "영지",
  };
  const navigation = useRouter();
  const canvasSize = useGetCanvasSize();
  const [frameType, setFrameType] = useState<number>(1);
  const { photos } = usePhotoStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [imageIdx, setImageIdx] = useState(0);

  useEffect(() => {
    console.log("photos", photos);
    if (!photos.length) {
      navigation.push("/pickphoto");
    }
  }, [photos, navigation]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRecapFramedPhoto = async (dataUrls: string[]) => {
    console.log("handleSendFramedPhoto", dataUrls);

    // presigned URLs 가져오기
    const presignedResult = await getPresignedUrls(photos);
    if (!presignedResult) {
      console.error("Failed to get presigned URLs");
      navigation.push("/pickphoto");
      return;
    }

    const [albumId, urls] = presignedResult;
    console.log("Presigned URLs: ", urls);

    // dataUrls (프레임된 이미지들) 업로드
    try {
      const uploadPromises = dataUrls.map(async (dataUrl, index) => {
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const file = new File([blob], `frame_${index + 1}.jpeg`, {
          type: "image/jpeg",
        });
        const presignedUrl = urls[index];

        return fetch(presignedUrl, {
          method: "PUT",
          body: file,
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to upload frame ${index + 1}`);
          }
          return res;
        });
      });

      await Promise.all(uploadPromises);

      // presigned URL에서 query string 제거 후 새 URL 생성
      const newUrls = urls.map((url: string) => {
        return url.split("?")[0];
      });

      // recap API 호출
      const { recapUrl } = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sumone/albums/${albumId}/recap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileUrls: newUrls,
          }),
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          console.error("Error calling recap API:", err);
          throw err;
        });

      console.log("recapUrl", recapUrl);

      setIsLoading(false);
      navigation.push(`/result?recapUrl=${recapUrl}`);
    } catch (err) {
      console.error("Error during recap processing:", err);
      setIsLoading(false);
    }
  };

  const handleSelectFrame = async () => {
    if (!canvasRef.current || !canvasSize.width) return;

    // Set the canvas size based on the available width and height
    canvasRef.current.style.width = canvasSize.width + "px";
    canvasRef.current.style.height = canvasSize.height + "px";

    setIsLoading(true); // Show loading indicator
    const dataUrls: string[] = [];

    // Iterate over all photos
    for (let idx = 0; idx < photos.length; idx++) {
      try {
        // Wait for the canvas to be updated with the new image
        const canvas = await html2canvas(canvasRef.current, {
          onclone: (el) => {
            const elementsWithShiftedDownwardText =
              el.querySelectorAll(".shifted-text");
            elementsWithShiftedDownwardText.forEach((element) => {
              const htmlElement = element as HTMLElement;
              // Adjust styles or do whatever you want here
              htmlElement.style.transform = "translateY(-40%)";
            });
          },
        });

        // Convert the canvas to a data URL (image)
        const dataUrl = canvas.toDataURL("image/jpeg");
        dataUrls.push(dataUrl);

        // Create a temporary link to download the image
        // const link = document.createElement("a");
        // link.href = dataUrl;
        // link.download = `canvas_frame_${idx + 1}.jpeg`;
        // link.click();
        setImageIdx((prev) => (prev + 1) % photos.length);
        await new Promise((resolve) => setTimeout(resolve, 10));
      } catch (error) {
        console.error("Failed to capture the frame:", error);
      }
    }

    handleRecapFramedPhoto(dataUrls);

    // Hide the loading indicator after all downloads
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
              imageIdx={imageIdx}
              setImageIdx={setImageIdx}
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
