export default function NotFound() {
  if (typeof window !== "undefined" && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "exit" }));
  }

  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
}
