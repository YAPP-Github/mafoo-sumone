"use client";

import AlbumIcon from "@/assets/AlbumIcon";
import SumoneButton from "@/assets/SumoneButton";
import { usePhotoStore } from "@/atom/photo";
import { useRouter } from "next/navigation";
import { getPresignedUrls } from "../../api";
import { ObjectedParams } from "@/types/user";
import { useObjectToQueryString } from "@/utils/useQueryString";

const PhotoSelector = ({ userData }: { userData: ObjectedParams }) => {
  const navigation = useRouter();
  const OTQ = useObjectToQueryString();
  const { photos, setPhotos } = usePhotoStore();

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
    <div className="flex flex-1 flex-grow w-full gap-2 p-6 overflow-y-scroll bg-white border border-b-0 border-gray-200 rounded-t-3xl">
      <div className="flex flex-col items-start w-1/2 gap-1">
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
        {photos
          .filter((_, index) => index % 2 == 1)
          .map((image, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`left${index}`}
              src={URL.createObjectURL(image)}
              className="object-contain w-full aspect-[2/3] border border-gray-200 rounded-xl"
              alt={"image" + index}
            />
          ))}
        <span className="w-full h-16 shrink-0" />
      </div>
      <div className="flex flex-col items-start w-1/2 gap-1">
        {photos
          .filter((_, index) => index % 2 == 0)
          .map((image, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`right${index}`}
              src={URL.createObjectURL(image)}
              className="object-contain w-full aspect-[2/3] border border-gray-200 rounded-xl"
              alt={"image" + index + 5}
            />
          ))}
        <span className="w-full h-16 shrink-0" />
      </div>
      {photos.length < 1 ? (
        <div className="fixed flex w-[calc(100%-48px)] h-12 bottom-2">
          <SumoneButton
            width="100%"
            height={48}
            fill="#CBD0D6"
            text="최소 1장의 사진을 골라주세요"
            textClass="text-white text-sm tracking-[0.28px] leading-[150%]"
          />
        </div>
      ) : (
        <div className="fixed bottom-0 pb-2 flex flex-col items-center w-[calc(100%-48px)]">
          <div className="fixed bottom-20 w-fit bg-white py-2.5 px-3 rounded-lg shadow-md z-20">
            추억을 🎞영상으로 만들 수 있어요!
            <span className="absolute w-4 h-4 rotate-45 -translate-x-1/2 bg-white left-1/2 -bottom-2" />
          </div>
          <SumoneButton
            width="100%"
            height={48}
            fill="#C5B698"
            text="추억 영상 만들기"
            textClass="text-white text-sm tracking-[0.28px] leading-[150%]"
            onClick={handleFrameSelection}
          />
        </div>
      )}
    </div>
  );
};
export default PhotoSelector;
