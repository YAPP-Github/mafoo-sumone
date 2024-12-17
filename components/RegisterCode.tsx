import { useEffect, useState } from "react";
import SumoneCopyIcon from "@/assets/SumoneCopyIconBlack.png";
import Image from "next/image";
import SumoneButton from "@/assets/SumoneButton";

const SumoneCopyPink = () => {
  return (
    <Image
      src={SumoneCopyIcon}
      alt="copy"
      width={16}
      height={16}
      unoptimized
      className="z-10"
      style={{
        filter:
          "invert(64%) sepia(18%) saturate(1783%) hue-rotate(314deg) brightness(100%) contrast(101%)",
      }}
    />
  );
};

const SumoneCopyWhite = () => {
  return (
    <Image
      src={SumoneCopyIcon}
      alt="copy"
      width={16}
      height={16}
      unoptimized
      className="z-10"
      quality={100}
      style={{
        filter: "invert(1) brightness(2)",
      }}
    />
  );
};

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
      className={`relative flex h-fit flex-row items-center gap-1 rounded-lg`}
    >
      <SumoneButton
        width={88}
        height={32}
        fill={tooltip ? "#ffffff" : "#FF9092"}
        text="가입코드"
        textClass={`${tooltip ? "text-[#FF9092]" : "text-white"} text-sm tracking-[0.28px] max-xs:text-xs`}
        icon={tooltip ? <SumoneCopyPink /> : <SumoneCopyWhite />}
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
