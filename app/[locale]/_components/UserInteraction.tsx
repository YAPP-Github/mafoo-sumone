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
import CheckCircleIcon from "@/assets/CheckCircleIcon";
import RegisterCode from "@/components/RegisterCode";
import { Locale } from "@/types/page";
import Image from "next/image";
import CloseIconSrc from "@/assets/SumoneCloseIconBlack.png";

const FAQ_URL = {
  ko: "https://chisel-promise-9ff.notion.site/2024-FAQ-KR-153385a9a75b80acabeffd1b81648b71?pvs=4",
  tw: "https://chisel-promise-9ff.notion.site/2024-FAQ-TW-153385a9a75b8082b64ac8b475066eb8?pvs=4",
  en: "https://chisel-promise-9ff.notion.site/2024-Year-End-Event-FAQ-EN-153385a9a75b8028b0cdfcc7d04ebcbf?pvs=4",
  es: "https://chisel-promise-9ff.notion.site/Preguntas-Frecuentes-del-Evento-de-Fin-de-A-o-2024-SP-153385a9a75b801386e7d8cf9cf3e47a?pvs=4",
  ja: "https://chisel-promise-9ff.notion.site/2024-FAQ-JP-153385a9a75b805daba5d750d7e7e3f7?pvs=4",
};

interface MPUIProps {
  code?: string;
  locale: Locale;
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
            body: JSON.stringify({
              userId: userData.coupleId + userData.nickName,
            }),
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
        className="mt-3 flex w-full justify-between px-6 py-4 leading-[140%] tracking-[0.24px]"
      >
        <span className="text-sm">
          {/* 개인정보 수집 동의 */}
          {personal_data_agreement}
        </span>
        <span className="flex flex-row items-center gap-1 text-sm text-gray-500">
          {/* 자세히 보기 */}
          {view_details}
          <Chevron
            width={16}
            height={16}
          />
        </span>
      </span>
      <span className="mb-2 flex flex-row gap-2">
        <SumoneButton
          width={180}
          height={54}
          fill={"#C5B698"}
          // text="결산 부탁하기"
          text={ask_for_mine}
          textClass="text-white text-base tracking-[0.24px] leading-[150%]"
          onClick={handleAskShare}
        />
        <SumoneButton
          width={180}
          height={54}
          fill={"#FF9092"}
          // text="동의하고 바로 결산"
          text={agree_and_get_recap}
          textClass="text-white text-base tracking-[0.24px] leading-[150%]"
          onClick={handleCreateRecap}
        />
      </span>
      <div
        className="fixed flex w-full flex-row items-center justify-between px-6"
        style={{
          top: Number(24) + Number(userData.top) + "px",
        }}
      >
        <span className="flex flex-row gap-3">
          {locale === "ko" && code && (
            <RegisterCode
              tooltip
              onClickHandler={() => handleCopyToClipboard(code)}
            />
          )}
          <Link
            href={FAQ_URL[locale]}
            className="flex h-7 w-7 items-center justify-center rounded-lg"
          >
            <span className="sprite faq" />
          </Link>
        </span>
        <div
          role="button"
          tabIndex={0}
          onClick={handleClose}
          className="flex h-8 w-8 items-center justify-center rounded-full"
        >
          <Image
            src={CloseIconSrc}
            alt="close"
            width={28}
            height={28}
          />
        </div>
      </div>
      {showClipboardModal && (
        <div className="fixed flex h-full w-full items-center justify-center">
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
