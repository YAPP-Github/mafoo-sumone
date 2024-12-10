"use client";

import SumoneButton from "@/assets/SumoneButton";
import { usePathname, useSearchParams } from "next/navigation";

const UserInteraction = ({
  dict,
  shareText,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
  shareText: string;
}) => {
  const searchParams = useSearchParams();

  const pathName = usePathname();

  console.log(pathName, searchParams.toString());

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
  };
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
  };
  return (
    <div className="flex items-center w-full h-[108px] flex-grow-0 flex-shrink-0 my-3">
      <div className="flex flex-col gap-3 mx-6 w-full h-full">
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
