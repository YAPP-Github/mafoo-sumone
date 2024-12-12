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
        className={`sprite_f character flex ${character}${characterState}`}
        style={{
          zoom: `${((canvasSize.height / 543) * 144) / 180}`,
        }}
      />
      {isAbleToChangeCharacter && (
        <span
          style={{ bottom: (canvasSize.height * 144) / 543 + 40 + "px" }}
          className="relative left-1/2 z-30 flex w-fit -translate-x-1/3 transform"
          data-html2canvas-ignore="true"
        >
          <div className="z-20 w-fit whitespace-pre rounded-lg bg-white px-3 py-2.5 text-xs leading-[150%] tracking-[0.24px] shadow-sm">
            {/* 저 포즈도 바꿀 수 있어요! */}
            {dict.change_pose}
            <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white" />
          </div>
        </span>
      )}
    </span>
  );
};

export default Character;
