"use client";

import AlbumIcon from "@/assets/AlbumIcon";
import SumoneButton from "@/assets/SumoneButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ObjectedParams } from "@/types/user";
import Masonry from "react-responsive-masonry";
import Image from "next/image";
import { useObjectToQueryString } from "@/utils/useQueryString";
import { usePhotoStore } from "@/atom/photo";
import { useState } from "react";

const PhotoSelector = ({
  userData,
  select_at_least_one_photo,
  video_makeable,
  make_video,
}: {
  userData: ObjectedParams;
  select_at_least_one_photo: string;
  video_makeable: string;
  make_video: string;
}) => {
  const navigation = useRouter();
  const OTQ = useObjectToQueryString();
  const { photos, setPhotos } = usePhotoStore();
  const [isLoading, setIsLoading] = useState(false);

  const pathName = usePathname();
  const searchParams = useSearchParams();
  console.log(pathName, "/pickphoto", searchParams.toString());

  // TODO: TMP - Remove this when isLoading logic added
  console.log(isLoading);

  const handleSelectPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);

    if (selectedFiles.length > 10) {
      selectedFiles.splice(10);
    }

    console.log("선택된 파일:", selectedFiles, selectedFiles.length);
    setPhotos(selectedFiles);
  };

  const handleFrameSelection = () => {
    navigation.push(`frame?${OTQ(userData)}`);
  };

  return (
    <div
      className={`flex w-full flex-1 gap-2 overflow-y-scroll rounded-t-3xl border border-b-0 border-gray-200 bg-white p-6`}
    >
      <Masonry
        key={photos.length}
        columnsCount={2}
        gutter="4px"
      >
        <>
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
              className="aspect-square flex-shrink"
            />
          </label>
        </>
        {photos.map((image, index) => (
          <div
            className="block overflow-hidden"
            key={`${index}`}
          >
            <Image
              src={URL.createObjectURL(image)}
              width={100}
              height={100}
              layout="responsive"
              className="rounded-xl border border-gray-200 object-contain"
              alt={"image" + index + 5}
            />
          </div>
        ))}
      </Masonry>

      {/* <div className="flex flex-col items-start w-1/2 gap-1">
        <span className="w-full h-16 shrink-0" />
      </div> */}
      {photos.length < 1 ? (
        <div
          className="fixed flex h-12 w-[calc(100%-48px)]"
          style={{
            bottom: 8 + Number(userData.bottom) + "px",
          }}
        >
          <SumoneButton
            width="100%"
            height={48}
            fill="#CBD0D6"
            // text="최소 1장의 사진을 골라주세요"
            text={select_at_least_one_photo}
            textClass="text-white text-sm tracking-[0.28px] leading-[150%]"
          />
        </div>
      ) : (
        <div
          className="fixed bottom-0 flex w-[calc(100%-48px)] flex-col items-center"
          style={{
            bottom: 8 + Number(userData.bottom) + "px",
          }}
        >
          <div className="fixed bottom-20 z-20 w-fit rounded-lg bg-white px-3 py-2.5 shadow-md">
            {/* 추억을 🎞영상으로 만들 수 있어요! */}
            {video_makeable}
            <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
          </div>
          <SumoneButton
            width="100%"
            height={48}
            fill="#C5B698"
            // text="추억 영상 만들기"
            text={make_video}
            textClass="text-white text-sm tracking-[0.28px] leading-[150%]"
            onClick={handleFrameSelection}
          />
        </div>
      )}
    </div>
  );
};
export default PhotoSelector;
