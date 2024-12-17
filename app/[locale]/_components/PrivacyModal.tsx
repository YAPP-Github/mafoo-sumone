import CloseIconSrc from "@/assets/SumoneCloseIconBlack.png";
import Image from "next/image";

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
    <div className="bg-image fixed bottom-0 z-50 w-full rounded-t-3xl">
      <div className="relative flex h-full w-full flex-col gap-4 p-6">
        <div className="flex w-full justify-between">
          <span className="text-lg leading-[150%] tracking-[0.36px]">
            {/* 개인정보 수집 항목 */}
            {personalDataCollection.title}
          </span>
          <Image
            src={CloseIconSrc}
            width={24}
            height={24}
            className="z-20 object-contain focus:outline-none"
            onClick={handleClose}
            alt="close"
            unoptimized
          />
        </div>
        <span className="w-full border-b border-gray-200" />
        <div className="flex flex-col text-sm leading-[200%] tracking-[0.28px] text-gray-500">
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
