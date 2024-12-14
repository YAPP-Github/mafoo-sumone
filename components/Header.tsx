"use client";

import Chevron from "@/assets/Chevron";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import CloseIconSrc from "@/assets/SumoneCloseIconBlack.png";

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
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const handleClickPrev = () => {
    router.back();
  };

  const handleNavigateToHome = () => {
    router.push(`/${pathName.split("/")[1]}?${searchParams.toString()}`);
  };

  return (
    <header className="relative flex h-14 w-full items-center justify-center px-4 py-3.5">
      <Chevron
        width={28}
        direction="left"
        onClick={onClickPrev ?? handleClickPrev}
        className="absolute left-4 focus:outline-none"
      />
      {titleComponent}
      {displayCloseIcon && (
        <div
          onClick={handleNavigateToHome}
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
