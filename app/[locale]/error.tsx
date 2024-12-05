"use client";

import { useEffect } from "react";

export default function Error() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "exit" }));
    }
  }, []);

  return (
    <div>
      <h1>Unexpected error occurred. Please try again later.</h1>
    </div>
  );
}
