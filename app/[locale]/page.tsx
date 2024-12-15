import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import HeartIcon from "@/assets/HeartIcon";
import MainPageUserInteraction from "./_components/UserInteraction";
import VideoArea from "./_components/VideoArea";
import { AsyncSearchParams } from "@/types/user";
import "./mainpage.css";
import { getDictionary } from "./dictionaries";
import { Locale } from "@/types/page";

export default async function Home(props: {
  params: Promise<{ locale: Locale }>;
  searchParams: AsyncSearchParams;
}) {
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

  console.log(
    "/",
    lang.locale,
    top,
    bottom,
    nickName,
    partnerNickName,
    dDay,
    isConnected,
    coupleId
  );

  const { userCount } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sumone/summary`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .catch(() => {
      return {
        userCount: -1,
      };
    });
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sumone/invite-code?userId=${encodeURIComponent(coupleId + nickName)}`,
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

  return userCount > 0 ? (
    <main
      id="mainBg"
      style={{ paddingTop: top + "px", paddingBottom: bottom + "px" }}
      className="bg-gradient flex h-full w-full flex-col items-center"
    >
      <header className="flex w-full flex-col items-center gap-2 py-4">
        {/* Top Orgament Part */}
        <span className="sprite garland flex w-full" />
        <span className="sprite tree" />
        <span className="flex flex-col items-center gap-1">
          <span className="flex flex-row items-center gap-2">
            <HeartIcon width={24} />
            <h1 className="whitespace-pre text-center text-xl leading-[160%] tracking-[0.4px]">
              {/* 2024년 내 연인 결산 */}
              {dict.MainPage.title}
            </h1>
            <span className="sprite yellowHeart" />
          </span>

          <h2 className="text-center text-base leading-[160%] tracking-[0.32px] text-gray-800">
            {/* 사랑스러운 연인의 1년을 1장에 담아보세요! */}
            {dict.MainPage.description}
          </h2>
        </span>
      </header>
      <VideoArea lang={lang.locale} />
      <span className="flex items-center gap-2">
        <DoubleHeartIcon
          width={24}
          height={24}
        />
        <span className="text-sm leading-[140%] tracking-[0.24px] text-gray-700">
          {/* 벌써 {userCount} 커플이 올해 추억을 결산했어요! */}
          {dict.MainPage.couples_count.before} {userCount}{" "}
          {dict.MainPage.couples_count.after}
        </span>
      </span>
      <MainPageUserInteraction
        code={data.code}
        locale={lang.locale}
        userData={{
          top,
          bottom,
          nickName,
          partnerNickName,
          dDay,
          isConnected,
          coupleId,
        }}
        personal_data_agreement={dict.MainPage.personal_data_agreement}
        view_details={dict.MainPage.view_details}
        ask_for_mine={dict.MainPage.ask_for_mine}
        agree_and_get_recap={dict.MainPage.agree_and_get_recap}
        personalDataCollection={dict.personalDataCollection}
        coupleModal={dict.coupleModal}
        ShareText={dict.Share}
      />
    </main>
  ) : (
    <main>Error</main>
  );
}
