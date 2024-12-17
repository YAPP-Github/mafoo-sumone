import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";

const characterSrcs = [
  // "/_assets/character/puppy0.png",
  // "/_assets/character/puppy1.png",
  // "/_assets/character/penguin0.png",
  // "/_assets/character/penguin1.png",
  // "/_assets/character/cat0.png",
  // "/_assets/character/cat1.png",
  // "/_assets/character/panda0.png",
  // "/_assets/character/panda1.png",
  "/_assets/character/puppy0.webp",
  "/_assets/character/puppy1.webp",
  "/_assets/character/penguin0.webp",
  "/_assets/character/penguin1.webp",
  "/_assets/character/cat0.webp",
  "/_assets/character/cat1.webp",
  "/_assets/character/panda0.webp",
  "/_assets/character/panda1.webp",
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
  const loadedCountRef = useRef(characterSrcs.length);

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

      // if (id === `character-8` && frameType === 5) {
      //   el.style.opacity = "1";
      //   return true;
      // }

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
      // id="character-stack"
      style={{
        width: (canvasSize.height * 144) / 543 + "px",
        height: (canvasSize.height * 144) / 543 + "px",
      }}
      className="absolute bottom-0 right-0 z-30 flex grow-0 flex-col"
      onClick={handleClickCharacter}
    >
      <span
        className="relative flex shrink-0"
        style={{
          width: (canvasSize.height * 144) / 543 + "px",
          height: (canvasSize.height * 144) / 543 + "px",
        }}
      >
        {frameType !== 5 && (
          <span
            style={{ bottom: "40px" }}
            // className="relative left-1/2 z-30 flex h-fit w-fit translate-x-[-50%] transform"
            className="relative right-0 z-30 flex h-fit w-fit -translate-x-[10%] transform"
            data-html2canvas-ignore="true"
          >
            <div className="z-20 w-fit whitespace-pre rounded-lg bg-white px-3 py-2.5 text-xs leading-[150%] tracking-[0.24px] shadow-sm">
              {dict.change_pose}
              <span className="absolute -bottom-1 left-2/3 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white" />
            </div>
          </span>
        )}
        <div id={"character-stack"}>
          {characterSrcs.map((src, i) => (
            <Image
              key={i}
              id={`character-${i}`}
              src={src}
              priority
              unoptimized
              alt="character image"
              fill
              className="character-element"
              onLoad={onLoad}
              sizes="30vw"
            />
          ))}
        </div>
      </span>
    </span>
  );
};

export default memo(Character);
