"use client";

import AlbumIcon from "@/assets/AlbumIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PhotoSelector = () => {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const handleSelectPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);

    if (selectedFiles.length > 10) {
      alert(
        `${selectedFiles.length}개의 파일을 선택했습니다. 10개 파일만 선택됩니다.`
      );
      selectedFiles.splice(10);
    }

    console.log("선택된 파일:", selectedFiles, selectedFiles.length);
    setImages(selectedFiles);
  };

  const handleFrameSelection = () => {
    if (images[0]) {
      const file = images[0];
      const reader = new FileReader();

      reader.onload = () => {
        // 파일 데이터를 세션 스토리지에 저장
        sessionStorage.setItem("selectedImage", reader.result as string);
        router.push("/frame");
      };

      reader.readAsDataURL(file); // 파일을 Base64 데이터로 변환
    }
  };

  return (
    <div className="grid flex-1 flex-grow w-full grid-cols-2 gap-2 p-6 pb-16 overflow-y-scroll bg-white border border-gray-200 border-b-0 rounded-t-3xl">
      <div className="grid gap-1">
        <span className="h-fit">
          <input
            type="file"
            id="addImage"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleSelectPhotos}
          />
          <label htmlFor="addImage">
            <AlbumIcon
              width="100%"
              className="flex-shrink aspect-square"
            />
          </label>
        </span>
        {images
          .filter((_, index) => index % 2 == 1)
          .map((image, index) => (
            <img
              key={`left${index}`}
              src={URL.createObjectURL(image)}
              className="object-contain w-full h-full aspect-[2/3] border border-gray-200 rounded-xl"
            />
          ))}
      </div>
      <div className="grid gap-1">
        {images
          .filter((_, index) => index % 2 == 0)
          .map((image, index) => (
            <img
              key={`right${index}`}
              src={URL.createObjectURL(image)}
              className="object-contain w-full h-full aspect-[2/3] border border-gray-200 rounded-xl"
            />
          ))}
      </div>
      {images.length < 1 ? (
        <div className="fixed flex text-white w-[calc(100%-48px)] h-12 bottom-2 bg-gray-300 items-center justify-center tracking-[0.28px] leading-[150%] text-sm">
          최소 1장의 사진을 골라주세요
        </div>
      ) : (
        <div className="fixed bottom-0 pb-2 flex flex-col items-center w-[calc(100%-48px)]">
          <div className="fixed bottom-20 w-fit bg-white py-2.5 px-3 rounded-lg shadow-md z-20">
            추억을 🎞영상으로 만들 수 있어요!
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 rotate-45 w-4 h-4 bg-white" />
          </div>
          <div
            onClick={handleFrameSelection}
            className="flex text-white w-full h-12 bg-brown items-center justify-center tracking-[0.28px] leading-[150%] text-sm"
          >
            추억 영상 만들기
          </div>
        </div>
      )}
    </div>
  );
};
export default PhotoSelector;
