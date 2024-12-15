"use client";

import HeartIcon from "@/assets/HeartIcon";
import Header from "@/components/Header";
import { ObjectedParams } from "@/types/user";
import { useObjectToQueryString } from "@/utils/useQueryString";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SumoneCloseIconSrc from "@/assets/SumoneCloseIconBlack.png";
import Image from "next/image";

const PickPhotoHeader = ({
  searchParams,
  text,
  dict,
}: {
  searchParams: ObjectedParams;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
}) => {
  const navigation = useRouter();
  const pathName = usePathname();
  const OTQ = useObjectToQueryString();
  const [userOS, setUserOS] = useState<"ios" | "aos" | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOnClickFAQ = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/iPhone|iPad|iPod/i)) {
      setUserOS("ios");
    } else if (userAgent.match(/Android/i)) {
      setUserOS("aos");
    }
  }, []);

  useEffect(() => {
    const pickPhotoElement = document.getElementById("pickphotoBg");
    if (pickPhotoElement) {
      if (openModal) {
        pickPhotoElement.classList.add("dark-overlay");
      } else {
        pickPhotoElement.classList.remove("dark-overlay");
      }
    }
  }, [openModal]);

  return (
    <>
      <Header
        titleComponent={
          <div className="flex flex-row items-center gap-1 text-lg leading-[140%] tracking-[0.36px]">
            <HeartIcon width={28} />
            {/* 연말결산 이벤트 */}
            {text}
          </div>
        }
        onClickPrev={() =>
          navigation.push(`/${pathName.split("/")[1]}/?${OTQ(searchParams)}`)
        }
        displayFAQIcon={userOS === "aos"}
        onClickFAQ={userOS === "aos" ? handleOnClickFAQ : () => {}}
        tooltipText={dict.tooltip}
      />
      {openModal && (
        <div
          style={{
            paddingBottom: Number(searchParams.bottom) + 24 + "px",
          }}
          className="fixed bottom-0 z-50 w-full rounded-t-3xl bg-white px-6 pt-6"
        >
          <Image
            src={SumoneCloseIconSrc}
            alt="close"
            width={24}
            height={24}
            className="absolute right-4 top-4"
            onClick={() => setOpenModal(false)}
          />
          <div className="flex flex-col gap-4">
            <span className="text-lg leading-[150%] tracking-[0.36px] text-gray-800">
              {/* 일부 기기에서는 1장만 선택할 수 있어요. */}
              {dict.description.title}
            </span>
            <span className="h-[1px] w-full bg-gray-200" />
            <span className="text-sm leading-[200%] tracking-[0.28px] text-gray-500">
              {/* 안드로이드의 경우 여러 사진을 불러오기 어려운 기기가 있어요.
              이때는 가장 소중한 한 장만 선택해주세요. */}
              {dict.description.content}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PickPhotoHeader;
