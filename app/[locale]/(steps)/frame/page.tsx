import { Locale } from "@/types/page";
import Frame from "./_component/frame";
import { AsyncSearchParams } from "@/types/user";
import { getDictionary } from "../../dictionaries";

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
    />
  );
};

export default FramePage;
