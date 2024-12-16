import { TouchableIcon } from "@/types/icon";
import SumoneButtonAsset from "./SumoneButtonAsset";
// import { PulseLoader } from "react-spinners";
// import { useMemo } from "react";

interface SumeoneButtonProps extends TouchableIcon {
  width: number | string;
  height: number;
  fill: string;
  text: string;
  textClass?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const SumoneButton = ({
  width,
  height,
  fill,
  text,
  onClick,
  tabIndex,
  role,
  textClass,
  icon,
  // isLoading,
}: SumeoneButtonProps) => {
  /*
  const LoadingDot = useMemo(() => {
    return (
      <div className="flex h-full items-center justify-center">
        <PulseLoader
          color="#ffffff"
          size={6}
          speedMultiplier={0.6}
          style={{ opacity: 0.8 }}
        />
      </div>
    );
  }, []);
  */

  const Label = () => {
    return <span className={`${textClass} z-10`}>{text}</span>;
  };

  return (
    <div
      role={role || "button"}
      tabIndex={tabIndex || 0}
      onClick={onClick}
      className="relative flex items-center justify-center gap-1"
      style={{ width: width, height: height }}
    >
      <SumoneButtonAsset
        width={width}
        height={height}
        fill={fill}
        className="absolute -z-10"
      />
      {/* {isLoading ? LoadingDot : <Label />} */}
      <Label />
      {icon}
    </div>
  );
};

export default SumoneButton;
