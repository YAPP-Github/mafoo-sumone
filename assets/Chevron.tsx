import { IconProps } from "@/types/icon";

const Chevron = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width || "17"}
      height={height || width || "17"}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Outline / Arrows / Alt Arrow Right">
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.2918 3.43972C6.50146 3.26001 6.81711 3.28429 6.99682 3.49395L10.9968 8.16062C11.1573 8.34786 11.1573 8.62416 10.9968 8.81141L6.99682 13.4781C6.81711 13.6877 6.50146 13.712 6.2918 13.5323C6.08214 13.3526 6.05786 13.0369 6.23757 12.8273L9.95866 8.48601L6.23757 4.14474C6.05786 3.93508 6.08214 3.61943 6.2918 3.43972Z"
          fill={fill || "#7F8A96"}
        />
      </g>
    </svg>
  );
};

export default Chevron;
