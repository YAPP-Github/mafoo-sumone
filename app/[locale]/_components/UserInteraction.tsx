"use client";

import Chevron from "@/assets/Chevron";
import SumoneButton from "@/assets/SumoneButton";
import { ObjectedParams } from "@/types/user";
import { useObjectToQueryString } from "@/utils/useQueryString";

import CoupleModal from "./CoupleModal";
import PrivacyModal from "./PrivacyModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import CheckCircleIcon from "@/assets/CheckCircleIcon";
import RegisterCode from "@/components/RegisterCode";
import CloseTransparentIcon from "@/assets/CloseTrasparentIcon";

interface MPUIProps {
  code?: string;
  locale: string;
  userData: ObjectedParams;
  personal_data_agreement: string;
  view_details: string;
  ask_for_mine: string;
  agree_and_get_recap: string;
  personalDataCollection: Record<string, string>;
  coupleModal: Record<string, string>;
  ShareText: string;
}

const MainPageUserInteraction = ({
  code,
  locale,
  userData,
  personal_data_agreement,
  view_details,
  ask_for_mine,
  agree_and_get_recap,
  personalDataCollection,
  coupleModal,
  ShareText,
}: MPUIProps) => {
  const navigation = useRouter();
  const pathName = usePathname();
  const OTQ = useObjectToQueryString();
  const [showClipboardModal, setShowClipboardModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    "privacy" | "couple" | "loading" | null
  >(null);

  const searchParams = useSearchParams();
  console.log(pathName, searchParams.toString());

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
    //[GA] Web_View_Page_01: 페이지 진입 유저 수
    sendGAEvent("event", "page_view", {
      pathName: "Web_View_Page_01",
      locale: pathName.split("/")[1],
    });
  }, []);

  const handleOpenPrivacyModal = () => {
    setModalType("privacy");
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleCopyToClipboard = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setShowClipboardModal(true);

      setTimeout(() => {
        setShowClipboardModal(false);
      }, 2500);
    }
  };

  const handleAskShare = () => {
    //  결산 부탁하기
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "MAIN_SHARE",
          message: {
            title: ShareText,
          },
        })
      );
    }
    //[GA] Web_View_Page_01: [나도 부탁하기] 버튼 누른 횟수
    sendGAEvent("event", "click", {
      pathName: "Web_View_Page_01",
      action: "ask",
      locale: pathName.split("/")[1],
    });
  };

  const handleClose = () => {
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "CLOSE" }));
    }
  };

  const checkCouple = () => {
    if (!userData || userData.isConnected !== "true") {
      //[GA] Web_View_Page_01: 커플 연결 필요 팝업 노출 유저 수
      sendGAEvent("event", "no_couple", {
        pathName: "Web_View_Page_01",
        action: "no_couple",
        locale: pathName.split("/")[1],
      });
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
        <span className="text-sm">
          {/* 개인정보 수집 동의 */}
          {personal_data_agreement}
        </span>
        <span className="flex flex-row items-center gap-1 text-xs text-gray-500">
          {/* 자세히 보기 */}
          {view_details}
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
          // text="결산 부탁하기"
          text={ask_for_mine}
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleAskShare}
        />
        <SumoneButton
          width={160}
          height={56}
          fill={"#FF9092"}
          // text="동의하고 바로 결산"
          text={agree_and_get_recap}
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleCreateRecap}
        />
      </span>
      <div
        className="fixed px-6 w-full flex flex-row justify-between items-center"
        style={{
          top: Number(32) + Number(userData.top) + "px",
        }}
      >
        {/* TODO: FAQ 문서 링크 변경 */}
        <span className="flex flex-row gap-3">
          {locale === "ko" && code && (
            <RegisterCode
              tooltip
              onClickHandler={() => handleCopyToClipboard(code)}
            />
          )}
          <Link
            href="https://chisel-promise-9ff.notion.site/FAQ-f366f55df31b49ef96e7db35c73b8921?pvs=4"
            className="border border-white rounded-lg px-2 py-1.5 bg-[rgba(255, 255, 255, 0.70)] backdrop-blur-xl flex items-center justify-center text-brown text-base"
          >
            이벤트 FAQ
          </Link>
        </span>
        <div
          role="button"
          tabIndex={0}
          onClick={handleClose}
          className="w-11 h-11 border border-white rounded-full bg-[rgba(255, 255, 255, 0.70)] flex items-center justify-center backdrop-blur-xl"
        >
          <CloseTransparentIcon width={28} />
        </div>
      </div>
      {showClipboardModal && (
        <div className="fixed w-full h-full flex items-center justify-center">
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

      {modalType &&
        modalType !== "loading" &&
        (modalType === "privacy" ? (
          <PrivacyModal
            onClose={handleCloseModal}
            personalDataCollection={personalDataCollection}
          />
        ) : (
          <CoupleModal
            onClose={handleCloseModal}
            coupleModal={coupleModal}
          />
        ))}
    </>
  );
};

export default MainPageUserInteraction;
