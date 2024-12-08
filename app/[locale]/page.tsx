import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import HeartIcon from "@/assets/HeartIcon";
import MainPageUserInteraction from "./_components/UserInteraction";
import VideoArea from "./_components/VideoArea";
import { AsyncSearchParams } from "@/types/user";
import "./mainpage.css";

export default async function Home(props: { searchParams: AsyncSearchParams }) {
  const {
    top,
    bottom,
    nickName,
    partnerNickName,
    dDay,
    isConnected,
    coupleId,
  } = await props.searchParams;

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

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sumone/invite-code?userId=${coupleId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return { code: null };
    });

  return (
    <main
      id="mainBg"
      style={{ paddingTop: top + "px", paddingBottom: bottom + "px" }}
      className="flex flex-col items-center w-full h-full bg-gradient"
    >
      <header className="flex flex-col items-center w-full gap-2 py-4">
        {/* Top Orgament Part */}
        <span className="sprite garland w-full flex" />
        <span className="sprite tree" />
        <span className="flex flex-col items-center gap-1">
          <span className="flex flex-row items-center gap-2">
            <HeartIcon width={24} />
            <h1 className="text-xl tracking-[0.4px] leading-[160%]">
              2024년 내 연인 결산
            </h1>
            <span className="sprite yellowHeart" />
          </span>

          <h2 className="text-center text-base text-gray-800 tracking-[0.32px] leading-[160%]">
            사랑스러운 연인의 1년을 1장에 담아보세요!
          </h2>
        </span>
      </header>
      <VideoArea />
      <span className="flex items-center gap-2">
        <DoubleHeartIcon
          width={24}
          height={24}
        />
        <span className="text-gray-700 text-sm tracking-[0.24px] leading-[140%]">
          벌써 {userCount} 커플이 올해 추억을 결산했어요!
        </span>
      </span>
      <MainPageUserInteraction
        code={data.code}
        userData={{
          top,
          bottom,
          nickName,
          partnerNickName,
          dDay,
          isConnected,
          coupleId,
        }}
      />
    </main>
  );
}
