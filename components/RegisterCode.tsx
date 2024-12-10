import CopyIcon from "@/assets/CopyIcon";

const RegisterCode = ({
  tooltip,
  onClickHandler,
}: {
  tooltip: boolean;
  onClickHandler?: () => void;
}) => {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClickHandler}
      className="flex h-fit flex-row items-center gap-1 bg-pink rounded-lg px-2 py-1.5 relative"
    >
      <span className="text-sm text-white tracking-[0.28px]">가입코드</span>
      <CopyIcon
        width={16}
        height={16}
      />
      {tooltip && (
        <div className="absolute bg-white px-3 py-2.5 text-xs tracking-[0.24px] top-12 rounded-md whitespace-pre shadow-sm">
          <span className="absolute w-4 h-4 rotate-45 -translate-x-1/2 bg-white rounded-sm left-[20%] -top-2" />
          마푸에서 내 추억을 확인하고싶다면?
        </div>
      )}
    </span>
  );
};

export default RegisterCode;
