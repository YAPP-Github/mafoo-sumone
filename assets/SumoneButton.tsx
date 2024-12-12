import { TouchableIcon } from "@/types/icon";
import SumoneButtonAsset from "./SumoneButtonAsset";

interface SumeoneButtonProps extends TouchableIcon {
  width: number | string;
  height: number;
  fill: string;
  text: string;
  textClass?: string;
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
}: SumeoneButtonProps) => {
  return (
    <div
      role={role || "button"}
      tabIndex={tabIndex || 0}
      onClick={onClick}
      className="relative flex items-center justify-center"
      style={{ width: width, height: height }}
    >
      <SumoneButtonAsset
        width={width}
        height={height}
        fill={fill}
        className="absolute -z-10"
      />
      <span className={`${textClass} z-10`}>{text}</span>
    </div>
  );
};

export default SumoneButton;
