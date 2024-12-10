import { IconProps } from "@/types/icon";

const CloseTransparentIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      width={width || "29"}
      height={height || width || "28"}
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Outline / Custom / &#8;Close-X">
        <g id="Vector">
          <path
            d="M8.55762 20.0599L20.6771 7.94043L8.55762 20.0599ZM20.6771 20.0599L8.55762 7.94043L20.6771 20.0599Z"
            fill="#C5B698"
          />
          <path
            d="M8.55762 20.0599L20.6771 7.94043M20.6771 20.0599L8.55762 7.94043"
            stroke="#C5B698"
            strokeWidth="1.75"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default CloseTransparentIcon;
