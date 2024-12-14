"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import CloseIconSrc from "@/assets/SumoneCloseIconBlack.png";
import PrevIconSrc from "@/assets/SumonePrevIcon.png";

interface HeaderProps {
  titleComponent: React.ReactElement;
  onClickPrev?: () => void;
  displayCloseIcon?: boolean;
}

const Header = ({
  titleComponent,
  onClickPrev,
  displayCloseIcon = false,
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
    </header>
  );
};

export default Header;
