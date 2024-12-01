import Header from "@/components/Header";
import HeartIcon from "@/assets/HeartIcon";
import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import UserInteraction from "./_components/UserInteraction";

const ResultPage = async () => {
  const { userCount } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sumone/summary`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  ).then((res) => res.json());

  return (
    <main
      id="mainBg"
      className="flex flex-col items-center w-full h-full"
    >
      <Header
        titleComponent={
          <div className="flex flex-row gap-1 items-center text-lg tracking-[0.36px] leading-[140%]">
            <HeartIcon width={28} />
            우리의 1년 결산
          </div>
        }
      />

      <div className="flex-grow max-w-[276px] min-w-[100px] aspect-[276/476] bg-gray-700 rounded-lg mx-[60px] mb-7"></div>
      <span className="flex items-center gap-2">
        <DoubleHeartIcon
          width={24}
          height={24}
        />
        <span className="text-gray-700 text-sm tracking-[0.24px] leading-[140%]">
          벌써 {userCount} 커플이 서로를 자랑했어요
        </span>
      </span>
      <UserInteraction />
    </main>
  );
};

export default ResultPage;
