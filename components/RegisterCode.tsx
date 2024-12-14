import { useEffect, useState } from "react";
import SumoneCopyPinkIcon from "@/assets/SumoneCopyIcon.png";
import SumoneCopyWhiteIcon from "@/assets/SumoneCopyIconWhite.png";
import Image from "next/image";

const RegisterCode = ({
  tooltip,
  onClickHandler,
}: {
  tooltip: boolean;
  onClickHandler?: () => void;
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
    return () => {
      clearTimeout(timeout1);
    };
  }, []);

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClickHandler}
      className={`${
        tooltip ? "bg-white" : "bg-pink"
      } relative flex h-fit flex-row items-center gap-1 rounded-lg px-2 py-1.5`}
    >
      <span
        className={`${
          tooltip ? "text-pink" : "text-white"
        } text-sm tracking-[0.28px]`}
      >
        가입코드
      </span>
      <Image
        src={tooltip ? SumoneCopyPinkIcon : SumoneCopyWhiteIcon}
        alt="copy"
        width={16}
        height={16}
      />
      {tooltip && showTooltip && (
        <div
          className="absolute top-12 whitespace-pre rounded-md bg-white px-3 py-2.5 text-xs tracking-[0.24px] shadow-sm"
          style={{ transform: "translateX(-5%)", color: "#444E5C" }}
        >
          <span className="absolute -top-1 left-[20%] h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white" />
          마푸에서 내 추억을 확인하고싶다면?
        </div>
      )}
    </span>
  );
};

export default RegisterCode;
