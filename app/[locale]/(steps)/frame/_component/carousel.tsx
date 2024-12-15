import { useState, useEffect, useRef } from "react";
import "./carousel.css";

const Carousel = () => {
  const initialColors = [
    "yellow",
    "red",
    "green",
    "yellow",
    "red",
    "green",
    "yellow",
    "red",
    "green",
  ];
  const [items, setItems] = useState(initialColors);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const ITEM_WIDTH = 120; // px
  const GAP = 32; // px
  const TOTAL_MOVE = ITEM_WIDTH + GAP;

  const startAutoSlide = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      slideToNext();
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const slideToNext = () => {
    if (!carouselTrackRef.current) return;

    // Apply the translateX to move left
    carouselTrackRef.current.style.transition = "transform 0.5s ease-in-out";
    carouselTrackRef.current.style.transform = `translateX(-${TOTAL_MOVE}px)`;
    const currentItem = carouselTrackRef.current.querySelector(
      ".active"
    ) as HTMLElement;
    currentItem.style.transform = "scale(1)";
    const nextItem = currentItem.nextElementSibling as HTMLElement;
    nextItem.style.transform = "scale(1.36)";
  };

  const handleTransitionEnd = () => {
    if (!carouselTrackRef.current) return;

    carouselTrackRef.current.style.transition = "none";
    carouselTrackRef.current.style.transform = `translateX(0px)`;

    void carouselTrackRef.current.offsetWidth;

    setTimeout(() => {
      if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transition =
          "transform 0.5s ease-in-out";
        const currentItem = carouselTrackRef.current.querySelector(
          ".active"
        ) as HTMLElement;
        currentItem.style.transform = "scale(1.36)";
        const nextItem = currentItem.nextElementSibling as HTMLElement;
        nextItem.style.transform = "scale(1)";
      }
    }, 0);

    setItems((prevItems) => {
      const newItems = [...prevItems];
      const firstItem = newItems.shift();
      if (firstItem) {
        newItems.push(firstItem);
      }
      return newItems;
    });
  };

  // Set the class names based on the current position
  const getItemClass = (index: number) => {
    const mid = Math.floor(items.length / 2);
    if (index === mid) return "carousel active"; // Central item
    if (index === mid - 1 || index === mid + 1) return "carousel next"; // Next and previous
    return "carousel prev"; // Items far away from center
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    const carouselTrack = carouselTrackRef.current;
    if (carouselTrack) {
      carouselTrack.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (carouselTrack) {
        carouselTrack.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [items]);

  return (
    <div
      className="carousel-container"
      tabIndex={0}
      role="region"
      aria-label="Image Carousel"
    >
      <div
        className="carousel-track"
        ref={carouselTrackRef}
        style={{ transform: `translateX(0px)` }}
      >
        {items.map((color, index) => {
          return (
            <span
              key={`${color}-${index}`}
              className={`sprite_carousel ${getItemClass(index)} ${color}`}
              role="img"
              aria-label={`${color} item`}
              style={{
                transition: "transform 0.5s ease, scale 0.5s ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
