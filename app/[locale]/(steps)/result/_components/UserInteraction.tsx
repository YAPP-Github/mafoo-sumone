"use client";

import SumoneButton from "@/assets/SumoneButton";
import { sendGAEvent } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";

const UserInteraction = ({
  dict,
  shareText,
  userName,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
  shareText: string;
  userName: string;
}) => {
  const searchParams = useSearchParams();

  const pathName = usePathname();

  console.log(pathName, "/result", searchParams.toString());

  // '나도 부탁하기' 버튼 클릭 시
  const handleAskEvent = () => {
    console.log("ask event", {
      type: "RESULT_ASK",
      message: {
        title: shareText,
        file: searchParams.get("recapUrl"),
      },
    });
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "RESULT_ASK",
          message: {
            title: shareText,
            file: searchParams.get("recapUrl"),
          },
        })
      );
    }
    // [GA] Web_View_Page_04: [나도 부탁하기] 버튼 누른 유저 수
    sendGAEvent("event", "click", {
      locale: pathName.split("/")[1],
      pathName: "Web_View_Page_04",
      action: "ask_result",
      userName: userName,
    });
  };

  // '우리 1년 SNS에 자랑하기' 버튼 클릭 시
  const handleShareEvent = () => {
    console.log("share event", {
      type: "RESULT_SHARE",
      message: {
        file: "s3 url",
      },
    });
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "RESULT_SHARE",
          message: {
            file: searchParams.get("recapUrl"),
          },
        })
      );
    }
    // [GA] Web_View_Page_04: [우리 1년 SNS에 자랑하기] 버튼 누른 유저 수
    sendGAEvent("event", "click", {
      locale: pathName.split("/")[1],
      pathName: "Web_View_Page_04",
      action: "share",
      userName: userName,
    });
  };
  return (
    <div className="my-3 flex h-[108px] w-full flex-shrink-0 flex-grow-0 items-center">
      <div className="mx-6 flex h-full w-full flex-col gap-3">
        <SumoneButton
          width="100%"
          height={48}
          fill="#c5b698"
          // text={`${searchParams.get("partnerNickName")}에게도 부탁하기`}
          text={`${dict.ask_for_partner.before}${searchParams.get(
            "partnerNickName"
          )}${dict.ask_for_partner.after}`}
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleAskEvent}
        />

        <SumoneButton
          width="100%"
          height={48}
          fill="#ff9092"
          // text="우리 1년 SNS에 자랑하기"
          text={dict.show_off_on_sns}
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleShareEvent}
        />
      </div>
    </div>
  );
};

export default UserInteraction;
