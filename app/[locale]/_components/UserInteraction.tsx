"use client";

import Chevron from "@/assets/Chevron";
import SumoneButton from "@/assets/SumoneButton";
import { ObjectedParams } from "@/types/user";
import { useObjectToQueryString } from "@/utils/useQueryString";

import CoupleModal from "./CoupleModal";
import PrivacyModal from "./PrivacyModal";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import InfoIcon from "@/assets/InfoIcon";
import CopyIcon from "@/assets/CopyIcon";

const MainPageUserInteraction = ({
  code,
  userData,
}: {
  code?: string;
  userData: ObjectedParams;
}) => {
  const navigation = useRouter();
  const pathName = usePathname();
  const OTQ = useObjectToQueryString();
  const [modalType, setModalType] = useState<
    "privacy" | "couple" | "loading" | null
  >(null);

  useEffect(() => {
    console.log("modalType:", modalType);
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

  useEffect(() => {
    sendGAEvent("event", "MainPageView", {
      locale: pathName.split("/")[1],
    });
  });

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
        setModalType("loading");
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
      <div
        className="fixed px-6 w-full flex flex-row-reverse justify-between"
        style={{
          top: Number(32) + Number(userData.top) + "px",
        }}
      >
        {/* TODO: FAQ 문서 링크 변경 */}
        <Link
          href="https://chisel-promise-9ff.notion.site/FAQ-f366f55df31b49ef96e7db35c73b8921?pvs=4"
          className="rounded-full bg-[rgba(255, 255, 255, 0.60)] backdrop-blur-xl w-11 h-11 flex items-center justify-center"
        >
          <InfoIcon width={24} />
        </Link>
        {code && (
          <span className="flex h-fit flex-row items-center gap-1 bg-pink rounded-lg px-2 py-1.5">
            <span className="text-sm text-white tracking-[0.28px]">
              가입코드
            </span>
            <CopyIcon
              width={16}
              height={16}
            />
          </span>
        )}
      </div>

      {modalType &&
        modalType !== "loading" &&
        (modalType === "privacy" ? (
          <PrivacyModal onClose={handleCloseModal} />
        ) : (
          <CoupleModal onClose={handleCloseModal} />
        ))}
    </>
  );
};

export default MainPageUserInteraction;
