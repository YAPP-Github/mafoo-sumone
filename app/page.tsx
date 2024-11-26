import Chevron from "@/assets/Chevron";
import CustomButton from "@/assets/CustomButton";
import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import HeartIcon from "@/assets/HeartIcon";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full">
      <header className="flex flex-col gap-3 items-center py-4">
        <HeartIcon width={28} />
        <span className="text-center text-lg text-gray-800 tracking-[0.36px] leading-[140%]">
          1년을 1장에 담아,
          <br />
          2024년 내 연인 결산
        </span>
      </header>
      <div className="flex-grow max-w-[276px] min-w-[100px] aspect-[276/476] bg-gray-700 rounded-lg mx-[60px] mb-7"></div>
      <span className="flex gap-2 items-center">
        <DoubleHeartIcon
          width={24}
          height={24}
        />
        <span className="text-gray-700 text-sm tracking-[0.24px] leading-[140%]">
          벌써 {`1,565`} 커플이 리캡을 만들었어요
        </span>
      </span>
      <span className="py-2.5 px-6 w-full flex justify-between mt-6 tracking-[0.24px] leading-[140%]">
        <span className="text-sm">개인정보 수집 동의</span>
        <span className="flex flex-row gap-1 items-center text-gray-500 text-xs">
          자세히 보기
          <Chevron
            width={16}
            height={16}
          />
        </span>
      </span>
      <span className="flex flex-row gap-3 mb-1">
        <button className="w-[160px] h-[56px] text-white text-sm tracking-[0.24px] leading-[150%] bg-[#C5B698]">
          결산 부탁하기
        </button>
        <button className="w-[160px] h-[56px] text-white text-sm tracking-[0.24px] leading-[150%] bg-[#FF9092]">
          동의하고 바로 결산
        </button>
      </span>
    </div>
  );
}
