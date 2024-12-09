import CloseIcon from "@/assets/CloseIcon";

const PrivacyModal = ({
  onClose,
  personalDataCollection,
}: {
  onClose: () => void;
  personalDataCollection: Record<string, string>;
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed bottom-0 z-50 w-full bg-image rounded-t-3xl">
      <CloseIcon
        width={36}
        className="absolute right-2.5 top-2.5 z-20 focus:outline-none"
        onClick={handleClose}
      />
      <div className="relative flex flex-col w-full h-full gap-4 p-6">
        <span className="text-lg tracking-[0.36px] leading-[150%]">
          {/* 개인정보 수집 항목 */}
          {personalDataCollection.title}
        </span>
        <span className="w-full border-b border-gray-200" />
        <div className="flex flex-col text-sm tracking-[0.28px] leading-[200%] text-gray-500">
          <span>
            {/* 수집·이용기관명 : 마푸 */}
            {personalDataCollection.institution}
          </span>
          <span>
            {/* 수집항목 : 이미지 파일 */}
            {personalDataCollection.collectedItems}
          </span>
          <span>
            {/* 수집·이용 목적 : 이벤트 콘텐츠 생성 및 저장 */}
            {personalDataCollection.purpose}
          </span>
          <span>
            {/* 보유 및 이용기간 : 1개월간 보관 후 폐기 */}
            {personalDataCollection.retention}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
