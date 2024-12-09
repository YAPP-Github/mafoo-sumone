"use client";

import HeartIcon from "@/assets/HeartIcon";
import Header from "@/components/Header";
import { ObjectedParams } from "@/types/user";
import { useObjectToQueryString } from "@/utils/useQueryString";
import { usePathname, useRouter } from "next/navigation";

const PickPhotoHeader = ({
  searchParams,
  text,
}: {
  searchParams: ObjectedParams;
  text: string;
}) => {
  const navigation = useRouter();
  const pathName = usePathname();
  const OTQ = useObjectToQueryString();
  return (
    <Header
      titleComponent={
        <div className="flex flex-row gap-1 items-center  text-lg tracking-[0.36px] leading-[140%]">
          <HeartIcon width={28} />
          {/* 연말결산 이벤트 */}
          {text}
        </div>
      }
      onClickPrev={() =>
        navigation.push(`/${pathName.split("/")[1]}/?${OTQ(searchParams)}`)
      }
    />
  );
};

export default PickPhotoHeader;
