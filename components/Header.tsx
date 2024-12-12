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
    <header className="relative flex h-14 w-full items-center justify-center px-4 py-3.5">
      <Chevron
        width={28}
        direction="left"
        onClick={onClickPrev ?? handleClickPrev}
        className="absolute left-4 focus:outline-none"
      />
      {titleComponent}
    </header>
  );
};

export default Header;
