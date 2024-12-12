import Image from "next/image";
import { useRef, useState } from "react";

const characterSrcs = {
  1: ["/_assets/character/puppy0.png", "/_assets/character/puppy1.png"],
  2: ["/_assets/character/penguin0.png", "/_assets/character/penguin1.png"],
  3: ["/_assets/character/cat0.png", "/_assets/character/cat1.png"],
  4: ["/_assets/character/panda0.png", "/_assets/character/panda1.png"],
  5: ["/_assets/character/egg0.png"],
} as const;

type CharacterFrameType = keyof typeof characterSrcs;

const Character = ({
  frameType,
  canvasSize,
  dict,
}: {
  frameType: number;
  canvasSize: { width: number; height: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
}) => {
  const [characterState, setCharacterState] = useState<number>(0);
  const loadedCountRef = useRef(9);
  console.log(loadedCountRef.current);

  const handleClickCharacter = () => {
    setCharacterState((prev: number) => 1 - prev);
  };

  const characterSrc =
    characterSrcs[frameType as CharacterFrameType][
      frameType === 5 ? 0 : characterState
    ];

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
        priority
        src={characterSrc}
        alt="character image"
        fill
      />
      {frameType !== 5 && (
        <span
          style={{ bottom: "40px" }}
          className="relative left-1/2 z-30 flex w-fit -translate-x-1/3 transform"
          data-html2canvas-ignore="true"
        >
          <div className="z-20 w-fit whitespace-pre rounded-lg bg-white px-3 py-2.5 text-xs leading-[150%] tracking-[0.24px] shadow-sm">
            {dict.change_pose}
            <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white" />
          </div>
        </span>
      )}
    </span>
  );
};

export default Character;
