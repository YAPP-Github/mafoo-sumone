import Header from "@/components/Header";
import HeartIcon from "@/assets/HeartIcon";
import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import UserInteraction from "./_components/UserInteraction";
import { AsyncSearchParams } from "@/types/user";
import MovieInteraction from "./_components/MovieInteraction";
import { Locale } from "@/types/page";
import { getDictionary } from "../../dictionaries";
import VideoArea from "./_components/VideoArea";

const ResultPage = async (props: {
  params: Promise<{ locale: Locale }>;
  searchParams: AsyncSearchParams;
}) => {
  const lang = await props.params;
  const dict = await getDictionary(lang.locale);

  if (!dict) {
    return null;
  }
  const { top, bottom, recapUrl, nickName, coupleId } =
    await props.searchParams;

  console.log(
    "/result",
    lang.locale,
    top,
    bottom,
    nickName,
    coupleId,
    recapUrl
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
  ).then((res) => res.json());

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

  console.log(data);
  return (
    <main
      id="mainBg"
      className="bg-gradient flex h-full w-full flex-col items-center"
      style={{
        paddingTop: top + "px",
        paddingBottom: bottom + "px",
      }}
    >
      <Header
        titleComponent={
          <div className="flex flex-row items-center gap-1 text-lg leading-[140%] tracking-[0.36px]">
            <HeartIcon width={28} />
            {/* 우리의 1년 결산 */}
            {dict.Result.our_year_recap}
          </div>
        }
        displayCloseIcon={true}
      />
      {lang.locale === "ko" && <MovieInteraction code={data.code} />}

      <div
        style={{
          height:
            lang.locale === "ko" ? `calc(100% - 272px)` : `calc(100% - 216px)`,
        }}
        className="mb-2 flex w-full"
      >
        <div className="mx-6 flex h-full w-full items-center justify-center">
          <VideoArea videoSrc={recapUrl} />
        </div>
      </div>

      <span className="flex w-full items-center justify-center gap-1 py-1">
        <DoubleHeartIcon
          width={24}
          height={24}
        />
        <span className="text-sm leading-[140%] tracking-[0.24px] text-gray-700">
          {/* 벌써 {userCount} 커플이 서로를 자랑했어요 */}
          {dict.Result.couples_showing_off.before} {userCount}
          {dict.Result.couples_showing_off.after}
        </span>
      </span>

      <UserInteraction
        dict={dict.Result}
        shareText={dict.Share}
        userName={nickName}
      />
    </main>
  );
};

export default ResultPage;
