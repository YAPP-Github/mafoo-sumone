"use client";

import AlbumIcon from "@/assets/AlbumIcon";
import SumoneButton from "@/assets/SumoneButton";
import { usePhotoStore } from "@/atom/photo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getPresignedUrls } from "../../api";
import { ObjectedParams } from "@/types/user";
import { useObjectToQueryString } from "@/utils/useQueryString";
import Masonry from "react-responsive-masonry";
import Image from "next/image";

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

  const pathName = usePathname();
  const searchParams = useSearchParams();
  console.log(pathName, searchParams.toString());

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

  const handleSendOriginalPhoto = async () => {
    try {
      // presigned URL 가져오기
      const presignedResult = await getPresignedUrls(photos);
      if (!presignedResult) {
        console.error("Failed to get presigned URLs");
        navigation.refresh();
        return;
      }

      const [albumId, urls] = presignedResult;

      // 파일 업로드 요청 생성
      const uploadPromises = photos.map((photo, index) => {
        const file = new File([photo], photo.name, { type: photo.type });
        const presignedUrl = urls[index];

        return fetch(presignedUrl, {
          method: "PUT",
          body: file,
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to upload ${photo.name}`);
            }
            return res;
          })
          .catch((err) => {
            console.error(`Upload failed for ${photo.name}:`, err);
            throw err; // Upload 실패 시 에러 던지기
          });
      });

      // 모든 파일 업로드가 완료될 때까지 기다리기
      await Promise.all(uploadPromises);

      // 업로드가 완료된 후 새로운 URL 처리
      const newUrls = urls.map((url: string) => {
        return url.split("?")[0]; // presigned URL에서 query string 제거
      });

      // albums API 호출
      const { photoUrl } = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sumone/albums/${albumId}/photos`,
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
          console.error("Error while calling albums API:", err);
          throw err; // albums API 호출 실패 시 에러 던지기
        });

      console.log("photoUrl", photoUrl);
      return photoUrl;
    } catch (err) {
      console.error("Error in handleSendOriginalPhoto:", err);
      throw err; // 전체 오류 처리
    }
  };

  const handleFrameSelection = async () => {
    try {
      const photoUrl = await handleSendOriginalPhoto();
      console.log("photoUrl", photoUrl);

      navigation.push(`frame?${OTQ(userData)}`);
    } catch (err) {
      console.error("Failed to upload photos or create album:", err);
    }
  };

  return (
    <div className="flex flex-1 w-full gap-2 p-6 overflow-y-scroll bg-white border border-b-0 border-gray-200 rounded-t-3xl">
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
              className="flex-shrink aspect-square"
            />
          </label>
        </>
        {photos.map((image, index) => (
          <div
            className="block overflow-auto"
            key={`${index}`}
          >
            <Image
              src={URL.createObjectURL(image)}
              width={100}
              height={100}
              layout="responsive"
              className="object-contain border border-gray-200 rounded-xl"
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
          className="fixed flex w-[calc(100%-48px)] h-12"
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
          className="fixed bottom-0 flex flex-col items-center w-[calc(100%-48px)]"
          style={{
            bottom: 8 + Number(userData.bottom) + "px",
          }}
        >
          <div className="fixed bottom-20 w-fit bg-white py-2.5 px-3 rounded-lg shadow-md z-20">
            {/* 추억을 🎞영상으로 만들 수 있어요! */}
            {video_makeable}
            <span className="absolute w-4 h-4 rotate-45 -translate-x-1/2 bg-white left-1/2 -bottom-2" />
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
