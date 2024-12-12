import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const characterSrcs = [
  "/_assets/character/puppy0.png",
  "/_assets/character/puppy1.png",
  "/_assets/character/penguin0.png",
  "/_assets/character/penguin1.png",
  "/_assets/character/cat0.png",
  "/_assets/character/cat1.png",
  "/_assets/character/panda0.png",
  "/_assets/character/panda1.png",
  "/_assets/character/egg0.png",
] as const;

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
  const [isCharacterLoaded, setIsCharacterLoaded] = useState<boolean>(false);
  const loadedCountRef = useRef(9);

  const onLoad = () => {
    loadedCountRef.current--;
    if (loadedCountRef.current) return;
    setIsCharacterLoaded(true);
  };

  const handleClickCharacter = () => {
    if (frameType !== 5 && isCharacterLoaded) {
      setCharacterState((prev: number) => 1 - prev);
    }
  };

  useEffect(() => {
    const characterStack = document.getElementById(
      "character-stack"
    ) as HTMLDivElement;
    if (!characterStack) return;

    const characterElements = Array.from(
      document.querySelectorAll(".character-element")
    ).reverse() as HTMLImageElement[];
    characterElements.find((el) => {
      const id = el.id;

      if (id === `character-8` && frameType === 5) {
        el.style.opacity = "1";
        return true;
      }

      if (id === `character-${2 * (frameType - 1) + characterState}`) {
        el.style.opacity = "1";
        return true;
      }

      el.remove();
      el.style.opacity = "0";
      characterStack.prepend(el);

      return false;
    });
  }, [frameType, characterState]);

  return (
    <span
      id="character-stack"
      style={{
        width: (canvasSize.height * 144) / 543 + "px",
        height: (canvasSize.height * 144) / 543 + "px",
      }}
      className="absolute bottom-0 right-0 z-30 grow-0"
      onClick={handleClickCharacter}
    >
      {characterSrcs.map((src, i) => (
        <Image
          key={i}
          id={`character-${i}`}
          src={src}
          alt="character image"
          fill
          priority
          className="character-element"
          onLoad={onLoad}
        />
      ))}
      {frameType !== 5 && (
        <span
          style={{ bottom: "40px" }}
          className="relative left-1/2 z-30 flex w-fit translate-x-[-40%] transform"
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
