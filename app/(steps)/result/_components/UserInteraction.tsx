"use client";

const UserInteraction = () => {
  const handleAskEvent = () => {
    console.log("ask event");
  };
  const handleShareEvent = () => {};
  return (
    <div className="flex flex-col w-full gap-3 items-center my-3 mx-6">
      <button className="w-[calc(100%-48px)] flex items-center justify-center bg-brown text-white text-sm tracking-[0.24px] leading-[150%] h-12">
        {`상대방`}에게도 부탁하기
      </button>
      <button className="w-[calc(100%-48px)] flex items-center justify-center bg-pink text-white text-sm tracking-[0.24px] leading-[150%] h-12">
        우리 1년 SNS에 자랑하기
      </button>
    </div>
  );
};

export default UserInteraction;
