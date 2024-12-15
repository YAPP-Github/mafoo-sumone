"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import CloseIconSrc from "@/assets/SumoneCloseIconBlack.png";
import PrevIconSrc from "@/assets/SumonePrevIcon.png";
import SumoneFAQIconSrc from "@/assets/SumoneFAQIcon.png";
import { useEffect } from "react";

interface HeaderProps {
  titleComponent: React.ReactElement;
  onClickPrev?: () => void;
  displayCloseIcon?: boolean;
  displayFAQIcon?: boolean;
  onClickFAQ?: () => void;
  tooltipText?: string;
}

const Header = ({
  titleComponent,
  onClickPrev,
  displayCloseIcon = false,
  displayFAQIcon = false,
  onClickFAQ,
  tooltipText,
}: HeaderProps) => {
  const router = useRouter();
  const handleClickPrev = () => {
    router.back();
  };

  const handleClickCloseIcon = () => {
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "CLOSE" }));
    }
  };

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      const tooltip = document.getElementById("FAQtooltip");
      if (tooltip) {
        tooltip.classList.add("hidden");
      }
    }, 3000);
    return () => {
      clearTimeout(timeout1);
    };
  }, []);

  return (
    <header className="relative flex h-14 w-full items-center justify-center px-4 py-3.5">
      {/* <Chevron
        width={28}
        direction="left"
        onClick={onClickPrev ?? handleClickPrev}
        className="absolute left-4 focus:outline-none"
      /> */}
      <Image
        src={PrevIconSrc}
        width={28}
        height={28}
        alt="prevIcon"
        className="absolute left-4 focus:outline-none"
        onClick={onClickPrev ?? handleClickPrev}
      />
      {titleComponent}
      {displayCloseIcon && (
        <div
          onClick={handleClickCloseIcon}
          className="absolute right-4 focus:outline-none"
        >
          <Image
            src={CloseIconSrc}
            alt="close"
            width={28}
            height={28}
          />
        </div>
      )}
      {displayFAQIcon && (
        <div
          onClick={onClickFAQ}
          className="absolute right-6 z-10"
        >
          <div className="relative">
            <Image
              src={SumoneFAQIconSrc}
              width={28}
              height={28}
              alt="faq"
            />
            <div
              id="FAQtooltip"
              className="absolute right-0 top-10 w-fit translate-x-[10%] whitespace-pre rounded-lg bg-white px-3 py-2.5 shadow-md"
            >
              <span className="text-sm leading-[150%] tracking-[0.24px]">
                {tooltipText}
              </span>
              <span className="absolute -top-1 right-[10%] h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
