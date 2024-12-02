import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import HeartIcon from "@/assets/HeartIcon";
import MainPageUserInteraction from "./_components/UserInteraction";
import MainYellowHeart from "@/assets/MainYellowHeart.png";
import Image from "next/image";
import VideoArea from "./_components/VideoArea";
import MainGarland from "@/assets/MainGarland.png";
import MainTree from "@/assets/MainTree.png";
import Link from "next/link";

export default async function Home() {
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
      className="flex flex-col items-center h-full bg-gradient"
    >
      <Link
        href="https://chisel-promise-9ff.notion.site/FAQ-f366f55df31b49ef96e7db35c73b8921?pvs=4"
        className="fixed top-16 left-4 rounded-full bg-pink text-white w-10 h-10 flex items-center justify-center"
      >
        ?
      </Link>

      <header className="flex flex-col items-center w-full gap-2 py-4">
        {/* Top Orgament Part */}
        <span
          className="flex w-full h-8 bg-repeat-x"
          style={{
            backgroundImage: `url(${MainGarland.src})`,
          }}
        />
        <Image
          src={MainTree}
          alt="Main Tree"
          width={60}
        />
        <span className="flex flex-col items-center gap-1">
          <span className="flex flex-row items-center gap-2">
            <HeartIcon width={24} />
            <h1 className="text-xl tracking-[0.4px] leading-[160%]">
              2024년 내 연인 결산
            </h1>
            <Image
              src={MainYellowHeart}
              alt="Main Yellow Heart"
              width={24}
              className="object-contain"
            />
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
      <MainPageUserInteraction />
    </main>
  );
}
