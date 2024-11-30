"use client";

import Chevron from "@/assets/Chevron";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

const MainPageUserInteraction = () => {
  const [modalType, setModalType] = useState<"privacy" | "couple" | null>(null);

  const PrivacyModal = dynamic(() => import("./PrivacyModal"), {
    loading: () => (
      <div className="fixed bottom-0 w-full bg-image h-[220] rounded-t-3xl z-10" />
    ),
  });

  const CoupleModal = dynamic(() => import("./CoupleModal"), {
    loading: () => (
      <div className="fixed z-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-image w-[345px] h-[300px] rounded-md" />
    ),
  });

  useEffect(() => {
    const mainElement = document.getElementById("mainBg");

    if (mainElement) {
      // Add or remove class based on modalType state
      if (modalType) {
        mainElement.classList.add("dark-overlay");
      } else {
        mainElement.classList.remove("dark-overlay");
      }
    }
  }, [modalType]);

  const handleOpenPrivacyModal = () => {
    setModalType("privacy");
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleCreateRecap = () => {
    // 커플 확인 API
    setModalType("couple");
  };

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={handleOpenPrivacyModal}
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
      <span className="flex flex-row gap-3 mb-2">
        <button className="w-[160px] h-[56px] text-white text-sm tracking-[0.24px] leading-[150%] bg-[#C5B698]">
          결산 부탁하기
        </button>
        <button
          onClick={() => handleCreateRecap()}
          className="w-[160px] h-[56px] text-white text-sm tracking-[0.24px] leading-[150%] bg-[#FF9092]"
        >
          동의하고 바로 결산
        </button>
      </span>

      {modalType &&
        (modalType === "privacy" ? (
          <PrivacyModal onClose={handleCloseModal} />
        ) : (
          <CoupleModal onClose={handleCloseModal} />
        ))}
    </>
  );
};

export default MainPageUserInteraction;
