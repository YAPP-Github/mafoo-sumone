"use client";

import { useEffect, useRef, useState } from "react";
import Canvas from "./canvas";
import html2canvas from "html2canvas";
import Header from "@/components/Header";
import HeartIcon from "@/assets/HeartIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetCanvasSize } from "@/utils/useScreenSize";
import { usePhotoStore } from "@/atom/photo";
import SumoneButton from "@/assets/SumoneButton";
import { getPresignedUrls } from "../../api";
import { ObjectedParams } from "@/types/user";

interface FrameProps {
  locale: string;
  userData: ObjectedParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
}

const Frame = ({ locale, userData, dict }: FrameProps) => {
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const canvasSize = useGetCanvasSize(userData.top, userData.bottom);
  const [frameType, setFrameType] = useState<number>(1);
  const { photos } = usePhotoStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [imageIdx, setImageIdx] = useState(0);

  const pathName = usePathname();
  console.log(pathName, searchParams.toString());

  useEffect(() => {
    if (!photos.length) {
      navigation.push(`pickphoto?${searchParams.toString()}`);
    }
  }, [photos, navigation]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*
  const handleTestRecap = async () => {
    if (!canvasRef.current || !canvasSize.width) return;

    // Set the canvas size based on the available width and height
    // canvasRef.current.style.width = canvasSize.width + "px";
    // canvasRef.current.style.height = canvasSize.height + "px";
    canvasRef.current.style.width = "393px";
    canvasRef.current.style.height = "680px";

    setIsLoading(true); // Show loading indicator
    const dataUrls: string[] = [];

    // Iterate over all photos

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
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `canvas_frame.jpeg`;
      link.click();
      setImageIdx((prev) => (prev + 1) % photos.length);
      await new Promise((resolve) => setTimeout(resolve, 10));
    } catch (error) {
      console.error("Failed to capture the frame:", error);
    }
    setIsLoading(false);

    // Hide the loading indicator after all downloads
  };
  */

  const handleRecapFramedPhoto = async (dataUrls: string[]) => {
    // presigned URLs 가져오기
    console.time("리캡 이미지 presigned url 발급");
    const presignedResult = await getPresignedUrls(photos);
    if (!presignedResult) {
      console.error("Failed to get presigned URLs");
      navigation.push(`/pickphoto?${searchParams.toString()}`);
      return;
    }
    console.timeEnd("리캡 이미지 presigned url 발급");

    const [albumId, urls] = presignedResult;
    console.log("Presigned URLs: ", urls);

    // dataUrls (프레임된 이미지들) 업로드
    try {
      console.time("이미지 PUT");
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

      console.timeEnd("이미지 PUT");
      // presigned URL에서 query string 제거 후 새 URL 생성
      const newUrls = urls.map((url: string) => {
        return url.split("?")[0];
      });

      console.time("리캡 생성 요청");
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
      console.timeEnd("리캡 생성 요청");

      setIsLoading(false);
      navigation.push(`result?${searchParams.toString()}&recapUrl=${recapUrl}`);
    } catch (err) {
      console.error("Error during recap processing:", err);
      setIsLoading(false);
      if (typeof window !== "undefined" && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "exit" }));
      }
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
    <main
      className={`${
        isLoading && "dark-overlay"
      } w-full h-full bg-black flex-col items-center flex justify-center`}
      style={{
        paddingTop: userData.top + "px",
        paddingBottom: userData.bottom + "px",
      }}
    >
      <Header
        titleComponent={
          <div className="flex flex-row gap-1 items-center  text-lg tracking-[0.36px] leading-[140%]">
            {/* 프레임 선택 */}
            {dict.select_frame}
          </div>
        }
        onClickPrev={() =>
          navigation.push(`pickphoto?${searchParams.toString()}`)
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
              userData={userData}
              dict={dict}
            />
          )}
        </div>

        <div className="flex flex-col w-full gap-5 px-6">
          <div className="flex flex-row justify-between w-full overflow-x-scroll">
            {["puppy", "penguin", "cat", "panda", "egg"].map(
              (character, index) => (
                <button
                  key={index}
                  onClick={() => setFrameType(index + 1)}
                  className={`w-14 h-14 rounded-full bg-white flex items-center justify-center relative focus:outline-none`}
                >
                  <span
                    className={`sprite_f chip chip_${character} ${
                      index + 1 === frameType
                        ? "border-2 border-white rounded-full"
                        : "opacity-40"
                    }`}
                  />
                </button>
              )
            )}
          </div>
          <div className="w-full flex">
            <SumoneButton
              width="100%"
              height={48}
              fill="#ff9092"
              // text="이 프레임으로 만들게요"
              text={dict.make_with_this_frame}
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
              {locale === "ko" && (
                <span className="text-center text-lg text-gray-800 tracking-[0.36px] leading-[160%]">
                  지금 만든 추억
                  <br />
                  마푸에서 한 달간 다시 볼 수 있어요
                </span>
              )}
              <span className="text-center text-sm text-gray-600 tracking-[0.28px] leading-[150%] whitespace-pre">
                {/* {userData.partnerNickName}님을 사랑하는 마음을 */}
                {dict.full_of_love.before} {userData.partnerNickName}{" "}
                {dict.full_of_love.after}
              </span>
            </div>
            {/* Carousel */}
            <div className="w-full h-[150px] bg-pastelpink">캐러셀~~~</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Frame;
