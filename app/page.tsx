import { Suspense } from "react";
import Adsense from "./_adsense";

const MainPage = () => {
  return (
    <div>
      <Suspense fallback={<div>test123</div>}>
        <Adsense />
      </Suspense>
    </div>
  );
};
export default MainPage;
