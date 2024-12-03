import Header from "@/components/Header";
import HeartIcon from "@/assets/HeartIcon";
import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import UserInteraction from "./_components/UserInteraction";

type SearchParams = { [key: string]: string };

const ResultPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { recapUrl } = searchParams;

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
      <div className="h-[calc(100%-212px)] w-full flex">
        <div className="flex w-full h-full items-center justify-center mx-6 mb-7">
          <video
            src={recapUrl}
            autoPlay={true}
            loop
            muted
            className="w-full h-auto rounded-lg"
            style={{}}
          />
        </div>
      </div>
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
