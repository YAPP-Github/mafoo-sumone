// Carousel.tsx

import { memo, useState, useEffect, useRef } from "react";
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

  // Function to start the auto-slide interval
  const startAutoSlide = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      slideToNext();
    }, 1200); // Slide every 1 second
  };

  // Function to stop the auto-slide interval
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Function to handle sliding to the next item
  const slideToNext = () => {
    if (!carouselTrackRef.current) return;

    // Apply the translateX to move left
    carouselTrackRef.current.style.transition = "transform 0.5s ease-in-out";
    carouselTrackRef.current.style.transform = `translateX(-${TOTAL_MOVE}px)`;

    // const currentItem = document.getElementsByClassName("active")[0];
    // const nextItem = document.getElementsByClassName("next")[0];
    // //style the currentItme to scale(0)
    // currentItem.classList.remove("active");
    // nextItem.classList.remove("next");
    // nextItem.classList.add("active");
  };

  // Handle the transition end to reset position and reorder items
  const handleTransitionEnd = () => {
    if (!carouselTrackRef.current) return;

    // Remove the transition to reset transform
    carouselTrackRef.current.style.transition = "none";
    carouselTrackRef.current.style.transform = `translateX(0px)`;

    // Move the first item to the end
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const firstItem = newItems.shift();
      if (firstItem) {
        newItems.push(firstItem);
      }
      return newItems;
    });

    // Force reflow to apply the transform reset
    void carouselTrackRef.current.offsetWidth;

    // Re-enable the transition
    setTimeout(() => {
      if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transition =
          "transform 0.5s ease-in-out";
      }
    }, 0);
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
              className={`sprite_carousel carousel ${color} ${
                index === 4 ? "active" : index === 5 ? "next" : ""
              }`}
              role="img"
              aria-label={`${color} item`}
              // style={{ transform: `scale(${scale})` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Carousel);
