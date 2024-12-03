"use client";

import SumoneButton from "@/assets/SumoneButton";

const UserInteraction = () => {
  const { partner } = {
    partner: "영지",
  };
  const handleAskEvent = () => {
    console.log("ask event");
  };
  const handleShareEvent = () => {
    console.log("share event");
  };
  return (
    <div className="flex items-center w-full my-3">
      <div className="flex flex-col gap-3 mx-6 w-full h-full">
        <SumoneButton
          width="100%"
          height={48}
          fill="#c5b698"
          text={`${partner}에게도 부탁하기`}
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleAskEvent}
        />

        <SumoneButton
          width="100%"
          height={48}
          fill="#ff9092"
          text="우리 1년 SNS에 자랑하기"
          textClass="text-white text-sm tracking-[0.24px] leading-[150%]"
          onClick={handleShareEvent}
        />
      </div>
    </div>
  );
};

export default UserInteraction;
