import FingerprintJS from "@fingerprintjs/fingerprintjs";

export async function getBrowserFingerPrint(): Promise<string | null> {
  const browserFingerPrint = localStorage.getItem("browserFingerPrint");
  if (browserFingerPrint) return browserFingerPrint;
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    localStorage.setItem("browserFingerPrint", result.visitorId);
    return result.visitorId;
  } catch (error) {
    // console.error("获取浏览器指纹失败:", error);
    localStorage.setItem("browserFingerPrint", "");
    return null;
  }
}
