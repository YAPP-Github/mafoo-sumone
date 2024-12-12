"use client";

import { useSearchParams } from "next/navigation";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

const Adsense = () => {
  const sp = useSearchParams();
  const navigation = useRouter();
  useEffect(() => {
    if (sp.toString() === "") {
      navigation.replace(
        "/en?top=10&bottom=10&nickName=test&partnerNickName=partner&dDay=234&isConnected=true&coupleId=test123"
      );
    }
  }, []);
  return <div>test</div>;
};
export default Adsense;
