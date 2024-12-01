import HeartIcon from "@/assets/HeartIcon";
import Header from "@/components/Header";
import PhotoSelector from "./_components/PhotoSelector";

const PickPhotoPage = () => {
  const { partner } = {
    partner: "영지",
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header
        titleComponent={
          <div className="flex flex-row gap-1 items-center  text-lg tracking-[0.36px] leading-[140%]">
            <HeartIcon width={28} />
            연말결산 이벤트
          </div>
        }
      />
      <div className="flex flex-col gap-4 p-6 pt-4">
        <div className="text-xl tracking-[0.4px] leading-[160%]">
          2024년, {partner}님의
          <br />
          사랑스러운 순간을 모아주세요
        </div>
        <div className="text-lg tracking-[0.32px] leading-[140%] text-gray-600">
          최대 10장을 선택할 수 있어요
        </div>
      </div>
      {/* Photo Selector */}
      <PhotoSelector />
    </div>
  );
};

export default PickPhotoPage;
