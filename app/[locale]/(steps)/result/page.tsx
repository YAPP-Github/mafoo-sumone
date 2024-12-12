import Header from "@/components/Header";
import HeartIcon from "@/assets/HeartIcon";
import DoubleHeartIcon from "@/assets/DoubleHeartIcon";
import UserInteraction from "./_components/UserInteraction";
import { AsyncSearchParams } from "@/types/user";
import MovieInteraction from "./_components/MovieInteraction";
import { Locale } from "@/types/page";
import { getDictionary } from "../../dictionaries";

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
      className="flex flex-col items-center w-full h-full"
      style={{
        paddingTop: top + "px",
        paddingBottom: bottom + "px",
      }}
    >
      <Header
        titleComponent={
          <div className="flex flex-row gap-1 items-center text-lg tracking-[0.36px] leading-[140%]">
            <HeartIcon width={28} />
            {/* 우리의 1년 결산 */}
            {dict.Result.our_year_recap}
          </div>
        }
      />
      {lang.locale === "ko" && <MovieInteraction code={data.code} />}

      <div
        style={{
          height:
            lang.locale === "ko" ? `calc(100% - 272px)` : `calc(100% - 216px)`,
        }}
        className="w-full flex mb-3"
      >
        <div className="flex w-full h-full items-center justify-center mx-6">
          <video
            src={recapUrl}
            autoPlay={true}
            loop
            playsInline
            muted
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>

      <span className="flex items-center gap-2 w-full justify-center">
        <DoubleHeartIcon
          width={24}
          height={24}
        />
        <span className="text-gray-700 text-sm tracking-[0.24px] leading-[140%]">
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
