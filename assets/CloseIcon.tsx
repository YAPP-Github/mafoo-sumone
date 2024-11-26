import { TouchableIcon } from "@/types/icon";

const CloseIcon = ({
  width,
  height,
  className,
  onClick,
  role,
  tabIndex,
}: TouchableIcon) => {
  return (
    <svg
      width={width || "36"}
      height={height || width || "37"}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={role || "button"}
      tabIndex={tabIndex || 0}
      onClick={onClick}
    >
      <g id="Bold / Essentional, UI / Close Circle">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33 18.293C33 26.5772 26.2843 33.293 18 33.293C9.71573 33.293 3 26.5772 3 18.293C3 10.0087 9.71573 3.29297 18 3.29297C26.2843 3.29297 33 10.0087 33 18.293ZM13.4544 13.7474C13.8938 13.3081 14.6061 13.3081 15.0454 13.7474L18 16.702L20.9544 13.7475C21.3938 13.3081 22.1061 13.3081 22.5454 13.7475C22.9848 14.1868 22.9848 14.8991 22.5454 15.3385L19.5909 18.293L22.5454 21.2474C22.9847 21.6868 22.9847 22.3991 22.5454 22.8384C22.1061 23.2777 21.3938 23.2777 20.9544 22.8384L18 19.8839L15.0455 22.8384C14.6061 23.2778 13.8938 23.2778 13.4545 22.8384C13.0151 22.3991 13.0151 21.6868 13.4545 21.2474L16.409 18.293L13.4544 15.3384C13.0151 14.8991 13.0151 14.1868 13.4544 13.7474Z"
          fill="#CBD0D6"
        />
      </g>
    </svg>
  );
};

export default CloseIcon;
