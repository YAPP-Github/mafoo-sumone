"use client";

import Chevron from "@/assets/Chevron";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

const MainPageUserInteraction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PrivacyModal = dynamic(() => import("./PrivacyModal"), {
    loading: () => (
      <div className="fixed bottom-0 w-full bg-image h-[220] rounded-t-3xl" />
    ),
  });

  useEffect(() => {
    const temp = document.getElementById("mainBg");
    if (isModalOpen) {
      temp?.style.setProperty("background", "rgba(0, 0, 0, 0.5)");
    } else {
      temp?.style.removeProperty("background");
    }
  }, [isModalOpen]);

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        className="py-2.5 px-6 w-full flex justify-between mt-6 tracking-[0.24px] leading-[140%]"
      >
        <span className="text-sm">개인정보 수집 동의</span>
        <span className="flex flex-row items-center gap-1 text-xs text-gray-500">
          자세히 보기
          <Chevron
            width={16}
            height={16}
          />
        </span>
      </span>
      <span className="flex flex-row gap-3 mb-1">
        <button className="w-[160px] h-[56px] text-white text-sm tracking-[0.24px] leading-[150%] bg-[#C5B698]">
          결산 부탁하기
        </button>
        <button className="w-[160px] h-[56px] text-white text-sm tracking-[0.24px] leading-[150%] bg-[#FF9092]">
          동의하고 바로 결산
        </button>
      </span>
      {isModalOpen && <PrivacyModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default MainPageUserInteraction;
