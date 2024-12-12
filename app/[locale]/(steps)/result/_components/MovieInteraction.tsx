"use client";

import CheckCircleIcon from "@/assets/CheckCircleIcon";
import MovieIcon from "@/assets/MovieIcon";
import RegisterCode from "@/components/RegisterCode";
import { useState } from "react";

const MovieInteraction = ({ code }: { code: string }) => {
  const [showClipboardModal, setShowClipboardModal] = useState<boolean>(false);
  const handleCopyToClipboard = (code: string) => {
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "COPY",
          message: {
            text: code,
          },
        })
      );
      navigator.clipboard.writeText(code);
      setShowClipboardModal(true);

      setTimeout(() => {
        setShowClipboardModal(false);
      }, 2500);
    }
  };

  return (
    <div className="relative mb-4 flex h-14 w-full shrink-0 px-6">
      <span className="flex w-full flex-row items-center justify-between rounded-md bg-white px-4 py-3">
        <span className="flex flex-row gap-1 text-sm leading-[160%] tracking-[0.28px] text-gray-800">
          <MovieIcon width={20} />
          마푸 앱에서 영상 더 만들기
        </span>
        <RegisterCode
          tooltip={false}
          onClickHandler={() => {
            handleCopyToClipboard(code);
          }}
        />
      </span>
      {showClipboardModal && (
        <div className="absolute left-1/2 top-16 flex w-full -translate-x-1/2 items-center justify-center">
          <div className="flex flex-row gap-1 rounded-full bg-white px-4 py-3 text-center shadow-lg">
            <CheckCircleIcon
              width={24}
              height={24}
            />
            <span className="text-base leading-[150%] tracking-[0.32px] text-gray-700">
              마푸 회원가입 시 붙여 넣어주세요!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInteraction;
