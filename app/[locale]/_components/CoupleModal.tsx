import HeartIcon from "@/assets/HeartIcon";

const CoupleModal = ({
  onClose,
  coupleModal,
}: {
  onClose: () => void;
  coupleModal: Record<string, string>;
}) => {
  const handleRegisterCouple = () => {
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "NEED_CONNECT" })
      );
    }
    onClose();
  };

  return (
    <span className="bg-image fixed left-1/2 top-1/2 z-50 h-[300px] w-[345px] -translate-x-1/2 -translate-y-1/2 rounded-md">
      <div className="flex h-full w-full flex-col justify-between px-6 pb-8 pt-12">
        <span className="flex flex-col items-center gap-7">
          <HeartIcon
            width={36}
            height={36}
          />
          <span className="whitespace-pre text-center text-lg leading-[160%] tracking-[0.36px]">
            {/* 아직 썸원 커플이 아니에요 */}
            {coupleModal.not_a_couple_yet}
            <br />
            {/* 등록 후 결산할 수 있어요 */}
            {coupleModal.register_and_get_recap}
          </span>
        </span>
        <button
          onClick={handleRegisterCouple}
          className="h-12 w-full shrink-0 rounded-md bg-pink text-lg font-bold leading-[160%] tracking-[0.36px] text-white focus:outline-none"
        >
          {/* 커플 등록하고 오기 */}
          {coupleModal.register_as_couple}
        </button>
      </div>
    </span>
  );
};
export default CoupleModal;
