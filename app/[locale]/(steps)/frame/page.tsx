import { Locale } from "@/types/page";
import Frame from "./_component/frame";
import { AsyncSearchParams } from "@/types/user";
import { getDictionary } from "../../dictionaries";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const FramePage = async (props: {
  params: Promise<{ locale: Locale }>;
  searchParams: AsyncSearchParams;
}) => {
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
    "/frame",
    top,
    bottom,
    nickName,
    partnerNickName,
    dDay,
    isConnected,
    coupleId
  );

  const cookieStore = await cookies();
  const albumIdFromCookie = cookieStore.get("albumId")?.value;

  if (!albumIdFromCookie) {
    redirect(
      `/${lang.locale}?top=${top}&bottom=${bottom}&nickName=${nickName}&partnerNickName=${partnerNickName}&dDay=${dDay}&isConnected=${isConnected}&coupleId=${coupleId}`
    );
  }

  return (
    <Frame
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
      dict={dict.Frame}
      loader={dict.Loader}
      albumId={albumIdFromCookie}
    />
  );
};

export default FramePage;
