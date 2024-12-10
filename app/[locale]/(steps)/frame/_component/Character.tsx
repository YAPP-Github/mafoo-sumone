import { useState } from "react";

const Character = ({
  isAbleToChangeCharacter,
  character,
  canvasSize,
  dict,
}: {
  isAbleToChangeCharacter?: boolean;
  character: string;
  canvasSize: { width: number; height: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
}) => {
  const [characterState, setCharacterState] = useState<number>(0);

  const handleClickCharacter = () => {
    setCharacterState((prev: number) => 1 - prev);
  };

  return (
    <span
      style={{
        width: (canvasSize.height * 144) / 543 + "px",
        height: (canvasSize.height * 144) / 543 + "px",
      }}
      className="absolute bottom-0 right-0 z-30 grow-0"
      onClick={handleClickCharacter}
    >
      <span
        className={`flex sprite character ${character}${characterState}`}
        style={{
          zoom: `${((canvasSize.height / 543) * 144) / 180}`,
        }}
      />
      {isAbleToChangeCharacter && (
        <span
          style={{ bottom: (canvasSize.height * 144) / 543 + 40 + "px" }}
          className="relative z-30 flex transform -translate-x-1/3 left-1/2 w-fit"
          data-html2canvas-ignore="true"
        >
          <div className="w-fit bg-white py-2.5 px-3 rounded-lg shadow-sm z-20 whitespace-pre text-xs tracking-[0.24px] leading-[150%]">
            {/* 저 포즈도 바꿀 수 있어요! */}
            {dict.change_pose}
            <span className="absolute w-4 h-4 rotate-45 -translate-x-1/2 bg-white rounded-sm left-1/2 -bottom-2" />
          </div>
        </span>
      )}
    </span>
  );
};

export default Character;
