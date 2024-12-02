"use client";

import AlbumIcon from "@/assets/AlbumIcon";
import SumoneButton from "@/assets/SumoneButton";
import { usePhotoStore } from "@/atom/photo";
import { useRouter } from "next/navigation";

const PhotoSelector = () => {
  const router = useRouter();
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

  const handleFrameSelection = async () => {
    // const albumIdCookie = document.cookie.split(";").find((cookie) => {
    //   return cookie.includes("albumId");
    // });
    // const albumId = albumIdCookie?.split("=")[1];
    // console.log(albumId);
    // const { urls } = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/sumone/albums/${albumId}/presigned-urls`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       fileNames: photos.map((photo) => photo.name),
    //     }),
    //   }
    // ).then((res) => {
    //   return res.json();
    // });

    // // console.log(urls);

    // const uploadPromises = photos.map((photo, index) => {
    //   const file = new File([photo], photo.name, { type: photo.type });
    //   const presignedUrl = urls[index];

    //   return fetch(presignedUrl, {
    //     method: "PUT",
    //     body: file,
    //   });
    // });

    // await Promise.all(uploadPromises).finally(() => {
    //   router.push("/frame");
    // });

    router.push("/frame");
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
