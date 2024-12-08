import Image from "next/image";
import { useState } from "react";

const Character = ({
  character1,
  character2,
  canvasSize,
}: {
  character1: string;
  character2?: string;
  canvasSize: { width: number; height: number };
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
      <Image
        src={characterState === 0 ? character1 : character2 || character1}
        fill
        className="w-full"
        alt="character"
        sizes={`${(canvasSize.height * 144) / 543}px`}
      />
      {character2 && (
        <span
          className="relative z-30 flex transform -translate-x-1/3 bottom-10 w-fit left-1/2"
          data-html2canvas-ignore="true"
        >
          <div className="w-fit bg-white py-2.5 px-3 rounded-lg shadow-sm z-20 whitespace-pre text-xs tracking-[0.24px] leading-[150%]">
            저 포즈도 바꿀 수 있어요!
            <span className="absolute w-4 h-4 rotate-45 -translate-x-1/2 bg-white rounded-sm left-1/2 -bottom-2" />
          </div>
        </span>
      )}
    </span>
  );
};

export default Character;
