import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import HeartIcon from "@/assets/HeartIcon";
import MainPageUserInteraction from "./_components/UserInteraction";

export default function Home() {
  return (
    <main
      id="mainBg"
      className="flex flex-col items-center h-full"
    >
      <header className="flex flex-col items-center gap-3 py-4">
        <HeartIcon width={28} />
        <h1 className="text-center text-lg text-gray-800 tracking-[0.36px] leading-[140%]">
          1년을 1장에 담아,
          <br />
          2024년 내 연인 결산
        </h1>
      </header>
      <div className="flex-grow max-w-[276px] min-w-[100px] aspect-[276/476] bg-gray-700 rounded-lg mx-[60px] mb-7"></div>
      <span className="flex items-center gap-2">
        <DoubleHeartIcon
          width={24}
          height={24}
        />
        <span className="text-gray-700 text-sm tracking-[0.24px] leading-[140%]">
          벌써 {`1,565`} 커플이 리캡을 만들었어요
        </span>
      </span>
      <MainPageUserInteraction />
    </main>
  );
}
