import PhotoSelector from "./_components/PhotoSelector";
import { AsyncSearchParams } from "@/types/user";
import PickPhotoHeader from "./_components/CustomHeader";
import { Locale } from "@/types/page";
import { getDictionary } from "../../dictionaries";

const PickPhotoPage = async (props: {
  params: Promise<{ locale: Locale }>;
  searchParams: AsyncSearchParams;
}) => {
  const lang = await props.params;
  const dict = await getDictionary(lang.locale);

  if (!dict) {
    return null;
  }
  const {
    top,
    bottom,
    nickName,
    partnerNickName,
    dDay,
    isConnected,
    coupleId,
  } = await props.searchParams;

  return (
    <main
      style={{ paddingTop: top + "px" }}
      className="flex flex-col w-full h-full"
    >
      <PickPhotoHeader
        searchParams={{
          top,
          bottom,
          nickName,
          partnerNickName,
          dDay,
          isConnected,
          coupleId,
        }}
        text={dict.PickPhoto.year_end_event}
      />
      <div className="flex flex-col gap-4 p-6 pt-4">
        <div className="text-xl tracking-[0.4px] leading-[160%] whitespace-pre">
          {/* 2024년, {partnerNickName}님의 */}
          {dict.PickPhoto.gather_lovely_moments.before} {partnerNickName}
          {dict.PickPhoto.gather_lovely_moments.after}
        </div>
        <div className="text-lg tracking-[0.32px] leading-[140%] text-gray-600">
          {/* 최대 10장을 선택할 수 있어요 */}
          {dict.PickPhoto.select_up_to_10_photos}
        </div>
      </div>
      {/* Photo Selector */}
      <PhotoSelector
        userData={{
          top,
          bottom,
          nickName,
          partnerNickName,
          dDay,
          isConnected,
          coupleId,
        }}
        select_at_least_one_photo={dict.PickPhoto.select_at_least_one_photo}
        video_makeable={dict.PickPhoto.video_makeable}
        make_video={dict.PickPhoto.make_video}
      />
    </main>
  );
};

export default PickPhotoPage;
