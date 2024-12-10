"use client";

import CheckCircleIcon from "@/assets/CheckCircleIcon";
import MovieIcon from "@/assets/MovieIcon";
import RegisterCode from "@/components/RegisterCode";
import { useState } from "react";

const MovieInteraction = ({ code }: { code: string }) => {
  const [showClipboardModal, setShowClipboardModal] = useState<boolean>(false);
  const handleCopyToClipboard = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setShowClipboardModal(true);

      setTimeout(() => {
        setShowClipboardModal(false);
      }, 2500);
    }
  };

  return (
    <div className="flex w-full h-14 shrink-0 px-6 mb-4 relative">
      <span className="bg-white rounded-md flex flex-row items-center justify-between py-3 px-4 w-full">
        <span className="flex flex-row gap-1 text-gray-800 tracking-[0.28px] leading-[160%] text-sm">
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
        <div className="absolute top-16 left-1/2 w-full -translate-x-1/2 flex items-center justify-center">
          <div className="bg-white rounded-full shadow-lg px-4 py-3 text-center flex flex-row gap-1">
            <CheckCircleIcon
              width={24}
              height={24}
            />
            <span className="text-base text-gray-700 tracking-[0.32px] leading-[150%]">
              마푸 회원가입 시 붙여 넣어주세요!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInteraction;
