import HeartIcon from "@/assets/HeartIcon";

const CoupleModal = ({ onClose }: { onClose: () => void }) => {
  const handleRegisterCouple = () => {
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window?.ReactNativeWebView?.postMessage({ type: "NEED_CONNECT" });
    }
    onClose();
  };
  return (
    <span className="fixed z-50 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-image w-[345px] h-[300px] rounded-md">
      <div className="flex flex-col justify-between w-full h-full px-6 pt-12 pb-8">
        <span className="flex flex-col items-center gap-7">
          <HeartIcon
            width={36}
            height={36}
          />
          <span className="text-lg tracking-[0.36px] leading-[160%] text-center">
            아직 썸원 커플이 아니에요
            <br />
            등록 후 결산할 수 있어요
          </span>
        </span>
        <button
          onClick={handleRegisterCouple}
          className="w-full h-12 shrink-0 bg-pink rounded-md text-white text-lg font-bold tracking-[0.36px] leading-[160%]"
        >
          커플 등록하고 오기
        </button>
      </div>
    </span>
  );
};
export default CoupleModal;
