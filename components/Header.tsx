"use client";

import Chevron from "@/assets/Chevron";
import { useRouter } from "next/navigation";

interface HeaderProps {
  titleComponent: React.ReactElement;
  onClickPrev?: () => void;
}

const Header = ({ titleComponent, onClickPrev }: HeaderProps) => {
  const router = useRouter();
  const handleClickPrev = () => {
    router.back();
  };

  return (
    <header className="flex items-center w-full h-14 px-4 py-3.5 justify-center relative">
      <Chevron
        width={24}
        direction="left"
        onClick={onClickPrev ?? handleClickPrev}
        className="absolute left-4"
      />
      {titleComponent}
    </header>
  );
};

export default Header;
