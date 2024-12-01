import { useEffect, useState } from "react";

export const useGetScreenSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only run this on the client side
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial size set on mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only on mount

  return windowSize;
};

export const useGetCanvasSize = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const height = window.innerHeight - 234;
      setCanvasSize({
        width: (height / 543) * 314,
        height: height,
      });
    }
  }, []); // Only run once when the component mounts (client-side)

  return canvasSize;
};
