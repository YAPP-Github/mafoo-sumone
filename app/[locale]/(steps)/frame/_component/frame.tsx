"use client";

import { useEffect, useRef, useState } from "react";
import Canvas from "./canvas";
import html2canvas from "html2canvas";
import Header from "@/components/Header";
import HeartIcon from "@/assets/HeartIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCanvasSize } from "@/utils/useScreenSize";
import { usePhotoStore } from "@/atom/photo";
import SumoneButton from "@/assets/SumoneButton";
import { ObjectedParams } from "@/types/user";
import { getPresignedUrls } from "../../api";

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
  console.log(canvasSize);

  const [
    isUploadPhotosAndCreateAlbumLoading,
    setIsUploadPhotoAndCreateAlbumLoading,
  ] = useState(false);

  const uploadPhotosAndCreateAlbum = async () => {
    try {
      setIsUploadPhotoAndCreateAlbumLoading(true);

      const formData = new FormData();

      photos.forEach((photo) => {
        formData.append(`photo`, photo);
      });

      const res = await fetch("/api/originalPhoto", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("🚀[Success] Uploaded Photo Urls", data.photoUrls);
    } catch (err) {
      console.error("Failed to upload photos or create album:", err);
    }

    setIsUploadPhotoAndCreateAlbumLoading(false);
  };

  useEffect(() => {
    if (!photos.length) {
      navigation.push(`pickphoto?${searchParams.toString()}`);
      return;
    }

    uploadPhotosAndCreateAlbum();
  }, [photos, navigation]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*
      const handleTestRecap = async () => {
        if (!canvasRef.current || !canvasSize.width) return;
    
        // Set the canvas size based on the available width and height
        canvasRef.current.style.width = canvasSize.width + "px";
        canvasRef.current.style.height = canvasSize.height + "px";
    
        setIsLoading(true); // Show loading indicator
        const dataUrls: string[] = [];
    
        // Iterate over all photos
        // for (let idx = 0; idx < photos.length; idx++) {
        try {
          const idx = 0;
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
          setImageIdx((prev) => (prev + idx) % photos.length);
          await new Promise((resolve) => setTimeout(resolve, 10));
        } catch (error) {
          console.error("Failed to capture the frame:", error);
        }
        // }
        setIsLoading(false);
    
        // Hide the loading indicator after all downloads
      };
      */

  const getAlbumIdFromCookie = () => {
    const albumIdCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("albumId"));

    return albumIdCookie?.split("=")[1];
  };

  const handleRecapFramedPhoto = async (dataUrls: string[]) => {
    // presigned URLs 가져오기
    console.time("리캡 이미지 presigned url 발급");

    const albumIdFromCookie = getAlbumIdFromCookie();
    if (!albumIdFromCookie)
      return console.log("Fail to fetch albumId from cookie");

    const presignedResult = await getPresignedUrls(photos, albumIdFromCookie);
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
    if (isUploadPhotosAndCreateAlbumLoading) return;

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
      } bg-black flex h-full w-full flex-col items-center justify-center`}
      style={{
        paddingTop: userData.top + "px",
        paddingBottom: userData.bottom + "px",
      }}
    >
      <Header
        titleComponent={
          <div className="flex flex-row items-center gap-1 text-lg leading-[140%] tracking-[0.36px]">
            {/* 프레임 선택 */}
            {dict.select_frame}
          </div>
        }
        onClickPrev={() =>
          navigation.push(`pickphoto?${searchParams.toString()}`)
        }
      />
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
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

        <div className="flex w-full flex-col gap-5 px-6">
          <div className="flex w-full flex-row justify-between overflow-x-scroll">
            {["puppy", "penguin", "cat", "panda", "egg"].map(
              (character, index) => (
                <button
                  key={index}
                  onClick={() => setFrameType(index + 1)}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-white focus:outline-none`}
                >
                  <span
                    className={`sprite_f chip chip_${character} ${
                      index + 1 === frameType
                        ? "rounded-full border-2 border-white"
                        : "opacity-40"
                    }`}
                  />
                </button>
              )
            )}
          </div>
          <div className="flex w-full">
            <SumoneButton
              width="100%"
              height={48}
              fill={"#ff9092"}
              // text="이 프레임으로 만들게요"
              text={dict.make_with_this_frame}
              textClass="text-white text-sm tracking-[0.28px] leading-[150%]"
              onClick={handleSelectFrame}
              isLoading={isUploadPhotosAndCreateAlbumLoading}
            />
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="bg-image fixed z-50 mx-6 flex h-[500px] w-[calc(100%-48px)] flex-col">
          <div className="flex h-full w-full flex-col gap-2.5 pb-14 pt-12">
            <div className="flex flex-col items-center gap-7 pb-12">
              <HeartIcon width={28} />
              {locale === "ko" && (
                <span className="text-center text-lg leading-[160%] tracking-[0.36px] text-gray-800">
                  지금 만든 추억
                  <br />
                  마푸에서 한 달간 다시 볼 수 있어요
                </span>
              )}
              <span className="whitespace-pre text-center text-sm leading-[150%] tracking-[0.28px] text-gray-600">
                {/* {userData.partnerNickName}님을 사랑하는 마음을 */}
                {dict.full_of_love.before} {userData.partnerNickName}{" "}
                {dict.full_of_love.after}
              </span>
            </div>
            {/* Carousel */}
            <div className="h-[150px] w-full bg-pastelpink">캐러셀~~~</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Frame;
