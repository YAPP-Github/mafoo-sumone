"use client";

import SumoneButton from "@/assets/SumoneButton";
import { useSearchParams } from "next/navigation";

const UserInteraction = () => {
  const searchParams = useSearchParams();
  const handleAskEvent = () => {
    console.log("ask event", {
      type: "RESULT_ASK",
      message: {
        title: "[썸원-마푸] 2024 내 연인 결산",
        file: searchParams.get("recapUrl"),
      },
    });
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "RESULT_ASK",
          message: {
            title: "[썸원-마푸] 2024 내 연인 결산",
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
    <div className="flex items-center w-full my-3">
      <div className="flex flex-col gap-3 mx-6 w-full h-full">
        <SumoneButton
          width="100%"
          height={48}
          fill="#c5b698"
          text={`${searchParams.get("partnerNickName")}에게도 부탁하기`}
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleAskEvent}
        />

        <SumoneButton
          width="100%"
          height={48}
          fill="#ff9092"
          text="우리 1년 SNS에 자랑하기"
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleShareEvent}
        />
      </div>
    </div>
  );
};

export default UserInteraction;
