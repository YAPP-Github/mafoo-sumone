"use client";

import Chevron from "@/assets/Chevron";
import SumoneButton from "@/assets/SumoneButton";
import { ObjectedParams } from "@/types/user";
import { useObjectToQueryString } from "@/utils/useQueryString";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const MainPageUserInteraction = ({
  userData,
}: {
  userData: ObjectedParams;
}) => {
  const navigation = useRouter();
  const pathName = usePathname();
  const OTQ = useObjectToQueryString();
  const [modalType, setModalType] = useState<"privacy" | "couple" | null>(null);

  const PrivacyModal = dynamic(() => import("./PrivacyModal"), {
    loading: () => (
      <div className="fixed bottom-0 w-full bg-image h-[220] rounded-t-3xl z-50" />
    ),
  });

  const CoupleModal = dynamic(() => import("./CoupleModal"), {
    loading: () => (
      <div className="fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-image w-[345px] h-[300px] rounded-md z-50" />
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

  const handleAskShare = () => {
    //  결산 부탁하기
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "MAIN_SHARE",
          message: {
            title: "[썸원-마푸] 2024 내 연인 결산",
          },
        })
      );
    }
  };

  const checkCouple = () => {
    if (!userData || userData.isConnected !== "true") {
      return false;
    }
    return true;
  };

  const handleCreateRecap = async () => {
    try {
      if (!checkCouple()) {
        setModalType("couple");
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sumone/albums`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userData.coupleId }),
          }
        );

        if (!response.ok) {
          if (typeof window !== "undefined" && window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "ERROR",
                message: response,
              })
            );
          }
          throw new Error("Failed to create album");
        }

        const { albumId } = await response.json();

        if (albumId) {
          document.cookie = `albumId=${albumId}`;
          navigation.push(`${pathName}/pickphoto?${OTQ(userData)}`);
        } else {
          throw new Error("Album ID not returned");
        }
      }
    } catch (error) {
      console.error("Error creating recap:", error);
      // Handle the error appropriately (show a notification, etc.)
    }
  };

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={handleOpenPrivacyModal}
        className="py-2.5 px-6 w-full flex justify-between mt-3 tracking-[0.24px] leading-[140%]"
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
        <SumoneButton
          width={160}
          height={56}
          fill={"#C5B698"}
          text="결산 부탁하기"
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleAskShare}
        />
        <SumoneButton
          width={160}
          height={56}
          fill={"#FF9092"}
          text="동의하고 바로 결산"
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleCreateRecap}
        />
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
